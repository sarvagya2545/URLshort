const isCustomCheckbox = document.querySelector('#isKeyword');
const keywordPanel = document.querySelector('#keywordPanel');

isCustomCheckbox && isCustomCheckbox.addEventListener('change', function(e) {
    if(e.target.checked) {
        keywordPanel.classList.remove('hidden');
    } else {
        keywordPanel.classList.add('hidden');
        keywordPanel.value = '';
    }
});
