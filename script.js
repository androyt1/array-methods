const addUserBtn=document.getElementById('add-user')
const doubleMoneyBtn=document.getElementById('double-money')
const showMillionaireBtn=document.getElementById('show-millionaire')
const sortUserBtn=document.getElementById('sort-user')
const totalRichesBtn=document.getElementById('total-riches')

let data=[]

getUsers()
getUsers()
getUsers()

async function getUsers(){
    const res=await fetch('https://randomuser.me/api/')
    const data=await res.json()
    const user=data.results[0]
    const newUser={
        name:`${user.name.first} ${user.name.last}`,
        money:Math.floor(Math.random() * 10000)
    }
    addObject(newUser)  
}

function addObject(obj){
    data.push(obj)
    updateDom()
}

function doubleMoney(){
    data.map(user=>{
        return{
            ...user,
            money:user.money*=2
        }
    })
    updateDom()
}

function showMillionaires(){
    data=data.filter(user=>user.money > 1000000)
    updateDom()
}

function sortByRiches(){
    data=data.sort((a,b)=>b.money - a.money)
    updateDom()
}


function updateDom(providedData=data){   
   const main=document.getElementById("main")
   main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    providedData.forEach(user=>{
        const element=document.createElement('div')
        element.classList.add('person')
        element.innerHTML=`<span>${user.name}</span <span>${formatMoney(user.money)}</span>`
        main.appendChild(element)
    })
   
}

function totalRiches(){
    const main=document.getElementById('main')
   const wealth= data.reduce((acc,user)=>(acc+=user.money),0)
    const element=document.createElement('div')
    element.classList.add('total')
    element.innerHTML=`<h4>Total Wealth</h4> <span>${wealth}</span>`
    main.appendChild(element)
}

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // 12,345.67
  }

addUserBtn.addEventListener('click',getUsers)
doubleMoneyBtn.addEventListener('click',doubleMoney)
showMillionaireBtn.addEventListener('click',showMillionaires)
sortUserBtn.addEventListener('click',sortByRiches)
totalRichesBtn.addEventListener('click',totalRiches)