const express       = require('express');
const router        = express.Router();
const bodyParser    = require('body-parser');
const environment   = 'development';
const configuration = require('../knexfile.js')[environment];
const knex          = require('knex')(configuration);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}))


router.get('/:id', (req, res) => {
  knex.select('*')
    .from('notes')
    .where('id', '=', req.params.id)
  .then(response => {
    res.status(200).send(response)
  })
})

router.post('/save', (req, res) => {
  console.log('BODYYYDY,', req.body)
  knex('notes')
    .insert([{
      title: req.body.title,
      email: req.body.email,
      content: req.body.content
    }])
  .then(response => {
    knex.select('*')
      .from('notes')
      .where('title', '=', req.body.title)
    .then(note => {
      res.status(200).send(note)
    })
  })
  .catch(err => {
    console.log("Ruh Roh, ", err)
  })
})

module.exports = router;