/// <reference types="vite/client" />

type tEventTypes = ChangeEvent | MouseEvent | MouseEventHandler<HTMLElement>
type tBtnRef = RefObject<HTMLButtonElement>

type tObjectType = { [key: string]: string }

type tReactProps = {
    children: ReactNode
}

type tInputEvent = ChangeEvent<HTMLInputElement>
type tFormEvent = FormEvent<HTMLFormElement>
type tMouseEvent = MouseEvent<HTMLButtonElement, MouseEvent>

interface iLinks {
    linkName: string
    url: string
    icon?: string
}

//---------- Axios Types ----------

interface iAxiosError {
    message: string
    errors: Record<string, string[]>
}

//---------- User ---------

interface iLoginData {
    email: string
    password: string
}

interface iPasswordReset {
    currentPassword?: string
    newPassword: string
    passwordConfirm: string
}

interface iUpdateData {
    firstName?: string
    lastName?: string
    username?: string
    email?: string
    avatarURL?: string
}

interface iSignUpData extends iLoginData {
    firstName: string
    lastName: string
    username: string
    avatarURL: string
    passwordConfirm: string
}

type tData = iLoginData | iSignUpData | iUpdateData | iPasswordReset | string

//---------- Crud Ops ----------

type tAuth =
    | 'login'
    | 'signUp'
    | 'forgotPassword'
    | 'logout'
    | 'isLoggedIn'
    | 'update'

type tRequest = 'GET' | 'POST' | 'PATCH' | 'DELETE'

type tReqProps = {
    dataToSend?: tData
    url: string
    credentials?: boolean
    authType?: tAuthType
    requestType: tRequest
}

//----------User Types-----------

interface iUser {
    id: string
    firstNames: string[]
    lastName: string
    username: string
    email: string
    avatarURL: string
    password: string
    passwordConfirm: string
}

//----------- Reducer Types -----------

type tUserState = iUser | null

type SetUserState = {
    type: 'SET_STATE'
    payload: StateType
}

type ClearUserState = {
    type: 'CLEAR_STATE'
}

type tUserReducer = SetUserState | ClearUserState

//---------- Forms ----------

interface iLabel {
    label: string
    htmlFor: string
}

interface iInput {
    type: 'text' | 'password' | 'number' | 'time'
    id: string
    name: string
    placeholder?: string
    handleChange?: (e: ChangeEvent<HTMLInputElement>) => void
    handleReset?: () => void
    value?: string | number | readonly string[] | undefined
}

interface iLabelAndInput {
    labelObj?: iLabel
    inputObj: iInput
}
