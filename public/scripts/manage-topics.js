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

const buttons = document.querySelectorAll('main section.modal-delete .lang-container div button');
const lang = document.querySelectorAll('main section.modal-delete .lang-container div span');
const langContainer = document.querySelectorAll('main section.modal-delete .lang-container')
const socket = io();
const user = document.querySelector('main input[type="hidden"]');

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
      const infos = {
          lang: lang[i].innerHTML,
          user: user.value
      }
      socket.emit('deleteTopic', infos);

      socket.on('resTopic', data => {
        if (data.res === true) {
            langContainer[i].remove();
        } else if (data.res === false) {
            console.log('Não autorizado');
        }
      })
    });
}

