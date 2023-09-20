const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Student = require('../models/Student')


router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.get('/',async (req,res,next)=>{
    try {
        const data = await Student.find()
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.get("/avs", async (req, res, next) => {
    try {
        const students = await Student.find().populate('adviser', 'name');
        console.log(students);
        res.json(students);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

router.post('/addStd',async (req,res,next)=>{
    try {
        const data = await Student.create(req.body)
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

module.exports = router