const buttonOptions = document.querySelector('main div.button-options i.fas.fa-ellipsis-v');
const buttonOptionsContainer = document.querySelector('div.options');

buttonOptions.addEventListener('click', () => {
    buttonOptionsContainer.classList.toggle('active');
})

const button = document.querySelectorAll('main section.profile-infos button');
const socket = io();
const id = document.querySelector('main section.profile-infos input[type="hidden"].post-id').value;
const user = document.querySelector('main section.profile-infos input[type="hidden"].user').value;

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener('click', () => {
        socket.emit('deletePost', {id, user});
        socket.on('resDeletePost', data => {
            if (data === true) {
                window.location.href = '/posts';
            } else {
                window.location.href = '/';
            }
        })
    })
}