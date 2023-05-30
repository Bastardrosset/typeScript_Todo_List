const mongoose = require('mongoose');
const validator = require('validator');

const TaskSchema = new mongoose.Schema({
    posterId: {
        type: String,
    },
    pseudo: {
        type: String,
        required: [true, 'Please tell us your pseudo !'],
        minlength: [3, 'A pseudo must have more or equal then 3 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email !'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    name: {
        type: String,
        required: [true, 'A task must have a name'],
        trim: true,    
    },
    description: {
        type: String
    },
    category:{
        type: String
    },
    priority: {
        type: String,
        enum: ['Basse', 'Moyenne', 'Haute'], // Valeurs valides 
        required: [true, 'A task needs priority'],
        default: 'Moyenne'
    },
    status: {
        type: String,
        enum: ['En attente', 'En cours', 'Fini'],
        default: 'En attente'
    },
    deadline: [Date, 'yyyy-MM-dd'],
    startDate: [Date],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    update: {
        type: Date,
    }
}, {
    timestamps: true,
});

const ModelTask = mongoose.model('Task', TaskSchema);

module.exports = ModelTask;
