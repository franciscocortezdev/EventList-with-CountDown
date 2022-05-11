const btnAgregar = document.querySelector('.btnAgregar').addEventListener('click', addEvent);
const inputText = document.querySelector('.inputText');
const inputDate = document.querySelector('.inputDate');
const Events = [];


function addEvent (e) {
    Events.push({
        evento: inputText.value,
        fecha: inputDate.value
    })
}












