import "reflect-metadata";
import "./infra/database/connection"
import "./infra/container"
import express from 'express'
import cors from 'cors'
import routes from './infra/http/routes'

const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(8000, () => console.log('server on port localhost:8000'))