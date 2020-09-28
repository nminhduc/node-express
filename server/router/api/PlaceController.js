const express = require('express');
const router = express.Router();
const db = require("../../models");
const Place = db.place;
router.post('/create', async(req,res) =>{
    var name = req.body.name;
    var description = req.body.description;
    var orders = req.body.orders;
    async function findPlace (name) {
        return await Place.findOne({
          where: {
            name: name
          }
        });
    }
    try {
        if(!findPlace(name)){    
            Place.create({
                name: name,
                description: description,
                orders: orders
            });
            res.send('Success')  ;
        }
        res.send('Failure')  ;
    } catch (error) {
        this.error = error.message;
    } 
   
});
router.post('/update', async(req,res) =>{
    var id = req.body.id;
    var name = req.body.name;
    var description = req.body.description;
    var orders = req.body.orders;
    async function findPlace (id) {
        return await Place.findOne({
          where: {
            id: id
          }
        });
    }
    try {
        let place = await findPlace(id);
        if(place){    
            Place.update({
                name: name,
                description: description,
                orders: orders,},
                {
                where: {
                    id: id
                }

            });
            res.send('Success')  ;
        }
        res.send('Failure')  ;
    } catch (error) {
        this.error = error.message;
    } 
   
});



module.exports = router;