const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Tariff = require('../models/tariffModel.js');

const tariffRouter = express.Router();

tariffRouter.use(bodyParser.json());
// add-tariff Post Method Route----------------------------------------------->

tariffRouter.route('/')
    .get((req,res)=>{
        Tariff.find({})
            .then((tariff)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.json(tariff);
            })
    })
    .post((req,res,next)=>{
        Tariff.create(req.body)
            .then((tariff)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.json('.New Tariff Added Successfully'); 
            },(err)=>next(err))
            .catch((err)=>next(err));
    });

tariffRouter.route('/:id')
    .put((req,res,next)=>{
        Tariff.findOneAndUpdate({_id:req.params.id},{
            cabType: req.body.cabType,
            normalRate: req.body.normalRate,
            peakRate: req.body.peakRate,
            startPeakTime: req.body.startPeakTime,
            endPeakTime: req.body.endPeakTime,
            baseFare: req.body.baseFare})
            .then((tariff)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.json(tariff);   
            },(err)=>next(err))
            .catch((err)=>next(err));
    })
    .delete((rq,res,next)=>{
        Tariff.deleteOne({_id:req.params.id})
            .then((resp)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.json('Tariff removed Successfully'); 
            },(err)=>next(err))
            .catch((err)=>next(err));
    })

module.exports = tariffRouter; 