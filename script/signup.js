import { baseUrl } from "./baseUrl.js"

let form = document.getElementById("form")
form.addEventListener("submit",function(){
    event.preventDefault()
    let name = form.name.value;
    let email = form.email.value;
    let password = form.password.value;
    let gender = form.gender.value;
    let number = form.number.value;
    let userObj = {name, email , password, gender, number};

   fetch(`${baseUrl}`)
    .then((res)=>res.json())
    .then((data)=>{
        let user = data.filter((el,i)=>el.email==email)
        if (user.length != 0){
            alert("user name already fou d , please login")
            window.location.href = "login.html"
        }
        else{
            fetch(`${baseUrl}`,{
                method : "POST",
                headers:{
                    "content-type":"application/json",
                },
                body : JSON.stringify(userObj)
            }).then(()=>{
                alert("signup sucessfully")
                window.location.href = "login.html"
            })
           
        }
    })
    .catch((err)=>{
          console.log(err);
          alert("something went wrong in signup")
    })

})