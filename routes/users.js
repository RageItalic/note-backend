const express       = require('express');
const router        = express.Router();
const bodyParser    = require('body-parser');
const environment   = 'development';
const configuration = require('../knexfile.js')[environment];
const knex          = require('knex')(configuration);
const session       = require('express-session');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}))

router.use(session({
  secret: 'notGoingToWork',
  resave: false,
  saveUninitialized: true
}))

var userDB = {
  users: [
    {
      id: 1,
      name: 'Joe Patel',
      email: 'starr@fgmal.com',
      password: 'jarlesStarkley'
    },
    {
      id: 2,
      name: 'Bogart Patel',
      email: 'humphrey@fgmal.com',
      password: 'music?'
    },
    {
      id: 3,
      name: 'Umesh Patel',
      email: 'umesh@fgmal.com',
      password: 'cutiePie'
    },
    {
      id: 4,
      name: 'Scooby Patel',
      email: 'scobs@fgmal.com',
      password: 'veryGoodBoy'
    },
    {
      id: 5,
      name: 'Parth Patel',
      email: 'parthpatelgee@gmail.com',
      password: 'tatti123'
    }
  ]
}

router.post('/login', (req, res) => {
  console.log("body", req.body)
  const loggedUser = userDB.users.find(user => user.email == req.body.email && user.password == req.body.password)
  console.log("user exists, ", loggedUser)
  console.log("req session before, ", req.session)
  req.session['userID'] = loggedUser.id;
  req.session['name'] = loggedUser.name;
  req.session['email'] = loggedUser.email;
  console.log("SESSION EXISTS ON BACKEND")
  console.log("req session after", req.session)
  res.status(200).send(req.session)
})

router.post('/signup', (req, res) => {
  console.log("body", req.body)
  let userData = {};
  userData.id = Math.random()*100;
  userData.name = req.body.name;
  userData.email = req.body.email;
  userData.password = req.body.confirmPassword;
  userDB.users.push(userData);
  req.session['userID'] = userData.id;
  req.session['name'] = userData.name;
  req.session['email'] = userData.email;
  console.log("new userDB, ", userDB)
  res.status(200).send(userData)
})

router.get('/personNotes/:email', (req, res) => {
  console.log("HI", req.session)
  if (req.session.userID && req.session.email === req.params.email) {
    console.log("HELLO")
    knex.select('*')
      .from('notes')
      .where('email', '=', req.params.email)
    .then(notes => {
      res.status(200).send(notes);
    })
  } else {
    console.log("NO. Something Went WRONG. VERY WRONG.")
    res.sendStatus(404);
  }
})

router.get('/logout', (req, res) => {
  console.log("Logout Called.")
  req.session.destroy((err) => {
    // cannot access session here
    if(err) {
      console.log("ERROR", err)
      res.send("There has been an error, try to logout again.")
    } else {
      console.log("logged out")
      res.sendStatus(200)
    }
  })
})

router.get('/:email', (req, res) => {
  knex.select('*')
    .from('notes')
    .where('email', '=', req.params.email)
  .then(notes => {
    res.status(200).send(notes);
  })
})

module.exports = router;