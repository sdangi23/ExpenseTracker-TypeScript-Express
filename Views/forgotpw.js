document.addEventListener('DOMContentLoaded', () => {
    var btn = document.getElementById('recover-btn');
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        var email = document.getElementById('email').value;

        const obj = {
            email: email
        }

        axios.post('http://localhost:3000/password/forgotpassword', obj)
            .then(res => {
                alert(res.data.message);
            })
            .catch(err => {
                console.log(err);
                alert("Mail Id Not Found");
            })
    })
})