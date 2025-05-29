// Header Menu
$('.hamburger_icon').click(function () {
    $(this).toggleClass('open');
    $('.nav_menu').toggleClass('open');
});
// $('.nav_menu a').click(function (e) {
//     e.preventDefault();
//     const target = $($(this).attr('href'));

//     if (target.length) {
//         $('html, body').animate({
//             scrollTop: target.offset().top
//         }, 10);
//     }

//     $('.hamburger_icon').removeClass('open');
//     $('.nav_menu').removeClass('open');
// });
// Header Fixed Top
window.addEventListener('scroll', function () {
    let mainHeader = document.querySelector('.main_header');
    if (scrollY > 100) {
        mainHeader.classList.add('top_scroll')
    } else {
        mainHeader.classList.remove('top_scroll')
    }
});
// Scroll to Top
window.addEventListener('scroll', function () {
    let scrollTop = document.querySelector('.scroll_to_top');
    if (scrollY > 500) {
        scrollTop.style.display = "flex";
    } else {
        scrollTop.style.display = "none";
    }
});
function scrollTopClick() {
    window.scrollTo(0, 0);
};
//For Gallery Lightbox
document.querySelectorAll('.each_gallery img').forEach(image => {
    image.addEventListener('click', function () {
        openGalBox(this.src);
    });
});
function openGalBox(src) {
    let galLightbox = document.querySelector('#gallery_lightbox');
    let galLightboxImg = document.querySelector('#gallery_lightbox_img');
    galLightboxImg.src = src;
    galLightbox.style.display = 'flex';
};
function closeGalBox() {
    document.querySelector('#gallery_lightbox').style.display = 'none';
};