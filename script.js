// Date and time system
setInterval(()=>{

    let date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    let time = document.getElementById("time");

    let ch = hour%12; //ch stands for convert hour from 24 to 12   

    if(ch < 10){

        ch = "0"+ch;

    }
    if(ch == '00'){

        ch = 12;

    }
    if(minute < 10){

        minute = "0"+minute;

    }
    if(second < 10){
        second = "0"+second;
    }

    if(hour > 12){

        time.innerHTML = ch+":"+minute+":"+second+" "+"PM";

    }else{

        time.innerHTML = ch+":"+minute+":"+second+" "+"AM";
    }

    
    let currentDate = document.getElementById("currentDate");
    
    currentDate.innerHTML = date.toLocaleDateString(undefined, options)

},1000);

// Todo list system
let todoTitle = document.getElementById('todoTitle');
let todoDesc = document.getElementById('todoDesc');
let addTodo = document.getElementById('addTodo');
let clearTodo = document.getElementById('clearTodo');

// Adding items in localstorage
function addTodoItem(){

    if(todoTitle.value == "" || todoDesc.value == ""){

        let todoAlert = document.querySelector('.alert');
        todoAlert.style.opacity = 1;

    }else{

        if(localStorage.getItem("itemJson") == null){
    
            itemJsonArray = [];
            itemJsonArray.push([todoTitle.value, todoDesc.value]);
            localStorage.setItem('itemJson',JSON.stringify(itemJsonArray));
            let todoAlert = document.querySelector('.alert');
            todoAlert.style.opacity = 0;
    
        }else{
    
            existingArray = localStorage.getItem('itemJson');
            itemJsonArray = JSON.parse(existingArray);
            itemJsonArray.push([todoTitle.value, todoDesc.value]);
            localStorage.setItem('itemJson',JSON.stringify(itemJsonArray));
            let todoAlert = document.querySelector('.alert');
            todoAlert.style.opacity = 0;
        }
    }


}

// Populate table
function populate(){
    let tableBody = document.getElementById('tableBody');
    let str = "";
    existingArray = localStorage.getItem('itemJson');
    itemJsonArray = JSON.parse(existingArray);
    itemJsonArray.forEach((element, index) => {
        str += `
        <tr>
            <th scope="row">${index+1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button class="btn btn-danger" onclick="deleteItems(${index})"><i class="bi bi-trash"></i></button></td>
        </tr> 
        `;
    });

    tableBody.innerHTML = str;
}

// Delete Item
function deleteItems(itemIndex){
    existingArray = localStorage.getItem('itemJson');
    itemJsonArray = JSON.parse(existingArray);
    itemJsonArray.splice(itemIndex,1);
    localStorage.setItem('itemJson',JSON.stringify(itemJsonArray));
    populate();

}

// Clear list
function clearTodoList(){

    localStorage.clear();

}

addTodo.addEventListener('click', ()=>{
    
    addTodoItem();
    populate();

});

clearTodo.addEventListener('click',()=>{

    clearTodoList();
    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ``;
});

populate();