const express = require('express');
const router = express.Router();
const tasksModel = require('../models/Tasks');

router.post('/', async (req, res) => {
    try{
        var {task, description, deadLine} = req.body;
        deadline = String(deadLine ?? null);
        let deadline2 = deadline?.split('/');
        if(deadline)
            deadline = new Date(Number(deadline2[2]), Number(deadline2[1]) - 1, Number(deadline2[0]) + 1);

        var newTask = new tasksModel({
            task: task,
            description: description,
            deadLine: deadLine
        });

        await newTask.save();
        res.json(newTask);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Unknown error.");
    }
});

router.get('/', async (req, res) => {
    try{
        var tasks = tasksModel.find({ user: req.user.id });
        res.json(tasks);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Unknown error.");
    }
});

module.exports = router;