/*preview фотографий в details*/
var Preview = (function () {
    var preview = document.querySelector('.preview__nav');
    var previewContent = document.querySelector('.preview__content');
    var previewItems = previewContent.querySelectorAll('.preview__item');
    function initPreviews(){

        preview = document.querySelector('.preview__nav');
        previewContent = document.querySelector('.preview__content');
        previewItems = previewContent.querySelectorAll('.preview__item');

        preview && preview.addEventListener('click', changePreview);
    }
    function changePreview(event) {
        event.preventDefault();
        var targetPreview = event.target.parentNode.getAttribute("href");
        for(var i = 0; i < previewItems.length; i++){
            previewItems[i].classList.add('hidden');
        }
        previewContent.querySelector(targetPreview).classList.remove('hidden');
    }
    return {
        initListeners: initPreviews
    };
})();