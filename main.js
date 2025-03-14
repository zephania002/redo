let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = ()  => {
    search.classList.toggle('active');
    menu.classList.remove('active');
}

let menu = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = ()  => {
    menu.classList.toggle('active');
    search.classList.remove('active');
}

// Hide Menu And Search Box On Scroll
window.onscroll = () => {
    menu.classList.remove('active');
    search.classList.remove('active');

}



//header
let header = document.querySelector('header');


window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);

});

// Footer Animation on Scroll
document.addEventListener("DOMContentLoaded", function () {
    const footerBoxes = document.querySelectorAll(".footer-box");
    
    function showFooterBoxes() {
        footerBoxes.forEach(box => {
            const boxTop = box.getBoundingClientRect().top;
            if (boxTop < window.innerHeight - 50) {
                box.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", showFooterBoxes);
    showFooterBoxes(); // Run once on page load
});

// Blog Section Animation on Scroll
document.addEventListener("DOMContentLoaded", function () {
    const blogBoxes = document.querySelectorAll(".blog-container .box");
    
    function showBlogBoxes() {
        blogBoxes.forEach(box => {
            const boxTop = box.getBoundingClientRect().top;
            if (boxTop < window.innerHeight - 50) {
                box.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", showBlogBoxes);
    showBlogBoxes();
});









