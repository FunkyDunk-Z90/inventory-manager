import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import userRouter from './routes/userRoutes'
import inventoryRouter from './routes/inventoryRouter'

const app = express()

app.use(morgan('dev'))

app.use(
    cors({
        origin: ['http://localhost:8000', 'http://localhost:5173'],
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
)

app.use(express.json({ limit: '100mb' }))
app.use(cookieParser())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/inventory-manager', inventoryRouter)

export default app
