const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();
const ParentDetail = require('../models/parentDetailModel');

router.use(bodyParser.json());

router.get('/',async(req, res) => {
    try {
        const user = res.locals.user;
        // const parentJWT = user.id;
        const getParents = await ParentDetail.findOne({userJWT:user.id});
        // console.log("this is ",getParents);
        if(getParents){
            res.render('update_detail',{
                success:'',
                parentName1:getParents.parentName1,
                parentMob1:getParents.parentMob1,
                parentName2:getParents.parentName2,
                parentMob2:getParents.parentMob2,
                parentEmail:getParents.parentEmail
            })
        } else {
            res.render('update_detail',{
                success:'',
            });
        }

    } catch (error) {
        res.statusCode = 404;
        res.send(error);
    }
    });

    
router.post('/',async(req, res) => {
        try {
            const user = res.locals.user;
            const parentJWT = user.id;
            // console.log(user);
                const updatedetail = await ParentDetail.findOneAndUpdate({userJWT:parentJWT},
                        {parentName1 : req.body.parentName1,
                        parentMob1:req.body.parentMob1,
                        parentName2 : req.body.parentName2,
                        parentMob2:req.body.parentMob2,
                        parentEmail:req.body.parentEmail});
                // console.log(updatedetail);
                const updateGuardian = await updatedetail.save();
                res.status(200).redirect('/guardian_update');
        } catch (error) {
            res.send(error);
        }
})
    
module.exports = router;
