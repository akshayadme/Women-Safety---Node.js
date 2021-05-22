const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();
const ParentDetail = require('../models/parentDetailModel')
const {checkRoutes, checkUser} = require('../middleware/authViews');

router.use(bodyParser.json());

router.get('/', (req, res) => {
    const user = res.locals.user;
    res.render('add_detail', {
        errors: '',
        success: '',
        
            });
});
router.post('/',async(req, res) => {
    try {
        const user = res.locals.user;
            const adddetail = await ParentDetail.findOne({userJWT:user.id});
            // console.log(adddetail);
            if(adddetail){
                res.render('add_detail', {
                    errors: 'Data Already Exist! You can only update data now',
                    success: '',
                })
            } else {
                const parents = new ParentDetail({
                    userJWT:user.id,
                    parentName1:req.body.parentName1,
                    parentName2:req.body.parentName2,
                    parentMob1:req.body.parentMob1,
                    parentMob2:req.body.parentMob2,
                    parentEmail:req.body.parentEmail
                });
                const postParents = await parents.save();
                res.render('add_detail', {
                    errors: '',
                    success: 'Data Added Successfully!!!'
                })
            } 
    } catch (error) {
        res.send(error);
    }
    
    });

router.get('/update', async (req, res) => {
    try {
        const user = res.locals.user;
        const parentJWT = user.id;
        const getParents = await ParentDetail.findOne({userJWT:parentJWT});
        console.log(getParents);
        if(getParents){
            res.render('update_detail',{
                success:'',
                record:getParents
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

    
router.post('/update',async(req, res) => {
        try {
            const user = res.locals.user;
            const parentJWT = user.id;
            console.log(user);
                const updatedetail = await ParentDetail.findOneAndUpdate({userJWT:parentJWT},
                        {parentName1 : req.body.parentName1,
                        parentMob1:req.body.parentMob1,
                        parentName2 : req.body.parentName2,
                        parentMob2:req.body.parentMob2,
                        parentEmail:req.body.parentEmail});
                console.log(updatedetail);
                const updateGuardian = await updatedetail.save();
                res.status(200).render('update_detail',{
                    success: 'Data Added Successfully!!!'
                });
        } catch (error) {
            res.send(error);
        }
        
        })
    
module.exports = router;
