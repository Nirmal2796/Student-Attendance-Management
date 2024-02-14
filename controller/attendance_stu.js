const Attendance=require('../model/attendance');
const Attendance_stu=require('../model/stu_attendance');


exports.postStudents=(req,res,next)=>{
    
    const date=req.body.date;
    const sid=req.body.studentId;
    const pre=req.body.pre;

    
    const data=Attendance.create({
        date:date
    })
    .then(res=>{
        return Attendance.findOne({where: {date:date}});
    })
    .then(data=>{
        // console.log(data.id);

        return Attendance_stu.create({
            studentId:sid,
            attendanceId:data.id,
            remark:pre
        });
    
        
    })
    .then(res=>{
        res.redirect('/');
    })  
    .catch(err=>console.log(err));

};


exports.getAttendedStudents=(req,res,next)=>{
    const date=req.params.date;

    Attendance.findOne({where:{ date : date}})
    .then(aId=>{
        
        return Attendance_stu.findAll({where:{ attendanceId: aId.id}});
    })
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=> console.log(err))

    
}


