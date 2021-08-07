// const buttonOptions = document.querySelector('main div.button-options i.fas.fa-ellipsis-v');
// const buttonOptionsContainer = document.querySelector('div.options');

// buttonOptions.addEventListener('click', () => {
//     buttonOptionsContainer.classList.toggle('active');
// })

// const button = document.querySelectorAll('main section.profile-infos button');
const socket = io();
// const id = document.querySelector('main section.profile-infos input[type="hidden"].post-id').value;
// const user = document.querySelector('main section.profile-infos input[type="hidden"].user').value;

// for (let i = 0; i < button.length; i++) {
//     button[i].addEventListener('click', () => {
//         socket.emit('deletePost', {id, user});
//         socket.on('resDeletePost', data => {
//             if (data === true) {
//                 window.location.href = '/posts';
//             } else {
//                 window.location.href = '/';
//             }
//         })
//     })
// }


const buttonLike = document.querySelector('main section.post div.description div.buttons-interaction button.like');
const buttonNotLike = document.querySelector('main section.post div.description div.buttons-interaction button.deslike');
const iconLike = document.querySelector('main section.post div.description div.buttons-interaction button.like i');
const iconNotLike = document.querySelector('main section.post div.description div.buttons-interaction button.deslike i');

buttonLike.addEventListener('click', () => {
    const user = {id: 1, userID: 1}
    socket.emit('like', user);


    socket.on('like', data => {
        if (data == '1') {
            iconLike.classList.replace('far', 'fas')
        } else {
            iconNotLike.classList.replace('fas', 'far')
            iconLike.classList.replace('far', 'fas')
        }
    });
    socket.on('withdrew-liked', () => iconLike.classList.replace('fas', 'far'));
})

buttonNotLike.addEventListener('click', () => {
    const user = {id: 1, userID: 1}
    socket.emit('notlike', user);

    socket.on('notlike', data => {
        console.log(data);
        if (data == '1') {
            iconNotLike.classList.replace('far', 'fas')
        } else {
            iconNotLike.classList.replace('far', 'fas')
            iconLike.classList.replace('fas', 'far')
        }
    });
    socket.on('removed-notlike', () => iconNotLike.classList.replace('fas', 'far'));
})