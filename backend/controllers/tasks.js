const express = require('express');
const router = express.Router();
const tasksModel = require('../models/Tasks');
const {protect} = require('../middleware/authMiddleWare');

router.post('/', protect, async (req, res) => {
    try{
        var {task, description, deadLine} = req.body;
        deadline = String(deadLine ?? null);
        let deadline2 = deadline?.split('/');
        let dateDaeadLine = null;
        if(deadline)
        dateDaeadLine = new Date(Number(deadline2[2]), Number(deadline2[1]) - 1, Number(deadline2[0]) + 1);

        var newTask = new tasksModel({
            user: req.user.id,
            task: task,
            description: description,
            deadLine: dateDaeadLine
        });

        await newTask.save();
        res.json(newTask);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Unknown error.");
    }
});

router.get('/', protect, async (req, res) => {
    try{
        var tasks = await tasksModel.find({ user: req.user.id });
        res.status(200).json(tasks);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Unknown error.");
    }
});

module.exports = router;