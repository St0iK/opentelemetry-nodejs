const express = require('express')
const app = express()
const port = 5000

app.get('/hello', async function (req, res) {
  // send back hello message
  res.type('json')
  res.send(JSON.stringify({ hello: "world" }))
})

app.listen(
  port,
  function () {
    console.log(`Example app listening at http://localhost:${port}`)
  }
)