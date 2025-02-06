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

console.log(addData);

document.getElementById("user-name").textContent = `hiii.. welcome ${addData.name}`