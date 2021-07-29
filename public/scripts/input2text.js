const button = document.querySelector('main form div button[type="button"]');
const input = document.querySelector('main form div input');

button.addEventListener('click', () => {
    if (input.type === 'password') {
        input.type = 'text';
        button.innerText = 'Esconder';
    } else {
        input.type = 'password';
        button.innerText = 'Vísivel';
    }
})