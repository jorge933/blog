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
        socket.emit('deletePost', { id, user });
        socket.on('resDeletePost', data => {
            if (data === true) {
                window.location.href = '/posts';
            } else {
                window.location.href = '/';
            }
        })
    })
}


const buttonLike = document.querySelector('main section.post div.description div.buttons-interaction button.like');
const iconLike = document.querySelector('main section.post div.description div.buttons-interaction button.like i');
const Numberlikes = document.querySelector('main section.post div.description div.buttons-interaction button.like span.likes-length');

buttonLike.addEventListener('click', () => {
    const id = document.querySelector('input[type="hidden"].post-id').value;
    const email = document.querySelector('input[type="hidden"].email').value;
    const user = { id, email }
    socket.emit('like', user);

})
socket.on('like', data => {
    if (data === 1) {
        iconLike.classList.replace('far', 'fas');
        parseInt(Numberlikes.innerHTML++);
    }
});
socket.on('withdrew-liked', () => {
    iconLike.classList.replace('fas', 'far')
    parseInt(Numberlikes.innerHTML--);
});