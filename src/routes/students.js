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