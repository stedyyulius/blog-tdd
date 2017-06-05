const Users = require('../Models/user.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)
require('dotenv').config()


function signup (req,res,next){
  let hash = bcrypt.hashSync(req.body.password,salt)
  Users.create({
    username:req.body.username,
    password: hash,
    email: req.body.email
  },function(err,result){
    res.send(result)
  })
}

function login (req,res,next){
  Users.findOne({
    username: req.body.username
  },function(err,result){
    if(result.length < 1){
      res.send('invalid username!')
    }
    else{
      if(bcrypt.compare(req.body.password,result.password)){
        let token = jwt.sign({_id:result._id,username:result.username,email:result.email})
        res.send(token)
      }
      else{
        res.send('invalid password!')
      }
    }
  })
}

function deleteUser (req,res,next){
  Users.remove({
    _id: req.params.id
  },function(err,result){
    res.send(result)
  })
}

function updateUser (req,res,next){
  let hash = bcrypt.hashSync(req.body.password,salt)
  Users.findOne({
    _id: req.params.id
  },function(err,result){
    Users.updateOne({
      _id: req.params.id
    },{
      username: req.body.username || result.username,
      password: hash || result.password,
      email: req.body.email || result.email
    },function(err,result){
      res.send(result)
    })
  })
}

function getUser (req,res,next){
  Users.findOne({
    _id:req.params.id
  },function(err,result){
    res.send(result)
  })
}

function listUsers (req,res,next){
  Users.find({},function(err,result){
    res.send(result)
  })
}

module.exports = {
  getUser,updateUser,deleteUser,login,signup,listUsers
}