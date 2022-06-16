import {Schema, model, models } from "mongoose";



const studentSchema = new Schema({
    roll: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
})

const studentModel = models.student || model('student', studentSchema) ;

export default studentModel ;