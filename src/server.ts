import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import projectRoutes from './routes/ProjectRoutes'
import { conncectDB } from './config/db'
import { corsConfig } from './config/cors'

dotenv.config()

conncectDB(process.env.DATABASE_URL)
const app = express()
app.use(cors(corsConfig))
app.use(express.json())
app.use('/api/projects', projectRoutes)
export default app