const profile = document.querySelector('header section.search div.profile');
const profile_options = document.querySelector('header section.search div.profile div.profile-options');

profile.addEventListener('click', () => {
    profile_options.classList.toggle('active');

    if (profile_options.classList === 'profile-options') {
        profile_options.style.animation = 'height-transition-close 1s;'
    }
})