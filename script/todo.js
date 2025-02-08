import { baseUrl } from "./baseUrl.js";

document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem(addData)
    alert("redirecting to the momr page")
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

    fetch(`${baseUrl}/todo`,{
        method:"POST",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(todoObj)
    }).then(()=>{
        alert("todo is added....")
    }).catch((err)=>{
      alert("something went wrong")
      console.log(err)
    })
})


async function getTodo() {
   try{
       let res = await fetch(`${baseUrl}/todo`);
       let body = await res.json();
       return body 
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

    let priority = document.createElement("h5");
    priority.textContent = `Title: ${el.priority}`;

    let status = document.createElement("h5");
    status.textContent = el.status==true? "completed" :"pending";

    card.append(title , priority , deadline , status);
    cont.append(card)

  });
}

window.onload = async ()=>{
    let arr = await getTodo()
    displayTodo(arr)
}
    