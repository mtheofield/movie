const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    descrpition: {
        type: String,
    },
    status: {
        type: String,
        enum: ['not started', 'in progress', 'completed'],
    },
    clientId: { 
        type: mongoose.Schema.Types.ObjectId,
    }
});

module.exports = mongoose.model('Project', ProjectSchema);