import { Request, RequestHandler } from 'express'
import { env } from '../utils/validateEnv'
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { createHash } from 'crypto'
import cloudinary from '../config/cloudinary'

// Models
import User from '../models/userModel'

// Types -- adds user to request for protected routes.
import {} from '../types/index'

// Utils
import { createToken, extractToken } from '../utils/jwtTokens'
import { copyObj } from '../utils/copyObject'

// ----------Sign Up----------

const signUp: RequestHandler = async (req, res, next) => {
    const { firstNames, lastName, username, email, password, passwordConfirm } =
        req.body

    if (
        !firstNames ||
        !lastName ||
        !email ||
        !username ||
        !password ||
        !passwordConfirm
    ) {
        return res.status(400).json({ message: 'Please fill out all fields' })
    }

    console.log('got past security check')

    try {
        const result = await cloudinary.uploader.upload(
            env.USER_DEFAULT_AVATAR,
            {
                public_id: email.split('@')[0],
                folder: 'user-avatars',
            }
        )
        console.log(result) // Log the result for debugging

        const newUser = await User.create({
            firstNames,
            lastName,
            email,
            username,
            password,
            passwordConfirm,
            avatarURL: result.secure_url,
        })

        const accessToken = createToken(newUser.id)

        res.cookie('jwt', accessToken, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        })

        res.status(201).json({
            status: 'success',
            accessToken,
            user: newUser.getUserInfo(),
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}

// ---------- Login ----------

const login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: 'Please provide email and password' })
        }

        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            return res.status(401).json({ message: 'User not found' })
        }

        if (password && user.password) {
            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            )
            if (!isPasswordValid) {
                return res
                    .status(401)
                    .json({ message: 'Could not log in, please try again' })
            }
            user.password = undefined
        } else {
            return res
                .status(401)
                .json({ message: 'Could not log in, please try again' })
        }

        const accessToken = createToken(user.id)

        res.cookie('jwt', accessToken, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        })

        res.status(200).json({
            status: 'success',
            accessToken,
            user: user.getUserInfo(),
        })
    } catch (error) {
        console.log('Error during user retrieval:', error)
    }
}

//----------Logout----------

const logout: RequestHandler = (req, res, next) => {
    res.clearCookie('jwt')
    res.status(200).json({ message: 'Logged out' })
}

//----------Protect----------

const protect: RequestHandler = async (req, res, next) => {
    try {
        const token = extractToken(req)

        if (!token) {
            return res.status(401).json({ message: 'Unatuhorized' })
        }

        const { iat, _id } = jwt.verify(token, env.JWT_SECRET) as JwtPayload
        if (!iat) {
            return res.status(401).json({ message: 'Please login again' })
        }
        const decodedDate = new Date(iat * 1000)
        const user = await User.findById(_id)

        if (!user) {
            return res.status(401).json({ message: 'User not found' })
        }

        if (user.changedPasswordAfter(decodedDate)) {
            return res.status(401).json({ message: 'Please login again' })
        }

        req.user = user.id

        next()
    } catch (error) {
        console.log(error)
        return next()
    }
}

//----------Is Logged In----------

const isLoggedIn: RequestHandler = async (req, res, next) => {
    const user = await User.findById(req.user)
    if (!user) {
        return res.status(400).json({ message: 'Please login again' })
    }

    return res.status(200).json({
        status: 'success',
        user: user?.getUserInfo(),
    })
}

//----------Forgot Password-----------
const forgotPassword: RequestHandler = async (req, res, next) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(401).json({ message: 'User not found' })
    }

    const resetToken = user.createPasswordResetToken()
    try {
        await user.save({ validateBeforeSave: false })

        const resetURL = `${req.protocol}:/${req.get(
            'host'
        )}/api/v2/users/reset-password/${resetToken}`
        const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`

        res.status(200).json({
            status: 'success',
            message: message,
        })
    } catch (error) {
        user.passwordResetToken = undefined
        user.passwordResetExpiresIn = undefined
        await user.save({ validateBeforeSave: false })
        console.log(error)
        return next()
    }
}

//----------Reset Password----------

const resetPassword: RequestHandler = async (req, res, next) => {
    const { password, passwordConfirm } = req.body
    const hashedToken = createHash('sha256')
        .update(req.params.token)
        .digest('hex')

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpiresIn: { $gt: Date.now() },
    })

    if (!user) {
        return res.status(401).json({ message: 'User not found' })
    }

    user.password = password
    user.passwordConfirm = passwordConfirm
    user.passwordResetToken = undefined
    user.passwordResetExpiresIn = undefined

    await user.save()

    res.status(200).json({
        status: 'success',
        uesr: user.getUserInfo(),
    })
}

//----------Update Password----------

const updatePassword: RequestHandler = async (req, res, next) => {
    const { currentPassword, password, passwordConfirm } = req.body

    try {
        const user = await User.findById(req?.user).select('+password')
        if (!user || !user.password) {
            return next()
        }

        if (!(await user.correctPassword(currentPassword, user.password))) {
            return res
                .status(401)
                .json({ message: 'Current password is invalid' })
        }

        if (password !== passwordConfirm) {
            return res.status(401).json({ message: 'passwords do not match' })
        }

        user.password = password
        user.passwordConfirm = passwordConfirm
        await user.save()

        const accessToken = createToken(user.id)

        res.cookie('jwt', accessToken, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        })

        res.status(200).json({
            status: 'success',
            accessToken,
            user,
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}

//----------Get My Account----------

const getMyAccount: RequestHandler = async (req, res, next) => {
    try {
        const user = await User.findById(req?.user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.status(200).json({
            status: 'success',
            user: user.getUserInfo(),
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}

//----------Update My Account----------

const updateMyAccount: RequestHandler = async (req, res, next) => {
    try {
        const { body } = req
        if (body.password || body.passwordConfirm) {
            return res
                .status(400)
                .json({ message: `Please use "Update My Password"` })
        }

        if (body.avatarURL) {
            const result = await cloudinary.uploader.upload(
                body.avatarURL,

                {
                    public_id: body.username,
                    folder: 'user-avatars',
                }
            )
            body.avatarURL = result.secure_url
        }

        const filteredBody = copyObj(
            req.body,
            'firstNames',
            'lastName',
            'username',
            'email',
            'avatarURL'
        )

        const updatedUser = await User.findByIdAndUpdate(
            req?.user,
            filteredBody,
            {
                new: true,
                runValidators: true,
            }
        )

        res.status(200).json({
            status: 'success',
            user: updatedUser?.getUserInfo(),
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}

const deleteMyAccount: RequestHandler = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req?.user, { active: false })
    } catch (error) {
        console.log(error)
        return next()
    }
}

export {
    signUp,
    login,
    logout,
    protect,
    forgotPassword,
    resetPassword,
    updatePassword,
    getMyAccount,
    updateMyAccount,
    deleteMyAccount,
    isLoggedIn,
}
