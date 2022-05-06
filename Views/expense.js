const token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', () => {

    axios.get("http://localhost:3000/user/checkPremium" , { headers: {"Authorization" : token} })
    .then( (res) => {
        if (res.status === 200) {
            toggleUi();
        }
    }).catch((err) => console.log(err));

    var btn = document.getElementById('submit');
    btn.addEventListener('click', (e) => {
        var expenseAmount = document.getElementById('money').value;
        var description = document.getElementById('description').value;
        var category = document.getElementById('category').value;

        e.preventDefault()

        const obj = {
            expenseAmount: expenseAmount,
            description: description,
            category: category
        }
        addexpense(obj);
        axios.post('http://localhost:3000/user/addexpense', obj, { headers: {"Authorization" : token} })
            .then(res => {
               
                alert(res.data.message);
                document.getElementById('money').value = "";
                document.getElementById('description').value = "";

            })
            .catch(err => {
                console.log(err);
            })
    })
});

window.addEventListener('load', ()=> {
    // const token = localStorage.getItem('token');

    // axios.get('http://localhost:3000/user/getexpenses', { headers: {"Authorization" : token} }).then(response => {
    //     if(response.status === 200){
    //         response.data.expense.forEach(expense => {

    //             addexpense(expense);
    //         })
    //     } else {
    //         throw new Error();
    //     }
    // })
    const btnrow = document.getElementById('submit-row');
    btnrow.addEventListener('click' , () => {
        const rows = document.getElementById('row-count').value
        localStorage.setItem('rows',rows);
        location.href = './expense.html';
    })

    const token = localStorage.getItem('token');
    const expensecontainer = document.getElementById('record');
    const pagenation = document.getElementById('pagenation');
    expensecontainer.innerHTML = "";

    const savedrow = localStorage.getItem('rows');
    axios.get(`http://localhost:3000/user/getexpenses/?page=1&row=${savedrow}`, { headers: {"Authorization" : token} })
    .then( (expenses) => {
        const pages = expenses.data.obj;
        if(pages.currentpage !=1 && pages.previouspage !=1){
            const newpg = document.createElement('a');
            newpg.setAttribute('id','1')
            newpg.setAttribute("class","btn btn-secondary btn-sm")
            newpg.innerText="1";
            pagenation.appendChild(newpg)
        }

        if(pages.haspreviouspage){
            const newpg2=document.createElement("a")
            newpg2.setAttribute("class","btn btn-secondary btn-sm")
            newpg2.setAttribute("id",`${pages.previouspage}`)
            newpg2.innerText=`${pages.previouspage}`
            pagenation.appendChild(newpg2);
        }

        const newpg1=document.createElement("a")
        newpg1.setAttribute("id",`${pages.currentpage}`)
        newpg1.setAttribute("class","btn btn-secondary btn-sm")
        newpg1.innerText=`${pages.currentpage}`
        pagenation.appendChild(newpg1)

        if(pages.hasnextpage){
            const newpg3=document.createElement("a")
            newpg3.setAttribute("class","btn btn-secondary btn-sm")
            newpg3.setAttribute("id",`${pages.nextpage}`)
            newpg3.innerText=`${pages.nextpage}`
            pagenation.appendChild(newpg3);
        }

        if(pages.lastpage !== pages.currentpage && pages.nextpage!==pages.lastpage){
            const newpg4=document.createElement("a")
            newpg4.setAttribute("class","btn btn-secondary btn-sm")
            newpg4.setAttribute("id",`${pages.lastpage}`)
            newpg4.innerText=`${pages.lastpage}`
            pagenation.appendChild(newpg4);
        }

        const UserExpenses=expenses.data.expenses;
        for(let i=0;i<UserExpenses.length;i++)
        {
          const expensediv=document.createElement("div")
          expensediv.classList.add('expensediv')
        //   expensediv.innerHTML=`
        //   <span>.</span>
        //   <span class="desc1"}>${UserExpenses[i].description}</span>
        //   <span class="category"id="category">${UserExpenses[i].category}</span>
        //   <span class="money"id="money">${UserExpenses[i].expenseAmount}</span>
        //   <button type="submit" class="dltexp" id=${UserExpenses[i].id}>X</button>
        //   `

          expensediv.innerHTML = `<li class='list-group-item' id =${UserExpenses[i].id}>
          Amount ==> ${UserExpenses[i].expenseAmount} -${UserExpenses[i].description} -${UserExpenses[i].category}
          <button class='btn btn-danger' onclick='deleteExpense(event, ${UserExpenses[i].id})'> Del </button>
          </li>`;

          expensecontainer.appendChild(expensediv)
        }
    }).catch( err => console.log(err));




});

function toggleUi() {

        document.getElementById('downloadexpense').disabled = false;
    
        const sectionArray = document.getElementsByClassName('vh-100 bg-image');

        const target = sectionArray[0];

        target.style.backgroundImage = "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img1.webp')";

        const heading = document.getElementsByClassName('text-uppercase text-center mb-5')[0];
        heading.innerText = "Expense Tracker - Premium";

        document.getElementById('rzp-btn').remove();

        const btns = document.getElementById('btns');
        const x = document.createElement("BUTTON");
        x.innerHTML = `<button type="button" class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" id="leaderboard-btn"><a href="./leaderboard.html" <b> Show LeaderBoard </b> </a></button>`;
        btns.appendChild(x);
}

function addexpense(expense){
    const parentElement = document.getElementById('record');
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML = parentElement.innerHTML + `
        <li class='list-group-item' id =${expenseElemId}>
        ${expense.expenseAmount} -${expense.description} -${expense.category}
        <button class='btn btn-danger' onclick='deleteExpense(event, ${expense.id})'> Del </button>
        </li>`
}

function deleteExpense(e, expenseid){
    //const token = localStorage.getItem('token');
    axios.delete(`http://localhost:3000/user/deleteexpense/${expenseid}`, {headers:{"Authorization":token}}).then(response => {
        if(response.status === 204){
            removeExpensefromUI(expenseid);
        }else{
            throw new Error('Failed to Delete');
        }
    }).catch(err => {
        console.log(err);
    })
}

function removeExpensefromUI(expenseid){
    const expenseElemId = `${expenseid}`;
    document.getElementById(expenseElemId).remove();
}

function download(){
    axios.get('http://localhost:3000/user/download', {headers:{"Authorization":token}})
    .then((response) => {
        if(response.status === 200){
            var a = document.createElement('a');

            a.href = response.data.fileURL;
            a.download = 'myexpense.csv';
            a.click();
        } else{
            throw new Error(response.data.message);
        }
    })
    .catch(err => {
        console.log(err);
    })
}

document.getElementById('rzp-btn').onclick = async function (e) {
    const response  = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: {"Authorization" : token} });
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "Test Company",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Test User",
       "email": "test.user@example.com",
       "contact": "9784490023"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
         
        axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User Now');
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}


//pagenation Pagenumber Click Functions
const pageevent=document.getElementById("pagenation")
pageevent.addEventListener("click",(e)=>{
    if(e.target.className=="btn btn-secondary btn-sm"){
        const PageId=e.target.id;
        const expensecontainer = document.getElementById('record');
    
        pagenation.innerHTML=""
        expensecontainer.innerHTML="";


        const savedrow = localStorage.getItem('rows');
    axios.get(`http://localhost:3000/user/getexpenses/?page=${PageId}&row=${savedrow}`,{headers:{"Authorization":token}})
    .then((expenses)=>{
        
        const pages=expenses.data.obj
        if(pages.currentpage!=1 && pages.previouspage!=1){
            const newpg=document.createElement("a");
            newpg.setAttribute('id','1')
            newpg.setAttribute("class","btn btn-secondary btn-sm")
            newpg.innerText="1";
            pagenation.appendChild(newpg)

        }
        if(pages.haspreviouspage){
            const newpg2=document.createElement("a")
            newpg2.setAttribute("class","btn btn-secondary btn-sm")
            newpg2.setAttribute("id",`${pages.previouspage}`)
            newpg2.innerText=`${pages.previouspage}`
            pagenation.appendChild(newpg2);
        }
       
        const newpg1=document.createElement("a")
        newpg1.setAttribute("id",`${pages.currentpage}`)
        newpg1.setAttribute("class","btn btn-secondary btn-sm")
        newpg1.innerText=`${pages.currentpage}`
        pagenation.appendChild(newpg1)
        
        if(pages.hasnextpage){
            const newpg3=document.createElement("a")
            newpg3.setAttribute("class","btn btn-secondary btn-sm")
            newpg3.setAttribute("id",`${pages.nextpage}`)
            newpg3.innerText=`${pages.nextpage}`
            pagenation.appendChild(newpg3);
        }
        if(pages.lastpage !== pages.currentpage && pages.nextpage!==pages.lastpage){
            const newpg4=document.createElement("a")
            newpg4.setAttribute("class","btn btn-secondary btn-sm")
            newpg4.setAttribute("id",`${pages.lastpage}`)
            newpg4.innerText=`${pages.lastpage}`
            pagenation.appendChild(newpg4);
        }

        const UserExpenses=expenses.data.expenses;
        for(let i=0;i<UserExpenses.length;i++)
        {
          const expensediv=document.createElement("div")
          expensediv.classList.add('expensediv')
          
          expensediv.innerHTML = `<li class='list-group-item' id =${1}>
          Amount ==> ${UserExpenses[i].expenseAmount} -${UserExpenses[i].description} -${UserExpenses[i].category}
          <button class='btn btn-danger' onclick='deleteExpense(event, ${UserExpenses[i].id})'> Del </button>
          </li>`;

          expensecontainer.appendChild(expensediv)
        }


    })
    .catch(err=>console.log(err))


    }
})