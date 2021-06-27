import Modal from './modal.js'

const modal = Modal();

const checkButtons = document.querySelectorAll('a.check');
const deleteButtons = document.querySelectorAll('a.delete');

const modalTitle = document.querySelector('.modal h2');
const modalDescription = document.querySelector('.modal p');
const modalButton = document.querySelector('.modal button');

checkButtons.forEach(button => {
    button.addEventListener('click', handleClick);
});

deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {handleClick(event, false)});
});

function handleClick(event, check = true) {
    event.preventDefault();


    // /room/:room_id/:question_id/:action

    const roomId = document.querySelector('#room-id').dataset.id;
    const slug = check?'check':'delete';
    const form = document.querySelector('.modal form');
    const questionId = event.target.dataset.id;

    form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

    modalTitle.innerHTML = check?"Marcar como lida":"Excluir pergunta"
    modalDescription.innerHTML = check
        ?"Tem certeza que deseja marcar a pergunta como lida?"
        :"Tem certeza que deseja excluir a pergunta?"
    check
        ?modalButton.classList.remove('red')
        :modalButton.classList.add('red')
    modalButton.innerHTML = check?'Marcar como lida':"Excluir";

    modal.open();
}
