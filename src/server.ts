import 'reflect-metadata'
import 'dotenv/config'
import './infra/database/connection'
import './infra/container'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'
import routes from './infra/http/routes'
import AppError from '@infra/errors/AppError'

const app = express()
app.use(express.json())
app.use(cors())
// app.use(express.urlencoded({ type: 'multipart/form-data' }))
app.use(routes)

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
        error: error.erroMessage
      })
    }

    console.error(error)
    return response.status(500).json({
      status: 'error',
      message: 'Internal server Error'
    })
  }
)

app.listen(8000, () => console.log('server on port localhost:8000'))
