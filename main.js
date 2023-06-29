let taskinput = document.getElementById("task-input");
let addbutton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".tab-list span");
let underLine = document.getElementById("under-line");
let selectedMenu = "tab-all";
let tasklist=[];
let filterList=[];
let mode = "all"
let color =[" #FCE4EC", "#F8BBD0","#F48FB1", "#F06292","#EC407A","#E91E63","#D81B60","#C2185B","#AD1457","#880E4F","#FF80AB","#FF4081","#F50057","#C51162"];

addbutton.addEventListener("click",addtask);
function addtask(){
    if(taskinput.value == ""){
        alert("내용을 입력해 주세요");
        return;
    }else{
        let task = {
            id : randomIDGenerate(),
            taskcontent: taskinput.value,
            iscomplet : false,
            backgorundcolor:colorchange(),
        };
        console.log(task);
        tasklist.push(task);
        taskinput.value = "";
    }
    render();
}

tabs.forEach((menu)=>menu.addEventListener("click", (e)=>underlineindicator(e)));
function underlineindicator(e){
    selectedMenu = e.target.id;
    underLine.style.width = e.target.offsetWidth + "px";
    underLine.style.left = e.target.offsetLeft + "px";
    e.target.offsetTop + (e.target.offsetHeight) + "px";
}

for(let i =1; i<tabs.length; i++){ 
    tabs[i].addEventListener("click",function(event){
    filter(event);
    });
}

function filter(event){
    mode = event.target.id;
    filterList=[]
    if(mode === "all"){
        render();
    }else if(mode === "ongoing"){
        for(let i =0; i<tasklist.length; i++){
            if(tasklist[i].iscomplet == false){
                filterList.push(tasklist[i]);
            }
        }
        render();
    }else if(mode === "done"){
        for(let i =0; i<tasklist.length; i++){
            if(tasklist[i].iscomplet == true){
                filterList.push(tasklist[i]);
            }
        }
        render();
    }
}

function render(){
    let list =[]
    if(mode === "all"){ 
        list = tasklist;
    }else if(mode === "ongoing" || mode === "done"){ 
        list = filterList;
    }

    let resultHTML ='';
    for(let i=0; i<list.length; i++ ){
        if (list[i].iscomplet == true){
            resultHTML += `<div class = "task" >
            <span  class ="task-done">${list[i].taskcontent}</span>
            <div id="button-box">
            <button onclick = "togglecomplete('${list[i].id}')" class="reword-box"><i class="fa-solid fa-rotate-right fa-lg"></i></button> 
            <button onclick = "deletetask('${list[i].id}')" class="delete-box"><i class="fa-solid fa-trash fa-lg"></i></button>
            </div>
            </div>`;
        } else{
        resultHTML += `<div class = "task" >
        <span style="background-color : ${list[i].backgorundcolor}"> ${list[i].taskcontent}</span>
        <div id="button-box">
        <button onclick = "togglecomplete('${list[i].id}')" class="chcek-box"><i class="fa-solid fa-check fa-lg" style="width : 20px"></i></button>
        <button onclick = "deletetask('${list[i].id}')" class="delete-box"><i class="fa-solid fa-trash fa-lg"></i></button>
        </div>
        </div>`;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function randomIDGenerate(){
    return Math.random().toString(36).substr(2, 16);
}

function colorchange(){
    let random = (Math.floor(Math.random()*13)+1);
    return color[random];
 }

function deletetask(id){ 
    for(let i=0; i<tasklist.length; i++){
        if(tasklist[i].id == id){
            tasklist.splice(i,1);
            break;
        }
    }
    render();
}

function togglecomplete(id){
    for(let i =0; i<tasklist.length; i++){
        if(tasklist[i].id == id){
           tasklist[i].iscomplet = !tasklist[i].iscomplet;
           console.log(tasklist[i]);
           break;
        }
    }
    render();
}

function runScript(e) {
    if(e.keyCode == 13) { 
        if(taskinput.value == ""){
            alert("내용을 입력해 주세요");
            return false;
        }else{
            let task = {
                id : randomIDGenerate(),
                taskcontent: taskinput.value,
                iscomplet : false,
                backgorundcolor:colorchange(),
            };
            console.log(task);
            tasklist.push(task);
            taskinput.value = "";
            render();
            return false;
        }
    }else{
        return true;
    }
}

let today = document.getElementById("Date");
today = new Date();
document.getElementById("Date").innerHTML =today.toLocaleDateString();