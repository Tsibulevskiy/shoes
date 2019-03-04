/**
 * Slider
 */
;(function () {
    let activeIndex = 0;



    let carousel = document.querySelector('#carousel');
    let carouselContainer = document.querySelector('.carousel__container');
    let carouselContainerUl = carousel.querySelector('ul');
    let carouselItem = carouselContainer.querySelectorAll('li');
    let carouselPrev = carousel.querySelector('.carousel__prev');
    let carouselNext = carousel.querySelector('.carousel__next');
    let carouselWidth = carouselContainer.offsetWidth;

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
