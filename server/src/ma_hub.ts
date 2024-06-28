import express from 'express'

import cors from 'cors'
import { sendResults } from './controllers/sendResultTests'
import { sendExcel } from './views/sendExcel'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/get-results', sendResults)

app.get('/test', sendExcel)

app.listen(8080, () => {
    console.log('on')
})