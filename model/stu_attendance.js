const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Stu_attendace=sequelize.define('stu_attendace',{
    id:{
                type:Sequelize.INTEGER,
                autoIncrement:true,
                allowNull:false,
                primaryKey:true
    },
    remark:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    }
});

module.exports=Stu_attendace;