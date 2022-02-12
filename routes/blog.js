const express=require('express')
const router=express.Router()
const {createBlog,deleteBlog,getAllBlogs,singleBlog,updateBlog,uploadImg}=require('../controllers/blog')
const {authentication,authorization}=require('../middileware/authentication')

router.route('/').get(authentication,getAllBlogs)
router.route('/create').post(authentication,createBlog)
router.route('/:id').get(authentication,singleBlog).patch(authentication,authorization('admin'),updateBlog).delete(authentication,authorization('admin'),deleteBlog)

router.route('/upload').post(uploadImg)


module.exports=router