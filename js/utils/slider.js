/**
 * Slider
 */
;(function () {
    var activeIndex = 0;
    var carousel = document.querySelector('#carousel');
    var carouselContainer = document.querySelector('.carousel__container');
    var carouselContainerUl = carousel.querySelector('ul');
    var carouselItem = carouselContainer.getElementsByTagName('li'); //живые колекции
    var carouselPrev = carousel.querySelector('.carousel__prev');
    var carouselNext = carousel.querySelector('.carousel__next');
    var carouselWidth = carouselContainer.offsetWidth;
    //Задаем Ширину ul
    carouselContainerUl.style.width = carouselWidth*carouselItem.length + 'px';
    //Задаем ширину li
    Array.from(carouselItem).forEach(function (item) {
       item.style.width = 25/carouselItem.length + '%';
    });

      //задержка для transition;
      setTimeout(function () {
          carouselContainerUl.style.transition = '300ms ease';
      },600);
    //Основная функция карусели;
    function changeCarousel() {
         carouselContainerUl.style.transform = "translateX(-"+ activeIndex*carouselWidth/carouselItem.length +"px)";
    }
    //Обработчик события на кнопку next;
    carouselNext.addEventListener('click', function () {
         activeIndex++;
                carouselContainerUl.appendChild(carouselItem[0]);
        changeCarousel();
    });
    //Обработчик события на кнопку prev;
    carouselPrev.addEventListener('click', function () {
            carouselContainerUl.insertBefore(carouselItem[carouselItem.length-1], carouselItem[0]);
        activeIndex--;
        changeCarousel();
    });
})();
