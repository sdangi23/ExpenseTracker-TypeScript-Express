document.addEventListener('DOMContentLoaded', () => {
    
    
    axios.get('http://localhost:3000/getUserExpenses')
    .then( (database) => {

        const data = database.data.finalarr;
        addToUi(data);

    }).catch( (err) => {
        alert(err);
    })



})

function addToUi(db){
    let i=1;
    db.forEach( (uid) => {
        const user = document.createElement('ul');
        user.innerHTML = `<h3> User${i}</h3>`;
        i++;

        uid.forEach( (exp) => {
            const x = document.createElement('li')
            x.innerHTML = `<li class="list-group-item">${exp.description} - ${exp.category} - ${exp.expenseAmount}</li>` 
            user.appendChild(x)
    })

    document.getElementsByClassName('Main')[0].appendChild(user);
    
    })
    
}