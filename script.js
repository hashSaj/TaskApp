const input = document.querySelector("input");
const addButton = document.querySelector(".add-button");
const todosHtml = document.querySelector(".todos");
const emptyImage = document.querySelector(".empty-image");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");
let filter = '';
showTodos();

theDate();

function theDate() {
    var date = new Date();
    var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var currentDate = date.getDate();
    var month = months[date.getMonth()];
    var year = date.getFullYear();

    var todaysDate = document.getElementById("dateHere").innerHTML = currentDate + "/" + 
month + "/" + year;
}



function getTodoHtml(todo,index){
    if(filter && filter != todo.status){
        return '';
    }
    let checked = todo.status == "completed" ? "checked" : "";
    return `
    <li class="todo">
    <label for="${index}">
    <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
    <span class="${checked}"> ${todo.name} </span>
    </label>
    <button class="delete-btn" data-index="${index}" onclick="remove(this)">
    <i class="fa fa-times"></i>
    </button>
    </li>
    `;
}

function showTodos() {
    if(todosJson.length == 0){
        todosHtml.innerHTML= '';
        emptyImage.style.display = 'block';
    } else {
        todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
        emptyImage.style.display = 'none';
    }
}

function addTodo(todo) {
    input.value = "";
    todosJson.unshift({name: todo, status: "pending"});
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
}

input.addEventListener("keyup", e => {
    let todo = input.value.trim();
    if(!todo || e.key != "Enter"){
        return;
    }
    addTodo(todo);
});

addButton.addEventListener("click", () => {
    let todo = input.value.trim();
    if(!todo){
        return;
    }
   addTodo(todo);
});

function updateStatus(todo){
    let todoName = todo.parentElement.lastElementChild;
    if(todo.checked){
        todoName.classList.add("checked");
        todosJson[todo.id].status = "completed";
    } else {
        todoName.classList.remove("checked");
        todosJson[todo.id].status = "pending";
    }
    localStorage.setItem("todos", JSON.stringify(todosJson));
}

function remove(todo){
    const index = todo.dataset.index;
    todosJson.splice(index,1);
    showTodos();
    localStorage.setItem("todos",JSON.stringify(todosJson));
}

filters.forEach(function(el) {
    el.addEventListener("click" , (e) => {
        if(el.classList.contains('active')){
            el.classList.remove('active');
            filter ='';
        } else {
            filters.forEach(tag => tag.classList.remove('active'));
            el.classList.add('active');
            filter = e.target.dataset.filter;
        }
        showTodos();
    });
});

deleteAllButton.addEventListener("click", () => {
    todosJson = [];
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
});

// const quotes = [
//     "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
//     "The only way to do great work is to love what you do. – Steve Jobs",
//     "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
//     "Hard work beats talent when talent doesn’t work hard. – Tim Notke",
//     "Believe you can and you're halfway there. – Theodore Roosevelt",
//     "The way to get started is to quit talking and begin doing. – Walt Disney",
//     "Your time is limited, don’t waste it living someone else’s life. – Steve Jobs"
// ];

// function displayRandomQuote() {
//     const randomIndex = Math.floor(Math.random() * quotes.length);
//     document.getElementById('quote').textContent = quotes[randomIndex];
// }

// window.onload = displayRandomQuote;

// const api_url = "https://api.quotable.io/random";

// async function getRandomQuote(url) {
//     try {
//       const response = await fetch(url); // Fetch random quote from quotable.io
//       const data = await response.json(); // Parse the JSON response
//       console.log(data);
//     //   document.getElementById('quote').textContent = `"${data.content}" - ${data.author}`; // Display quote and author
//     } catch (error) {
//       document.getElementById('quote').textContent = "Oops! Couldn't fetch a quote.";
//       console.error("Error fetching quote:", error);
//     }
//   }

//   window.onload = getRandomQuote(api_url);

const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");

window.onload = randomQuote;

async function randomQuote() {
    fetch("https://quotes-api-self.vercel.app/quote")
    .then(response => response.json())
    .then(result => {
        console.log(result);
        document.getElementById('quote').textContent = `"${result.quote}"`;
        document.getElementById('author').textContent = `- ${result.author}`;
        // quoteText.innerText = result.quote;
        // authorText.innerText = result.author;
    }).catch(error => {
        console.error(error);
    });
}











