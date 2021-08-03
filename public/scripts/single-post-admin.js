const buttonOptions = document.querySelector('main div.button-options i.fas.fa-ellipsis-v');
const buttonOptionsContainer = document.querySelector('main div.options');

buttonOptions.addEventListener('click', () => {
    buttonOptionsContainer.classList.toggle('active');
})