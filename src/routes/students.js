const express = require('express')
const schema = require('../db/schema')
const db = require('../db/connection')

const students = db.get('students')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
    const allStudents = await students.find({})
    res.json(allStudents)
    } catch(error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const student = await students.findOne({
            _id: id
        })

        if(!student) {
            const error = new Error('Not a student')
            return next(error)
        }

        res.json(student)
    } catch (error){
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const { name, address} = req.body
        await schema.validateAsync({name, address})

        const student = await student.findOne({
            name
        })

        if(student) {
            const error = new Error('Student already exists')
            res.status(409)
            return next(error)
        }

        const newStudent = await students.insert({
            name,
            address
        })
        res.status(201).json(newStudent)
    } catch(error){
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try{
        const { id } = req.params
        const { name, address} = req.body
        const result = await schema.validateAsync({name, address})
        const student = await students.findOne({
            _id:id
        })

        if(!student) {
            return next()
        }

        const updatedStudent = await student.update({
            _id:id,
        }, {$set:result}, {upsert: true})

        res.json(updatedStudent)

    } catch(error){
        next(error)
    }
})

router.delete('/:id', async(req, res, next) => {
    try{
        const { id } = req.params
        const student = await students.findOne({
            _id:id
        })

        if(!student) {
            return next()
        }
        await students.remove({
            _id:id
        })

        res.json({
            message: 'Student information deleted'
        })


    } catch(error){
        next(error)
    }
})

module.exports = router