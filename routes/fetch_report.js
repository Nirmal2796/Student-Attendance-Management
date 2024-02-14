const express=require('express');

const FetchReport=require('../controller/fetchReport');

const router=express.Router();


router.get('/fetchReport', FetchReport.getReport);


module.exports=router;