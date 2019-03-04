/**
 * Created by cerat on 27.02.2019.
 */

;(function () {
        document.addEventListener("DOMContentLoaded", function () {
            let categoryFootwear = document.querySelector('#coats');
            let sectionDetails = document.querySelector("#details");
            let sectionPreview = document.querySelector("#preview");
            function getFootwear() {
                let xhr =new XMLHttpRequest();
                let response = [];
                xhr.open('GET', 'shoes.json');
                xhr.addEventListener('readystatechange', function () {
                    if(xhr.readyState == 4 && xhr.status == 200){
                        response = JSON.parse(xhr.responseText);
                        if(categoryFootwear){
                            let gender = getGender(response); //выборка по категории;
                            renderProducts(gender);
                        };
                        if(sectionDetails){
                            let shoesId = getShoes(response);  //выборка по id;
                            console.log(shoesId);
                            renderShoes(shoesId);
                        }
                    }
                });
                xhr.send();
            }

            function getGender(response) {
                let shoes = [];
                let category = location.search.slice(5);
                shoes = response.filter(function (item) {
                    if(category == item.category){
                        return item;
                    }
               });
                    return shoes;
            }
            function getShoes(response) {
                let shoes = [];

                let shoesId = location.search.slice(1);
                shoes = response.filter(function (item) {
                    if(shoesId == item.id){
                        return item;
                    }
                });
                return shoes;

            }

            function genderTemplate(gender) {
                    return `<div class="col-3 flex column coast__item justify-center align-center">
                                <div class="product_image flex  align-center">
                                    <a href="details.html?${gender.id}"><img src="${gender.photos[0]}" alt="shoes"></a>
                                </div>
                                <h4>${gender.name}</h4>
                                <div class="product__price">€ ${gender.price}</div>
                            </div>`;
            }
            function renderProducts(gender) {
                let fragment = gender.map(genderTemplate).join('');
                if(categoryFootwear){
                    categoryFootwear.innerHTML = fragment;
                }
            }
            
            function shoesIdTemplate(shoesId) {
                return `<div class="col-12 details__title"><h2>${shoesId.name}</h2></div>
                            <div class="col-12 details__article"><h3>Article number:${shoesId.article}</h3></div>
                            <div class="col-12 detail__price"><p>€ ${shoesId.price}</p></div>
                            <div class="col-12 details__description"><p>Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis.Maecenas malesuada elit lectus felis, malesuada ultricies. </p></div>
                            <div class="col-12 details__size"><h3>Size</h3></div>
                            <div class="col-12 details__item row justify-center">
                                <label><input class="hidden" type="radio" checked name="size">
                                    <div><i class="icon__ok">40</i><i class="">40</i></div>
                                </label>
                                <label><input class="hidden" type="radio" name="size">
                                    <div><i class="icon__ok">40</i><i class="">40</i></div>
                                </label>
                                <label><input class="hidden" type="radio" name="size">
                                    <div><i class="icon__ok">40</i><i class="">40</i></div>
                                </label>
                                <label><input class="hidden" type="radio" name="size">
                                    <div><i class="icon__ok">40</i><i class="">40</i></div>
                                </label>
                            </div>
                            <div class="col-12 details__button row justify-center">
                            <button class="add__button " type="button">add do cart</button></div>`;
            }
            function shoesPreviewTemplate(shoesId) {
                return` <ul class="preview__nav order-2 align-self-end  ">
                            <li><a href="#link1" class="preview__link active__link"><img
                                    src="${shoesId.thumbnails[0]}" alt=""></a></li>
                            <li><a href="#link2" class="preview__link"><img
                                    src="${shoesId.thumbnails[1]}" alt=""></a></li>
                            <li><a href="#link3" class="preview__link"><img
                                    src="${shoesId.thumbnails[2]}" alt=""></a></li>
                        </ul>
                        <div class="preview__content ">
                            <div id="link1" class="preview__item"><img
                                    src="${shoesId.photos[0]}" alt="foto"></div>
                            <div id="link2" class="preview__item hidden"><img
                                    src="${shoesId.photos[1]}" alt="foto"></div>
                            <div id="link3" class="preview__item hidden"><img
                                    src="${shoesId.photos[2]}" alt="foto"></div>
                        </div>`;
            }

            function renderShoes(shoesId) {
                let fragmentId = shoesId.map(shoesIdTemplate).join('');
                let fragmentPreview = shoesId.map(shoesPreviewTemplate).join('');


                if(sectionDetails){
                    sectionPreview.innerHTML = fragmentPreview;
                    sectionDetails.innerHTML = fragmentId;
                }
            }


            getFootwear();
        })

})();
