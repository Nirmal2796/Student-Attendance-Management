const Student=require('../model/student');


exports.getStudents=(req,res,next)=>{
    Student.findAll()
    .then((students)=>{
        res.status(200).json(students);
    })
    .catch(err=> console.log(err));
}





