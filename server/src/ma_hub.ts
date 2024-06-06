import express from 'express'

import cors from 'cors'
import { sendResults } from './controllers/eletrochek-shoes/sendResultTests'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/get-results', sendResults)

app.listen(8080, () => {
    console.log('on')
})