const mongoose  = require('mongoose');
const TasksSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    task: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    deadLine: {
        type: Date
    },
    startedAt: {
        type: Date
    },
    endedAt: {
        type: Date
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Tasks', TasksSchema);