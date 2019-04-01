$(document).ready(function(){
    $("#carouselOne").owlCarousel({
        items: 1,
        nav: true,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 3500

    });
});

$(document).ready(function(){
    $("#carouselTwo").owlCarousel({
        items: 7,
        nav: true,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 2000,
        center:true,
        dots: false

    });
});
