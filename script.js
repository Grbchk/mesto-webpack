const container = document.querySelector('.page');
const profileTitle = container.querySelector('.profile__title');
const profileSubitle = container.querySelector('.profile__subtitle');
const profileEditButton = container.querySelector('.profile__button-edit');
const popupProfile = container.querySelector('.popup');
const profileCloseButton = popupProfile.querySelector('.popup__close-button');
const profileSaveButton = popupProfile.querySelector('#save-button');
const popupProfileTitle = popupProfile.querySelector('#popup-title');
const popupProfileSubitle = popupProfile.querySelector('#popup-subtitle');

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

const savePopup = () => {
  event.preventDefault();
  closePopup(popupProfile);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

profileEditButton.addEventListener('click', () => {
  openPopup(popupProfile);
});

profileCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

profileSaveButton.addEventListener('click', () => {
  profileTitle.textContent = popupProfileTitle.value;
  profileSubitle.textContent = popupProfileSubitle.value;
  savePopup();
});


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function addSong(artistValue, titleValue) {

}
