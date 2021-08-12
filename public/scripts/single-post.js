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