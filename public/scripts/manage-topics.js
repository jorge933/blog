const modal_deleteBtn = document.querySelector('main section.main div.new-admin button.delete-topic');
const modal_delete = document.querySelector('main section.modal-delete');
const cancel_button = document.querySelector('main section.modal-delete .cancel-delete');

modal_deleteBtn.addEventListener('click', () => {
    modal_delete.classList.add('active');
});

cancel_button.addEventListener('click', () => { modal_delete.classList.remove('active') });

const open_newTopic = document.querySelector('button.new-topic-button');
const modal_newTopic = document.querySelector('main section.new-topic');

open_newTopic.addEventListener('click', () => {
    modal_newTopic.classList.add('active');
})

document.querySelector('main section.new-topic .cancel-newTopic').addEventListener('click', () => {
    modal_newTopic.classList.remove('active');
});