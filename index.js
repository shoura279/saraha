import express from 'express'
import { connectDB } from './db/connection.js'
import { globalErrorHandling } from './src/utils/asyncHandler.js'
import { authRouter } from './src/modules/auth/auth.router.js'
const app = express()
const port = 3000

app.use(express.json())
connectDB()
app.use(globalErrorHandling)

app.use('/auth',authRouter)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))