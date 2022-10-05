const inputElem = document.getElementById('input-name');
const form = document.getElementById('form');
const listElem = document.getElementById('to-do-list');
const buttonElem = document.getElementById('to-do-list button');

const toDoArray = JSON.parse(localStorage.getItem('to-do-list')) || [];

function updateList(){
  listElem.innerHTML = '';

  for (const key in toDoArray) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.innerText = toDoArray[key];

    const button = document.createElement('button');
    button.innerText = 'Borrar';
    button.setAttribute('key', key); 
    button.classList.add('delete');

    li.appendChild(span);
    li.appendChild(button);
    listElem.appendChild(li);
  }

  localStorage.setItem('to-do-list',JSON.stringify(toDoArray));
}

const replace = () => {
  return;
}

const addTask = (value) => {
    toDoArray.push(value);
    
    updateList();   
    inputElem.value = '';
    inputElem.focus();
}
// aplicar funcion (pedirPosts) en la consola
const pedirPosts = async () => {
  const resp = await fetch('/tasks.json')
  const data = await resp.json()
 
  data.forEach((post) => {
    addToList(post.task);
  })
}

function addToList(value){
  value === '' ? replace() : addTask(value);
}

function deleteFromList(key){

  toDoArray.splice(Number(key),1);

  updateList();
  inputElem.value = '';
  inputElem.focus();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  addToList(inputElem.value);
});

document.addEventListener('click', e => {
  const el = e.target;
  if (el.classList.contains('delete')){
    Swal.fire({
        title: 'Estas seguro de borrar esta tarea?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, borrar tarea!'
    }).then((result) => {
        if (result.isConfirmed) {
        deleteFromList(el.getAttribute('key'))
        Toastify({
            text: "Tarea borrada.",
            duration: "500",
            className : "delete-message",
            offset: {
              x: 0,
              y: 850
            },
          }).showToast();
        }
    })
  }
});

updateList();