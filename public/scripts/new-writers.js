const cancelButton = document.querySelectorAll('main section.writers div.writer-container div.flex div.buttons button.cancel');
const writerContainer = document.querySelectorAll('main section.writers div.writer-container');
const writer = document.querySelectorAll('main section.writers div.writer-container div.header span.name');
const user = document.querySelector('main input[type="hidden"]');
const socket = io();

for (let i = 0; i < cancelButton.length; i++) {
    cancelButton[i].addEventListener("click", () => {
      const infos = {
          cancel_writer: writer[i].innerText,
          admin: user.value
      }
      socket.emit('cancelWriter', infos);

      socket.on('resCancel', data => {
        if (data === true) {
            writerContainer[i].remove();

            if (document.querySelectorAll('main section.writers div.writer-container').length === 0) {
              document.querySelector('main section.writers').innerHTML += '<p class="no-writer">Os pedidos acabaram.</p>';
            }
        } else if (data === false) { 
            console.log('Não autorizado');
        }
      })
    });
}


const confirmButton = document.querySelectorAll('main section.writers div.writer-container div.flex div.buttons button.confirm');

for (let i = 0; i < cancelButton.length; i++) {
  confirmButton[i].addEventListener("click", () => {
      const infos = {
          new_writer: writer[i].innerText,
          admin: user.value
      }
      socket.emit('confirmWriter', infos);

      socket.on('resConfirm', data => {
        if (data === true) {
            writerContainer[i].remove();

            if (document.querySelectorAll('main section.writers div.writer-container').length === 0) {
              document.querySelector('main section.writers').innerHTML += '<p class="no-writer">Os pedidos acabaram.</p>';
            }
        } else if (data === false) { 
            console.log('Não autorizado');
        }
      })
    });
}