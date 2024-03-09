const express = require('express');
const router = express.Router();
const Products = require('../models/Products');

router.get('/products', async (req, res) => {
    try{
        await Products.find().then((products) => {
            res.json(products);
        });
    }
    catch(err){
        res.json({message: err});
    }
});

router.post('/products', async (req, res) => {
    const prod = new Products({
        prodNo: req.body.prodNo,
        prodName: req.body.prodName,
        prodNameUnique: req.body.prodName,
        description: req.body.description
    });
    
    try{
        await prod.save().then((data) => {
            res.send(data);
        });
    }
    catch(err) {
        res.status(400).send(err);
    }
})

router.patch('/products', async (req, res) => {
    if(req.body.prodNo === undefined)
        res.status(404).json({error: 'Product No. or old value'});
})

module.exports = router;