const formPage=document.getElementById("form-page");
const productName=document.getElementById('product-name');
const productAmount=document.getElementById('product-amount');
const btnEnter=document.getElementById('btn-enter');
const btnOut=document.getElementById('btn-out');
const btnHome=document.getElementById('btn-home');
const enterField=document.getElementById('enter-field');
const outField=document.getElementById('out-field');
const spinner=document.getElementById('spinner-card');


const queryString=window.location.search;
const urlParams= new URLSearchParams(queryString);
const API_URL='https://script.google.com/macros/s/AKfycbwnT1t86eg58Mnn9o-IYmBrZNF8M3sgtXbl84GAJzcAI9Ng0OOn3hkW-y3SqGjYMHXBBg/exec'

const product= urlParams.get('product');

formPage.addEventListener("click",(e)=>{
    e.preventDefault();
});

const getProduct=async ()=>{ 
    /*spinner.classList.remove("d-none");
    formPage.classList.add("d-none");
    productName.classList.add("d-none");
    productAmount.classList.add("d-none");*/

    await axios.get(API_URL+"?action=getInsumos&product="+product)
    .then((res)=>{
        /*spinner.classList.add("d-none");
        formPage.classList.remove("d-none"); 
        productName.classList.remove("d-none");
        productAmount.classList.remove("d-none");*/
        
        productName.innerHTML=res.data.name;
        productAmount.innerHTML='Cantidad: '+res.data.amount;     
           
    }).catch((error=>{
        
        //return error;
    })) 
    
}
getProduct();

btnHome.addEventListener("click",(e)=>{
   // window.location.href='https://project-inventario.vercel.app/';
});

btnOut.addEventListener("click",(e)=>{
    const amountInt=parseInt(outField.value);

    const DATA={amount:`${amountInt}`,option:"sub"};
    console.log(JSON.stringify(DATA)+"  hiii");

    fetch(API_URL+"?action=modInsumo&product="+product, {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify(DATA),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      }).then(function(response){
        window.location=window.location;
      })

});

btnEnter.addEventListener("click",(e)=>{
    const amountInt=parseInt(enterField.value);

    const DATA={amount:`${amountInt}`,option:"add"};
    console.log(JSON.stringify(DATA)+"  hiii");
    
    fetch(API_URL+"?action=modInsumo&product="+product, {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify(DATA),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      }).then(function(response){
        window.location=window.location;
      })
      

});

