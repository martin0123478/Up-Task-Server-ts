import express from 'express'
import dotenv from 'dotenv'
import projectRoutes from './routes/ProjectRoutes'
import { conncectDB } from './config/db'

dotenv.config()
conncectDB(process.env.DATABASE_URL)
const app = express()
app.use(express.json())
app.use('/api/projects', projectRoutes)
export default app