const express = require('express')
const app = express()
const port = 5050

app.get('/', (req, res) => {
  res.send('Hello Everyone this is the backend server for the project')
})

app.listen(port, () => {
  console.log(`Backend Server Started ${port}`)
})