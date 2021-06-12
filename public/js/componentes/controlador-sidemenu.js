'use strict';
const menuIcon = document.querySelector('.menu_toggler');
const sidebar = document.querySelector('.sidebar');

menuIcon.addEventListener('click', function() {
    this.classList.toggle('active');
    sidebar.classList.toggle('open');
});