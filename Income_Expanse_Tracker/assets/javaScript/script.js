const balance     =document.querySelector('#balance');
const inc_amt     =document.querySelector('#inc-amt')
const exp_amt     =document.querySelector('#exp-amt');
const form        =document.querySelector('#form');
const trans       =document.querySelector('#trans');
const description =document.querySelector('#desc');
const amount      =document.querySelector('#amount');



// //Dummy  data
// const dummyData = [
//   { id: 1, description: "Salary", amount: 300 },
//   { id: 2, description: "Rent", amount: -150 },
//   { id: 3, description: "Groceries", amount: -50 },
//   { id: 4, description: "ceries", amount: -50 }
// ];
// let transactions=dummyData;
const localStorageTrans=JSON.parse(localStorage.getItem("exp_inc"))
let  transactions=localStorage.getItem("exp_inc") !==null ? localStorageTrans :[];

function updataLocalStorage(){
localStorage.setItem("exp_inc",JSON.stringify(transactions));  
 }

window.addEventListener("load",()=>{
  refreshPage();
})



function refreshPage(){
  trans.innerHTML="";
  transactions.forEach(loadTransactionDetails);
  updateAmount();

  }
  function updateAmount(){
    const amounts= transactions.map((transaction)=>transaction.amount);
    const total=amounts.reduce((pre_value,next_value)=>(pre_value+=next_value),0).toFixed(2);
    balance.innerHTML=`${total}`;
    const income=amounts.filter((item)=>item > 0).reduce((pre_value,next_value)=>(pre_value+=next_value),0).toFixed(2);
    inc_amt.innerHTML=`${income}`
    const expense=amounts.filter((item)=>item < 0).reduce((pre_value,next_value)=>(pre_value-=next_value),0).toFixed(2);
    exp_amt.innerHTML=`${expense}`


  }


  function loadTransactionDetails(transaction){
      const sign=transaction.amount < 0 ? "-" : "+";
      const item=document.createElement('li');
      item.classList.add(transaction.amount < 0 ? "exp" :"inc");
      item.innerHTML=   `
      ${transaction.description}
      <span>${sign} ${Math.abs(transaction.amount)}</span>
      <button class="btn-del" onclick='removeTransaction( ${transaction.id} )'>x</button>
      `;
      trans.appendChild(item);
  }
  


  function removeTransaction(id){
    if(confirm("Are u sure want to delete this amount?")){
      transactions=transactions.filter((transaction) => transaction.id !=id) ;
     updataLocalStorage(); 
      refreshPage();

    }
    else{
      return;
    }

  }
  

  function formDetailsAdding(e){
    e.preventDefault();
    if(description.value.trim()== '' || amount.value.trim() == ''){
      alert("Enter the description or amount");
    }
    else{
      const transaction={
        id:uniqueId(),
        description:description.value,
        amount:+amount.value

      };
     transactions.push(transaction);
     loadTransactionDetails(transaction);
     description.value="";
     amount.value="";
     updateAmount();
     updataLocalStorage();
    }
  }
  function uniqueId(){
    return Math.floor(Math.random()*1000);
  }
  form.addEventListener("submit",formDetailsAdding);