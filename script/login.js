import { baseUrl } from "./baseUrl.js";

let form = document.getElementById("form")
form.addEventListener("submit",function(){
    event.preventDefault()
   
    let email = form.email.value;
    let password = form.password.value;
   

   fetch(`${baseUrl}`)
    .then((res)=>res.json())
    .then((data)=>{
        let user = data.filter((el,i)=>el.email==email)
        if (user.length != 0){
            if(user[0].password == password){
                alert("login sucess...")
                localStorage.setItem("addData",JSON.stringify(user[0]))
                window.location.href = "todo.html"

            }else{
                alert("password is wrong")
            }
        }
        else{
           alert("user not registerd prperly")
           window.location.href="signup.html"
        }
    })
    .catch((err)=>{
          console.log(err);
          alert("something went wrong")
    })

})