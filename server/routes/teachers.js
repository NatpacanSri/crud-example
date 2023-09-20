const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Teacher = require('../models/Teacher')
const { ObjectId } = require('mongodb');

const objectId = new ObjectId();

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.get('/', async (req, res, next) => {
    try {
        const data = await Teacher.find()
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/oneTch/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await Teacher.findById(id)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.post('/addTch', async (req, res, next) => {
    try {
        const data = await Teacher.create(req.body)
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.put('/editTch/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const { tchID, name, gender, age } = req.body
        const data = await Teacher.findById(id).updateOne({
            $set: {
                tchID: tchID,
                name: name,
                gender: gender,
                age: age
            }
        })

        // console.log("objectID:=>"+objectId(id))
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.delete('/deleteTch/:id', async (req,res,next)=>{
    try {
        const id = req.params.id
        const data = await Teacher.findById(id).deleteOne()
        res.json(data)
    } catch (err) {
        next(err)
    }
})

module.exports = router