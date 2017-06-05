const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const server = require('../app.js')
const Blogs = require('../Models/blog.js')
const Users = require ('../Models/user.js')
const should = chai.should()
var id = ""
var user_id = ""


describe('Blogs',function(){
  beforeEach(function(done){
    var createBlog = new Blogs({
      title: 'the legacy of test',
      blog: 'once upon a time'
    })
    createBlog.save((err,data)=>{
      id = data._id 
      done()
    })
  })


afterEach(function(done){
  Blogs.remove({},function(err){
    done()
  })
})

describe('Get all blogs in GET /blog',function(){
  it('should return all blogs',function(done){
    chai.request(server)
    .get('/blog')
    .end((err,res)=>{
      res.should.have.status(200)
      res.body.should.be.a('array')
      // res.body.length.should.equal(1)
      done()
    })
  })
  // it('should return error')
})

describe('Create new Blog in POST /blog',function(){
  it('should return one blog created',function(done){
    chai.request(server)
    .post('/blog')
    .send({
      title: 'asli',
      blog: 'uda pass woi'
    })
    .end((err,res)=>{
      console.log(res.body);
      res.should.have.status(200)
      res.body.should.be.a('object')
      res.body.should.have.property('title')
      res.body.should.have.property('blog')
      done()
    })
  })
  // it('should return error')
})

describe('Delete Blog in DELETE /blog/:id',function(){
  it('should delete one blog',function(done){
    chai.request(server)
    .delete(`/blog/${id}`)
    .end((err,res)=>{
      res.should.have.status(200)
      res.body.should.be.a('object')
      done()
      })
    })
  })
  
describe('Edit Blog in PUT /blog/:id',function(){
  it('should update one blog',function(done){
    chai.request(server)
    .put(`/blog/${id}`)
    .end((err,res)=>{
      res.should.have.status(200)
      res.body.should.be.a('object')
      done()
      })
    })
  })

describe('Get one Blog in GET /blog/:id',function(){
  it('should get one blog',function(done){
    chai.request(server)
    .get(`/blog/${id}`)
    .end((err,res)=>{
      console.log(res.body);
      res.should.have.status(200)
      res.body.should.be.a('object')
      done()
      })
    })
  })  
})

describe('Users',function(){
  beforeEach(function(done){
    var createUsers = new Users({
      username: 'testguy',
      password: 'testguy',
      email: 'test@gmail.com'
    })
    createUsers.save((err,res)=>{
      user_id = res._id
      done()
    })
  })
  
  afterEach(function(done){
    Users.remove({},function(err){
      done()
    })
  })
  
  describe(`list all users in database in GET /users`,function(){
    it('should return all users', function(done){
      chai.request(server)
      .get('/users')
      .end((err,res)=>{
        console.log(`1 `+res.body);
        res.should.have.status(200)
        res.body.should.be.a('array')
        done()
      })
    })
  })
  
  describe('Get one user in GET /users/:id',function(){
    it('should return one user', function(done){
      chai.request(server)
      .get(`/users/${user_id}`)
      .end((err,res)=>{
        console.log(`2 `+ res.body);
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
    })
  })
  
  describe('Delete one user in DELETE /users/:id',function(){
    it('should delete one user',function(done){
      chai.request(server)
      .delete(`/users/${user_id}`)
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
    })
  })
  
  describe('Edit one user in PUT /users/:id',function(){
    it('should edit one user',function(done){
      chai.request(server)
      .put(`/users/${user_id}`)
      .send({
        username: 'timo',
        password: 'timo',
        email: 'timo'
      })
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
    })
  })
  
  describe('Sign Up user in POST /users/signup',function(){
    it('should register a user',function(done){
      chai.request(server)
      .post(`/users/signup`)
      .send({
        username: 'tester',
        password: 'tester',
        email: 'testguy@gmail.com'
      })
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
    })
  })
  
  describe('Log in a user in POST /users/login',function(){
    it('should login a user and develop a token',function(done){
      chai.request(server)
      .post('/users/signup')
      .send({
        username: 'testguy',
        password: 'testguy'
      })
      .end((err,res)=>{
        console.log(`login `+ res.body);
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
    })
  })  
})
