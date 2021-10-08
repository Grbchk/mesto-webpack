import { enableValidation } from './validate.js';

//инициализацию JS-кода, добавление слушателей и другие важные участки

const container = document.querySelector('.page');
const profileTitle = container.querySelector('.profile__title');
const profileSubtitle = container.querySelector('.profile__subtitle');
const profileEditButton = container.querySelector('.profile__button-edit');
const popupProfile = container.querySelector('#add-profile');
const profileForm = popupProfile.querySelector('.popup__form');
const profileCloseButton = popupProfile.querySelector('.popup__close-button');
const popupProfileTitle = popupProfile.querySelector('#popup-profile-title');
const popupProfileSubtitle = popupProfile.querySelector('#popup-profile-subtitle');
const photoCardList = container.querySelector('.photo-grid__list');
const photoCardAddButton = container.querySelector('.profile__button-add');

const popupViewingPhoto = container.querySelector('.viewing-photo');
const viewingPhotoCloseButton = popupViewingPhoto.querySelector('.popup__close-button');
const viewingPhotoLink = popupViewingPhoto.querySelector('.viewing-photo__image');
const viewingPhotoFigcaption = popupViewingPhoto.querySelector('.viewing-photo__figcaption');





//это ф-ии попапа
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

function submitForm(popup) {
  event.preventDefault();
  closePopup(popup);
};



profileEditButton.addEventListener('click', () => {
  popupProfileTitle.value = profileTitle.textContent;
  popupProfileSubtitle.value = profileSubtitle.textContent;
  openPopup(popupProfile);
});

profileForm.addEventListener('submit', function () {
  profileTitle.textContent = popupProfileTitle.value;
  profileSubtitle.textContent = popupProfileSubtitle.value;
  submitForm(popupProfile);
});

profileCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
});



enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
});
