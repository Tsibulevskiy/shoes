var CartRender = (function () {
    var quantity = document.querySelector(".qty__number");
    var upNumber = document.querySelector(".up__number");
    var downNumber = document.querySelector(".down__number");
    var number = 1;
    var amount = document.querySelector(".amount");


    function changeQuantity() {
        quantity = document.querySelector(".qty__number");
        upNumber = document.querySelector(".up__number");
        downNumber = document.querySelector(".down__number");
        number = 1;
        amount = document.querySelector(".amount");



        upNumber && upNumber.addEventListener('click', addToQuantity);
        downNumber && downNumber.addEventListener('click', decreaseToQuantity);
    }
    function changeItem() {

    }




    function addToQuantity() {
        number ++;
        quantity.innerHTML = number ;
    } //Увеличение товара в корзине;
    function decreaseToQuantity() {
        if(number <= 1){
            number = 1;
            quantity.innerHTML = number ;
        }else{
            number --;
            quantity.innerHTML = number ;
        }

    } //Уменьшение товара в корзине;
    

    
    return{
        changeQuantity: changeQuantity,
        changeItem: changeItem
    }

})();
