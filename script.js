let todo=[];
let tasksPars=JSON.parse(localStorage.getItem("task"));
function checkData(){
    if(tasksPars==null){
        todo=[]
    }
    else{
        todo=tasksPars;
    }
};
checkData();
let creat=document.getElementById("create");
let tbod=document.getElementById("tbody");
let tfoot=document.getElementById("tfoot");
/*read function */
function readtasks(){
    tbod.innerHTML="";
    tfoot.innerHTML="";
    let j=0;
    for(let i=0;i<todo.length;i++){
        
            let bodyContent=
                `
                <tr class=${todo[i].done? "green": ""} >
                    <td class=task>task ${i+1}: ${todo[i].task}</td>
                    <td>${todo[i].date}</td>
                    <td class=dead>${todo[i].dedline}</td>
                    <td class="control">
                        <button onclick="updatetask(${i})" >Update</button>
                        <button  onclick="isdone(${i})"  class=${todo[i].done? "dark": ""} >${todo[i].done? "To do": "Done"}</button>
                        <button onclick="delettask(${i})" class=${i} >Delete</button>
                </tr>
                `;
            let  footContent=
                `
                <tr>
                    <td colspan="2">number of tasks : ${i+1} </td>
                    <td colspan="" class=${todo[i].done? j++: ""}>done tasks :<br>${j} </td>
                    <td colspan="">tasks to do :<br>${i+1-j} </td>
                </tr>
                `;
        tbod.innerHTML+=bodyContent;
        tfoot.innerHTML=footContent;
    }
};
readtasks();
/*creat function */
creat.addEventListener("click",function(){
    let newtask=prompt("Please enter your next task")
    let dedline=prompt("Please enter the deadline ","DD/MM/YYYY At HH:MM")
    let newdate=`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}<br> ${new Date().getHours()}:${new Date().getMinutes()}`;
    let taskdate={
        task:newtask,
        date:newdate,
        dedline:dedline,
        done:false
    };
    if(newtask!==null && dedline!==null){
        todo.push(taskdate)
    };
    
    readFromLocalStorage();
    readtasks();
})
/*delete function */
function delettask(i){
    let result=confirm(`Are you sure you want to delete this task : ${todo[i].task}`)
    if(result==true){
        todo.splice(i,1);
        readFromLocalStorage()
        readtasks();
    }
};
/*update function */
function updatetask(i){
    let updatedTask=prompt(`Do you want to updatet this task :`,` ${todo[i].task}`);
    let updatededline=prompt(`Do you want to updatet the deadline :`,`${todo[i].dedline}`)
    if(updatedTask!=null || updatededline!=null){
        if(updatedTask!=null && updatededline==null)
        todo[i].task=updatedTask;
        else if(updatedTask==null && updatededline!=null)
        todo[i].dedline=updatededline;
        else{
            todo[i].task=updatedTask;
            todo[i].dedline=updatededline;
        }
        readFromLocalStorage();
        readtasks();
    }
};
/* isdone function */
function isdone(i){
    todo[i].done=!todo[i].done;
    readFromLocalStorage();
    readtasks();
}

/* local storage  function */
function readFromLocalStorage(){
    let tasksString=JSON.stringify(todo);
    localStorage.setItem("task",tasksString);
};
