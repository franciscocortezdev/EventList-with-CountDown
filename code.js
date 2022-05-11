const btnAgregar = document.querySelector('.btnAgregar').addEventListener('click', addEvent);
const inputText = document.querySelector('.inputText');
const inputDate = document.querySelector('.inputDate');
const listContainer = document.querySelector('.list_container');
const Events = [];

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
            Status: true,
            Event: inputText.value,
            Date: inputDate.value  
        })
    
        inputText.value = '';
        inputDate.value = '';
        listContainer.innerHTML = '';
        storeEvents();
        listEvent()
    }
    
}


function storeEvents(){
    
    localStorage.setItem('tareas', JSON.stringify(Events));

}




function listEvent(){
    let list = getEvents();

    list.forEach(item => {
        
        const dateStart = new Date().getTime();
        const dateEnd = new Date(item.Date).getTime();
        let hoursLeft = Math.round(((dateEnd - dateStart)/(1000*60*60)));
        let daysLeft = Math.trunc(((dateEnd - dateStart)/(1000*60*60*24)));
        
        
        listContainer.innerHTML += `
        <div class="item">
                <div>
                    <p class="item_CountDown">${hoursLeft<=24 ?"Horas faltantes: " + hoursLeft : "Dias faltastes: " + daysLeft }</p>
                    <p class="item_description">${item.Event}</p>
                    <p class="item_date">${item.Date}</p>
                </div>
                <button class="btn_delete">
                    Eliminar
                </button>
               
            </div>
        `
    });
   
}

function getEvents(){
    let eventList = JSON.parse(localStorage.getItem('tareas'))
    
    return eventList;
}