const Sequelize=require('sequelize').Sequelize;

const sequelize=new Sequelize('student_attendance','root','Nirmal@27',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;