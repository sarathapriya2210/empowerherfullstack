import { baseUrl } from "./baseUrl.js";

let addtododiv = document.getElementById("add-todo")
document.getElementById("add_todo_btn").addEventListener("click",function(){
   addtododiv.style.display="flex";
})
document.getElementById("close_modal").addEventListener("click",function(){
   addtododiv.style.display="none" ;
})  

document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem(addData)
    alert("redirecting to the more page")
    window.location.href = "index.html"

})

let addData = JSON.parse(localStorage.getItem("addData"))

if (addData == null) {
    alert("please login")
    window.location.href = "login.html"
}

//console.log(addData);

document.getElementById("user-name").textContent = `hiii.. welcome ${addData.name}`


let form = document.getElementById("form");
form.addEventListener("submit", function(){
    event.preventDefault()
    let title = form.title.value;
    let deadline = form.deadline.value;
    let priority = form.priority.value;

    let todoObj ={title,deadline,priority,status:false, userId :addData.id}

    //console.log(todoObj)
    
    //push this to json server

    fetch(`${baseUrl}/todos`,{
        method:"POST",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(todoObj)
    }).then(()=>{
        alert("todo is added....")
        loadData()
        addtododiv.style.display="none";
    }).catch((err)=>{
      alert("something went wrong")
      console.log(err)
    })
})


async function getTodo() {
   try{
       let res = await fetch(`${baseUrl}/todos`);
       let data = await res.json();
       let userTodos = data.filter((el,i)=>el.userId == addData.id)
       return userTodos;
   }catch(err){
    console.log(err)
    alert("something went wrong in getting todo")
   }
    
}

function displayTodo(arr){
  let  cont = document.getElementById("todo-container")
  cont.innerHTML = "" ;

  arr.map((el,i)=>{
    let card = document.createElement("div");
    card.setAttribute("class", "todo-card");

    let title = document.createElement("h4");
    title.textContent = `Title: ${el.title}`;

    let deadline = document.createElement("h5")
    deadline.textContent = `Deadline: ${el.deadline}`;
    
    let d= new Date(el.deadline)
    if(d<Date.now() && el.status==false){
       card.classList.add("pending")
    }
    let priority = document.createElement("h5");
    priority.textContent = `Title: ${el.priority}`;

    let status = document.createElement("h5");
    status.textContent = el.status==true? "completed" :"pending";
    
    let updateSatusButton = document.createElement("button");
    updateSatusButton.textContent = "toggle button";
    updateSatusButton.addEventListener("click",function(){
      updateStatusfn(el,i)
      //console.log(event)
    })

    let editTodobutton = document.createElement("button");
    editTodobutton.textContent = "Edit button";
    editTodobutton.addEventListener("click",function(){
      editTodofn(el,i) 
      //console.log(event)
    })
    let deleteTodoButton = document.createElement("button");
    deleteTodoButton.textContent = "delete button";
    deleteTodoButton.addEventListener("click",function(){
      deleteTodoFn(el,i)
      //console.log(event)
    })
    card.append(title , priority , deadline , status , updateSatusButton, editTodobutton ,deleteTodoButton);
    cont.append(card)

  });
}

window.onload = async ()=>{
    let arr = await getTodo()
    displayTodo(arr)
}

async function loadData(){
    let arr = await getTodo()
    displayTodo(arr)
}
function updateStatusfn(el,i){
    //console.log("before ,", el);

    let updateTodo = {...el , status: ! el.status};
    //console.log( "after :", updateTodo);
    let todoId = el.id;
    fetch(`${baseUrl}/todos/${todoId}`,{
        method : "PATCH",
        headers : {
            "content-type":" application/json"
        },
        body: JSON.stringify(updateTodo)
        }).then(()=>{
            alert("todo updated....")
            //to reload the page to get updated todo
            //window.location.reload()
            // display loadDATA arrzay
            loadData()
        }).catch((err)=>{
            alert("something went wrong in todo updation")
            console.log(err)
        })
}
    
function deleteTodoFn(el,i){
    let todoId = el.id;
    fetch(`${baseUrl}/todos/${todoId}`,{
        method : "DELETE"
        }).then(()=>{
            alert("todo detleted....")
            //to reload the page to get updated todo
            //window.location.reload()
            // display loadDATA arrzay
            loadData()
        }).catch((err)=>{
            alert("something went wrong in todo deletion")
            console.log(err)
        })

}