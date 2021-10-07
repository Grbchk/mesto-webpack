import { enableValidation } from './validate.js';

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
const popupPhotoСard = container.querySelector('#add-photo-card');
const photoCardForm = popupPhotoСard.querySelector('.popup__form');
const photoСardCloseButton = popupPhotoСard.querySelector('.popup__close-button');
const popupPhotoСardTitle = popupPhotoСard.querySelector('#popup-photo-title');
const popupPhotoСardSubtitle = popupPhotoСard.querySelector('#popup-photo-subtitle');
const popupViewingPhoto = container.querySelector('.viewing-photo');
const viewingPhotoCloseButton = popupViewingPhoto.querySelector('.popup__close-button');
const viewingPhotoLink = popupViewingPhoto.querySelector('.viewing-photo__image');
const viewingPhotoFigcaption = popupViewingPhoto.querySelector('.viewing-photo__figcaption');

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
  },
];

function createPhotoCard(cardData) {
  const photoCardTemplate = document.querySelector('#photo-card-template').content;
  const photoCardElement = photoCardTemplate.querySelector('.photo-card').cloneNode(true);
  const cardImage = photoCardElement.querySelector('.photo-card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  photoCardElement.querySelector('.photo-card__title').textContent = cardData.name;
  photoCardElement.querySelector('.photo-card__button-heart').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('photo-card__button-heart_active');
  });
  photoCardElement.querySelector('.photo-card__button-delete').addEventListener('click', function () {
    const listItem = photoCardElement.querySelector('.photo-card__button-delete').closest('.photo-card');
    listItem.remove();
  });
  cardImage.addEventListener('click', function () {
    const photo = popupViewingPhoto.querySelector('.viewing-photo__image');
    const figcaption = popupViewingPhoto.querySelector('.viewing-photo__figcaption');
    photo.src = cardData.link;
    photo.alt = cardData.name;
    figcaption.textContent = cardData.name;
    openPopup(popupViewingPhoto);
  });
  return photoCardElement;
}

function addPhotoCard(cardData, cardContainer) {
  const card = createPhotoCard(cardData);
  cardContainer.prepend(card);
};

initialCards.forEach((arrayItem) => {
  addPhotoCard(arrayItem, photoCardList);
});

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

photoCardAddButton.addEventListener('click', () => {
  photoCardForm.reset();
  openPopup(popupPhotoСard);
});

photoCardForm.addEventListener('submit', () => {
  const name = popupPhotoСardTitle.value;
  const link = popupPhotoСardSubtitle.value;
  addPhotoCard({name, link}, photoCardList);
  submitForm(popupPhotoСard);
});

photoСardCloseButton.addEventListener('click', () => {
  closePopup(popupPhotoСard);
});

viewingPhotoCloseButton.addEventListener('click', () => {
  closePopup(popupViewingPhoto);
});


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
});
