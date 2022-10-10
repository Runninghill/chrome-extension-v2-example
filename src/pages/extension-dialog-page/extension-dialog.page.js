import { STORAGE_KEY } from '../../enums/storage-key.enum';

const PAGE_ELEMENT_ID = {
    MINIMUM_AGE_INPUT: 'minimum-age-input',
    MAXIMUM_AGE_INPUT: 'maximum-age-input',
    SAVE_BUTTON: 'save-button'
}

initializePage();

function initializePage() {
    initializeAgeInputs();
    document.getElementById(PAGE_ELEMENT_ID.SAVE_BUTTON).addEventListener('click', saveAgeRange);
}

function initializeAgeInputs() {
    chrome.storage.sync.get(STORAGE_KEY.MINIMUM_AGE, result => {
        document.getElementById(PAGE_ELEMENT_ID.MINIMUM_AGE_INPUT).value = result[STORAGE_KEY.MINIMUM_AGE];
    });

    chrome.storage.sync.get(STORAGE_KEY.MAXIMUM_AGE, result => {
        document.getElementById(PAGE_ELEMENT_ID.MAXIMUM_AGE_INPUT).value = result[STORAGE_KEY.MAXIMUM_AGE];
    })
}

function saveAgeRange() {
    const minAge = document.getElementById(PAGE_ELEMENT_ID.MINIMUM_AGE_INPUT).value;
    const maxAge = document.getElementById(PAGE_ELEMENT_ID.MAXIMUM_AGE_INPUT).value;

    chrome.storage.sync.set({ [STORAGE_KEY.MINIMUM_AGE]: minAge });
    chrome.storage.sync.set({ [STORAGE_KEY.MAXIMUM_AGE]: maxAge });

    alert('Min/Max age has been set');
}