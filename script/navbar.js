const navbar = ()=>{
    let card = 
    `<div id="nav-container">
        <a id ="logo" href="index.html">My personal app</a>
        <div id= "nav-link">
            <a href="signup.html">sign up</a>
            <a href="login.html">login</a>
            <a href="todo.html">todo</a>
            <a href="expenses.html">expences</a>
        </div>
    </div>`;

    document.getElementById("nav").innerHTML = card ;
}

navbar()