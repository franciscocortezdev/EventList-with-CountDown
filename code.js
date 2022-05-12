const btnAgregar = document.querySelector('.btnAgregar').addEventListener('click', addEvent);
const inputText = document.querySelector('.inputText');
const inputDate = document.querySelector('.inputDate');
const listContainer = document.querySelector('.list_container');
const btnsDelete = document.querySelectorAll('.btn_delete');
let Events = [];
let idItem = 0;

window.addEventListener("load", function(event) {
    if (getEvents() == null){
        listContainer.innerHTML = `
            <div class="msg_container">
                <p class="msg_p">No hay eventos</p>
            </div>
        `
        return;
    }
    listEvent()

  });

function addEvent (e) {
    
    if (!inputText.value == '' && !inputDate.value == ''){
        Events.push({
            id: idItem,
            Status: true,
            Event: inputText.value,
            Date: inputDate.value  
        })
        idItem ++;
        
        storeEvents(Events);
        listEvent()
    }
    
}


function storeEvents(events){
    
    localStorage.setItem('tareas', JSON.stringify(events));

}




function listEvent(){
    inputText.value = '';
    inputDate.value = '';
    listContainer.innerHTML = '';
    let list = getEvents();
    
    list.forEach(item => {
        
        const dateStart = new Date().getTime();
        const dateEnd = new Date(item.Date).getTime();
        let hoursLeft = Math.round(((dateEnd - dateStart)/(1000*60*60)));
        let daysLeft = Math.trunc(((dateEnd - dateStart)/(1000*60*60*24)));
        
        createItem(hoursLeft, daysLeft,item);
        
    });
   
}


function getEvents(){
    let eventList = JSON.parse(localStorage.getItem('tareas'))
    Events = [...eventList];
    return eventList;
}

function createItem(hoursLeft,daysLeft,item){

    let divItem = document.createElement('div');
    let divP = document.createElement('div');
    let pCount = document.createElement('p');
    let pDes = document.createElement('p');
    let pDat = document.createElement('p');
    let btnDelete = document.createElement('button');

    divItem.classList.add('items');
    divP.classList.add('divP');
    pCount.classList.add('item_CountDown');
    pDes.classList.add('item_description');
    pDat.classList.add('item_date');
    btnDelete.classList.add('btn_delete');
    btnDelete.setAttribute("id",item.Date);
    btnDelete.addEventListener('click', deleteItem);

    pCount.innerText = hoursLeft<=24 ?"Horas faltantes: " + hoursLeft : "Dias faltastes: " + daysLeft;
    pDes.innerText = item.Event;
    pDat.innerText = item.Date;
    btnDelete.innerText = 'Eliminar';
    
    divP.append(pCount,pDes,pDat);
    divItem.append(divP, btnDelete);

    listContainer.append(divItem);

}


function deleteItem (e){
    let newEvents = [];

    Events.forEach(element => {
        
        if(element.Date !== e.target.id){
       
            newEvents.push(element);
        }
    });

    Events = [...newEvents];
    storeEvents(Events);
    listEvent()
}


















