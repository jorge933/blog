const search = document.querySelector('header section.search form input');
const div_options = document.querySelector('header section.search form div.input-focus');

search.addEventListener('click', () => {
    if (div_options.classList.value !== 'input-focus') return;
    div_options.classList.add('active')
});

search.addEventListener('blur', () => {
    setTimeout(() => {
        div_options.classList.remove('active')
    }, 125);
});

const input_filter = document.querySelector('header section.search form div.input-focus input[type="hidden"]');
const autor_button = document.querySelector('header section.search form div.input-focus button.author');
const title_button = document.querySelector('header section.search form div.input-focus button.title');
const content_button = document.querySelector('header section.search form div.input-focus button.content');
const tags_button = document.querySelector('header section.search form div.input-focus button.tags');

autor_button.addEventListener('click', () => {
    input_filter.value = 'autor';
    return div_options.classList.add('autor');
})

title_button.addEventListener('click', () => {
    input_filter.value = 'title';
    return div_options.classList.add('title');
})

content_button.addEventListener('click', () => {
    input_filter.value = 'content';
    return div_options.classList.add('content');
})

tags_button.addEventListener('click', () => {
    input_filter.value = 'tags';
    return div_options.classList.add('tags');
})