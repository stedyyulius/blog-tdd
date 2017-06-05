const Blogs = require('../Models/blog.js')

function addBlog (req,res,next){
  Blogs.create({
    title:req.body.title,
    blog: req.body.blog
  },function(err,result){
    res.send(result)
  })
}

function listBlogs (req,res,next){
  Blogs.find({},function(err,result){
    res.send(result)
  })
}

function getBlog (req,res,next){
  Blogs.findOne({
    _id: req.params.id
  },function(err,result){
    res.send(result)
  })
}

// function userBlogs (req,res,next){
//   // Blogs.find({
//   //   user_id: 
//   // },function(err,result){
//   //   res.send(result)
//   // })
// }

function deleteBlog(req,res,next){
  Blogs.remove({
    _id:req.params.id
  },function(err,result){
    res.send(`Delete Success!`)
  })
}

function updateBlog (req,res,next){
  Blogs.findOne({
    _id:req.params.id
  },function(err,result){
    Blogs.updateOne({
      _id:req.params.id
    },{
      title:req.body.title || result.title,
      blog: req.body.blog || result.blog
    },function(err,result){
      res.send(`Update Succes!`)
    })
  })
}


module.exports={
  addBlog,listBlogs,deleteBlog,getBlog,updateBlog
}