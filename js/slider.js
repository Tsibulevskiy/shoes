/**
 * Slider
 */
;(function () {
    var activeIndex = 0;
    var carousel = document.querySelector('#carousel');
    var carouselContainer = document.querySelector('.carousel__container');
    var carouselContainerUl = carousel.querySelector('ul');
    var carouselItem = carouselContainer.querySelectorAll('li');
    var carouselPrev = carousel.querySelector('.carousel__prev');
    var carouselNext = carousel.querySelector('.carousel__next');
    var carouselWidth = carouselContainer.offsetWidth;
    //Задаем Ширину ul
    carouselContainerUl.style.width = carouselWidth*carouselItem.length + 'px';
    //Задаем ширину li
    carouselItem.forEach(function (item) {
       item.style.width = 10/carouselItem.length + '%';
    });
      //задержка для transition;
      setTimeout(function () {
          carouselContainerUl.style.transition = '800ms ease';
      },200);

    //Основная функция карусели;
    function changeCarousel() {
         carouselContainerUl.style.transform = "translateX(-"+ activeIndex*carouselWidth/carouselItem.length +"px)";
    }
    //Обработчик события на кнопку next;
    carouselNext.addEventListener('click', function () {
        activeIndex++;
        if(activeIndex === carouselItem.length){
            activeIndex = 0;
        }
        changeCarousel();
    });
    //Обработчик события на кнопку prev;
    carouselPrev.addEventListener('click', function () {
        if(activeIndex === 0){
            activeIndex = carouselItem.length;
        }
        activeIndex--;
        changeCarousel();
    });
})();
