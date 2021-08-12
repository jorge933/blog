const buttonOptions = document.querySelector('main div.button-options i.fas.fa-ellipsis-v');
const buttonOptionsContainer = document.querySelector('div.options');

buttonOptions.addEventListener('click', () => {
    buttonOptionsContainer.classList.toggle('active');
})

const button_exclude = document.querySelector('main section.profile-infos button.exclude');
const button_edit = document.querySelector('main section.profile-infos button.edit-post');

const socket = io();
const id = document.querySelector('main section.profile-infos input[type="hidden"].post-id').value;
const user = document.querySelector('main section.profile-infos input[type="hidden"].user').value;

button_exclude.addEventListener('click', () => {
    socket.emit('deletePost', { id, user });
    socket.on('resDeletePost', data => {
        if (data === true) {
            window.location.href = '/posts';
        } else {
            window.location.href = '/';
        }
    });
});

const modal_inputs = document.querySelectorAll('div.modal form input[type="text"], div.modal form textarea');
const edit_confirm = document.querySelector('div.modal form div.buttons input[type="submit"]');

for (let i = 0; i < modal_inputs.length; i++) {
    modal_inputs[i].addEventListener('input', () => {
        edit_confirm.style.display === 'none' ? edit_confirm.style.display = 'unset' : '';
    })
}

const modal = document.querySelector('div.modal');

button_edit.addEventListener('click', () => {
    modal.classList.add('active');
})

const close_modal = document.querySelector('div.modal form div.buttons button.cancel');

close_modal.addEventListener('click', () => {
    modal.classList.remove('active');
})