const menu_icon = document.querySelector('main div.hamburger-icon');
const menu = document.querySelector('main aside.menu');

menu_icon.addEventListener('click', e => {
    menu.classList.toggle('active');
    menu_icon.classList.toggle('active');
})


const new_admin = document.querySelector('main section.main div.new-admin button');
const modal_newAdm = document.querySelector('section.modal');

new_admin.addEventListener('click', e => {
    modal_newAdm.classList.add('active')
})

const close_modal = document.querySelector('section.modal form div.buttons button[type="button"]');

close_modal.addEventListener('click', () => {
    modal_newAdm.classList.remove('active')
})