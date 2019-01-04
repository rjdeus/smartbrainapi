const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
      connectionString : 'postgres://miigunjaytzcfk:7fd728d5b4dbf0267f0e2001575914d8f9e401ae9cea294e30b33c7edd377eb8@ec2-54-225-227-125.compute-1.amazonaws.com:5432/d4bi11p1644ngv?ssl=true',
      ssl: true,
    }
});

const app = express();

app.use(bodyParser.json())
app.use(cors())

app.get('/',(req, res)=>{
    res.send('it is working')
})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})

app.put('/image', (req,res)=>{image.handleImage(req,res,db)})

app.post('/imageurl', (req,res)=>{image.handleApiCall(req,res)})


app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`);
})
