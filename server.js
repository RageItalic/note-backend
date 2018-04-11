const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;


//app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const notes = require('./routes/notes.js');
const users = require('./routes/users.js');

app.use('/notes', notes);
app.use('/users', users);

app.get('/', (req, res) => {
  var message = {
    status: 404,
    content: "HELLO"
  }
  res.send(message)
})

app.get('/authenticate', (req, res) => {
  var obj = {
    authenticated: true
  }
  console.log("SENDING AUTH")
  res.send(obj)
})

app.listen(PORT, () => console.log(`Successfully listening on ${PORT}`));