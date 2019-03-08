/**
 * Счетчик корзины
 */
var Counter = (function () {
    var basket = {
        "counter": document.querySelector('#counter'),
        "buttonCart" : document.querySelector('.add__button'),
        "buttonOrder": document.querySelector('.order__button'),
        "sectionDetails": document.querySelector("#details"),
        "intermediate": 0,
        "countSave" : 'count',
        "basketSave" : 'basket'
    };
    //Проверка на наличие в LocalStorage счетчика;
    if(!localStorage.getItem(basket.countSave)){
        basket.counter.innerHTML = basket.intermediate;
    }else{
        basket.counter.innerHTML = localStorage.getItem(basket.countSave);
    }
        //Обработчик события на увеличения счетчика товара;
        basket.buttonCart && basket.sectionDetails.addEventListener('click', addDoCart);
        //Обработчик события на обнуление корзины;
        basket.buttonOrder && basket.buttonOrder.addEventListener('click', resetToCart);

    function addDoCart(event) {
        if (event.target.classList.contains('add__button')){
            if(!localStorage.getItem(basket.countSave)){
                basket.intermediate ++;
            }else{
                var count = localStorage.getItem(basket.countSave);
                basket.intermediate = count;
                basket.intermediate ++;
            }
            basket.counter.innerHTML = basket.intermediate ;
            localStorage.setItem(basket.countSave, basket.intermediate);
        }
    }
    function resetToCart() {
        basket.intermediate = 0;
        basket.counter.innerHTML = basket.intermediate ;
        localStorage.removeItem(basket.countSave);
    }



    return {


    }


})();




