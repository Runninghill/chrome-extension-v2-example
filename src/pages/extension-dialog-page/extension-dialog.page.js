import { STORAGE_KEY } from '../../enums/storage-key.enum';

const PAGE_ELEMENT_ID = {
    MINIMUM_AGE_INPUT: 'minimum-age-input',
    MAXIMUM_AGE_INPUT: 'maximum-age-input',
    SAVE_BUTTON: 'save-button'
}

initializePage();

function initializePage() {
    initializeAgeInputs();
}

function initializeAgeInputs() {
    chrome.storage.sync.get(STORAGE_KEY.MINIMUM_AGE, result => {
        document.getElementById(PAGE_ELEMENT_ID.MINIMUM_AGE_INPUT).value = result[STORAGE_KEY.MINIMUM_AGE];
    });

    chrome.storage.sync.get(STORAGE_KEY.MAXIMUM_AGE, result => {
        document.getElementById(PAGE_ELEMENT_ID.MAXIMUM_AGE_INPUT).value = result[STORAGE_KEY.MAXIMUM_AGE];
    })
}