document.addEventListener('DOMContentLoaded', () => {
    var btn = document.getElementById('btn');
    btn.addEventListener('click', (e) => {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var contact = document.getElementById('contact').value;
        var password = document.getElementById('password').value;

        if(name == "" || email == "" || contact =="" || password ==""){
            alert("Invalid Input");
            window.location.href = "signup.html";
        }
        e.preventDefault();

        const obj = {
            name: name,
            email:email,
            contact: contact,
            password: password
        }
        axios.post("http://localhost:3000/user/signup", obj)
            .then(res => {
                console.log(res);
                alert(res.data.message);
                window.location.href = "./login.html";
            })
            .catch(err => {
                console.log("-----" , err);
                alert("User Already Exists, Please Login");
            })
    })
});