const express=require('express');
const cors=require('cors');

const app=express();


const bodyParser=require('body-parser');

const sequelize=require('./util/database');

const Student_Router=require('./routes/student_route');
const AttendaceStuRouter=require('./routes/attendance_stu');
const AttendaceRouter=require('./routes/attendance');
const FetchReportRouter=require('./routes/fetch_report');

const Student=require('./model/student');
const Attendace=require('./model/attendance');
const Stu_Attendace=require('./model/stu_attendance');

app.use(cors());

app.use(bodyParser.json({extended:false}));

app.use(AttendaceRouter);
app.use(Student_Router);
app.use(AttendaceStuRouter);
app.use(FetchReportRouter);

Student.belongsToMany(Attendace,{through:Stu_Attendace});
Attendace.belongsToMany(Student,{through:Stu_Attendace});


sequelize
// .sync({force:true})
.sync()
// .then((result)=>{
        //  Student.create({name:'tina'});
        //  Student.create({name:'raj'});
        //  Student.create({name:'satya'});
        // return Student.create({name:'poonam'});
    // })
    .then(result=>{
        app.listen(3000);
        
    })
.catch(err=>console.log(err));


