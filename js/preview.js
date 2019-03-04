/*preview фотографий в details*/
(function () {
    let preview = document.querySelector('.preview__nav');
    let previewContent = document.querySelector('.preview__content');
    let previewItems = previewContent.querySelectorAll('.preview__item');

    preview.addEventListener('click', changePreview);
    
    function changePreview(event) {
        let targetPreview = event.target.parentNode.getAttribute("href");
        console.log(targetPreview);
            for(let i = 0; i < previewItems.length; i++){
                previewItems[i].classList.add('hidden');
            }
            previewContent.querySelector(targetPreview).classList.remove('hidden');
    }
})();