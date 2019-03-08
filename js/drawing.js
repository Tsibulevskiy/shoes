/**
 * Created by cerat on 27.02.2019.
 */

var Draving =   (function () {
        document.addEventListener("DOMContentLoaded", function () {
            var categoryFootwear = document.querySelector('#coats');
            var sectionDetails = document.querySelector("#details");
            var sectionPreview = document.querySelector("#preview");
            var sectionBreadcrumb = document.querySelector(".breadcrumb__menu");
            var sectionShoppingBag = document.querySelector("#shopping_bag");


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
                        }
                        if(sectionDetails){
                            let shoesId = getShoes(response);  //выборка по id;
                            renderShoes(shoesId);
                            initListeners();
                        }
                        if(sectionBreadcrumb){
                            let breadcrumb = getGender(response);
                            renderBreadcrumb(breadcrumb);
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
            function shoesIdTemplate(shoesId) {
                return `<div class="col-12 details__title"><h2>${shoesId.name}</h2></div>
                            <div class="col-12 details__article"><h3>Article number:${shoesId.article}</h3></div>
                            <div class="col-12 detail__price"><p>€ ${shoesId.price}</p></div>
                            <div class="col-12 details__description"><p>Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis.Maecenas malesuada elit lectus felis, malesuada ultricies. </p></div>
                            <div class="col-12 details__size"><h3>Size</h3></div>
                            <div class="col-12 details__item row justify-center">
                                <label><input class="hidden" type="radio" checked name="size">
                                    <div><i class="icon__ok">${shoesId.sizes[0]}</i><i class="">${shoesId.sizes[0]}</i></div>
                                </label>
                                <label><input class="hidden" type="radio" name="size">
                                    <div><i class="icon__ok">${shoesId.sizes[1]}</i><i class="">${shoesId.sizes[1]}</i></div>
                                </label>
                                <label><input class="hidden" type="radio" name="size">
                                    <div><i class="icon__ok">${shoesId.sizes[2]}</i><i class="">${shoesId.sizes[2]}</i></div>
                                </label>
                                <label><input class="hidden" type="radio" name="size">
                                    <div><i class="icon__ok">${shoesId.sizes[3]}</i><i class="">${shoesId.sizes[3]}</i></div>
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
            function breadcrumbTemplate(gender) {
                console.log(gender);
                return `<li class="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li class="breadcrumb-item active" >${gender.category}</li>`;

            }
            function shoppingBagTemplate(response) {
                return `<tbody id="shopping_bag">
                            <tr class="row">
                                <td class=" col-1 no-margin shoppingBag__table__product">
                                    <a href="#"><img src="${response.thumbnails[0]}" alt=""></a>
                                </td>
                                <td class=" col-6 no-margin shoppingBag__table__discription row align-center">
                                    <div class="column col-12 no-margin no-gap">
                                        <div class="col-12 column no-margin no-gap">
                                            <h2>${response.name}</h2>
                                            <h3>Ref.${response.article}</h3>
                                        </div>
                                    </div>
                                </td>
                                <td class=" col-2 no-margin shoppingBag__table__color row align-center">
                                    <span>${response.color}</span>
                                </td>
                                <td class=" col-1 no-margin shoppingBag__table__size row align-center">
                                    <span>39</span>
                                </td>
                                <td class="col-1 no-margin shoppingBag__table__qty row align-center">
                                    <div class="row align-center">
                                        <span>1</span>
                                        <div class="column no-gap no-margin">
                                            <button type="button" class="no-gap">+</button>
                                            <button type="button" class="no-gap">-</button>
                                        </div>
                                    </div>
                                </td>
                                <td class="col-1 no-margin shoppingBag__table__amount row align-center">
                                    <span>€ ${response.price}</span>
                                    <span class="price__clear">X</span>
                                </td>
                            </tr>
                        </tbody>`
            }

            function renderProducts(gender) {
                let fragment = gender.map(genderTemplate).join('');
                if(categoryFootwear){
                    categoryFootwear.innerHTML = fragment;
                }
            }
            function renderShoes(shoesId) {
                var fragmentId = shoesId.map(shoesIdTemplate).join('');
                var fragmentPreview = shoesId.map(shoesPreviewTemplate).join('');
                if(sectionDetails){
                    sectionPreview.innerHTML = fragmentPreview;
                    sectionDetails.innerHTML = fragmentId;
                }
            }
            function renderBreadcrumb(gender) {
                var fragment = gender.map(breadcrumbTemplate).join('');
                if(sectionBreadcrumb){
                    sectionBreadcrumb.innerHTML = fragment;
                }
            }
            function renderShoppingBag(shoes) {
                var fragment = shoes.map(shoppingBagTemplate).join('');
                if (sectionShoppingBag){
                    sectionShoppingBag.innerHTML = fragment;
                }
            }

            function initListeners(){
                Preview.initListeners();
            }

            getFootwear();
        });

})();
