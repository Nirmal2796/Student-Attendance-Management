const form = document.querySelector('#my-form');
const att_form = document.querySelector('#attendance-form');

const date=document.getElementById('Adate');
const present=document.getElementById('present');

const fetch=document.getElementById('fetch');
const mark=document.getElementById('mark');

const msg = document.querySelector('.msg');

form.addEventListener('submit', onSubmit);
att_form.addEventListener('submit', markAttendance);
fetch.addEventListener('click',fetchReport);




async function onSubmit(e) {
    e.preventDefault();  
    if (date.value == '') {
        msg.innerHTML = '<b>Please enter date</b>';
        
        setTimeout(() => {
            msg.remove();
        }, 2000);
    }
    else{

        try{    
                document.getElementById('students').innerHTML=" ";
                let data;
                let flag=0;
    
                const res = await axios.get("http://localhost:3000/get-attendance");
                
                        for (let i in res.data) {
                            
                            console.log(res.data[i].date);
                            if(date.value == res.data[i].date){
                                const data=await axios.get(`http://localhost:3000/get-attendedStu/${date.value}`);
                                // console.log(data.data);
                                flag=1;
                                PrevUserOnScreen(data.data);
                                break;
                            }
                        }
    
                        if(flag==0){
                            const result = await axios.get("http://localhost:3000/");       
                            console.log(result.data);                                              
                            data=result.data;
                            showUserOnScreen(data);
                        }
                        // form.reset();
                       
            }
            catch(err){
                console.log(err)
            }
    }
}

async function markAttendance(e){
    e.preventDefault();  
    try{  
        const list=document.getElementsByTagName('li');

        // console.log(list.length);

        for(let i=1;i<=list.length;i++){
            let remark=document.getElementsByName(i);
            let pre=false;

            if(remark[0].checked){
               pre=true;
            }


            const record={
                studentId:i,
                pre:pre,
                date:date.value
            }
            
            const res = await axios.post("http://localhost:3000/add-attendance/",record);
            // console.log(res);
            form.reset();
            document.getElementById('students').innerHTML=" ";
        }
              
        }
        catch(err){
            console.log(err)
        }
}

async function fetchReport(){
    document.getElementById('students').innerHTML=" ";
    const result = await axios.get("http://localhost:3000/");
    const Students=result.data;

    const report= await axios.get("http://localhost:3000/fetchReport");

    const count = await axios.get("http://localhost:3000/get-attendanceCount");

    let parent=document.getElementById('students');

    for (let obj in Students) {
        
        
        if(Students[obj].id == report.data[obj].studentId){
            const child= `<li id=${Students[obj].id} >
                <h1>
                ${Students[obj].name} 
                </h1>
                <h1>
                ${report.data[obj].count}/${count.data}  
                </h1>
                <h1>
                ${percentage(report.data[obj].count, count.data)}&#37;
                </h1>`;
                parent.innerHTML=parent.innerHTML+child;
        }
 
    }
}

function percentage(num1,num2){
    return num1/num2*100;
}







function showUserOnScreen(res) {

    let parent=document.getElementById('students');
    for (let obj in res) {
        const child= `<li id=${res[obj].id} >
                <h1>
                ${res[obj].name}
                </h1>
                <h1>
                <label for="present">Present</label>
                <input type="radio" name="${res[obj].id}" id="present" value="true">
                </h1>
                <h1>
                <label for="absent">Absent</label>
                <input type="radio" name="${res[obj].id}" id="absent" value="false"></li>
                </h1>`;

        parent.innerHTML=parent.innerHTML+child;
    }

    mark.hidden=false;
}




async function PrevUserOnScreen(res) {

    let parent=document.getElementById('students');
    let child;

    const result = await axios.get("http://localhost:3000/");
    const Students=result.data;

    for (let i=0;i<res.length;i++) {
    //    console.log(res[i].remark);
        if(res[i].remark){
            
            child= `<li id=${res[i].id}>
            <h1>
            ${Students[i].name}
            </h1>
            <h1>
            <label for="present">Present</label>
            <input type="radio" name="${res[i].id}" id="present" value="true" checked>
            </h1>
            <h1>
            <label for="absent">Absent</label>
            <input type="radio" name="${res[i].id}" id="absent" value="false"></li>
            </h1>`;

            parent.innerHTML=parent.innerHTML+child;
        }
        else{
            child= `<li id=${res[i].id}>
            <h1>
            ${Students[i].name}
            </h1>
            <h1>
            <label for="present">Present</label>
            <input type="radio" name="${res[i].id}" id="present" value="true" >
            </h1>
            <h1>
            <label for="absent">Absent</label>
            <input type="radio" name="${res[i].id}" id="absent" value="false" checked></li>
            </h1>`;

            parent.innerHTML=parent.innerHTML+child;
        }
    }
    mark.hidden=false;
 
}


