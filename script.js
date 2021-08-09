const container = document.querySelector('.page');
const profileTitle = container.querySelector('.profile__title');
const profileSubitle = container.querySelector('.profile__subtitle');
const profileEditButton = container.querySelector('.profile__button-edit');
const popupProfile = container.querySelector('.add-profile');
const profileCloseButton = popupProfile.querySelector('.popup__close-button');
const profileSaveButton = popupProfile.querySelector('#save-button');
const popupProfileTitle = popupProfile.querySelector('#popup-title');
const popupProfileSubitle = popupProfile.querySelector('#popup-subtitle');
const photoCardAddButton = container.querySelector('.profile__button-add');

const popupPhotoСard = container.querySelector('.add-photo-card');
const photoСardCloseButton = popupPhotoСard.querySelector('.popup__close-button');
const photoСardSaveButton = popupPhotoСard.querySelector('#save-button');
const popupPhotoСardTitle = popupPhotoСard.querySelector('#popup-title');
const popupPhotoСardSubitle = popupPhotoСard.querySelector('#popup-subtitle');


const photoCardList = container.querySelector('.photo-grid__list');

const openPopup = function (popup, title, subtitle) {
  popup.classList.add('popup_opened');
  title.value = '';
  subtitle.value = '';
};

const savePopup = (item) => {
  event.preventDefault();
  closePopup(item);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

profileEditButton.addEventListener('click', () => {
  const title = popupProfileTitle;
  const subtitle = popupProfileSubitle;
  openPopup(popupProfile, title, subtitle);
});

profileCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

profileSaveButton.addEventListener('click', () => {
  profileTitle.textContent = popupProfileTitle.value;
  profileSubitle.textContent = popupProfileSubitle.value;
  savePopup(popupProfile);
});

photoCardAddButton.addEventListener('click', () => {
  const title = popupPhotoСardTitle;
  const subtitle = popupPhotoСardSubitle;
  openPopup(popupPhotoСard, title, subtitle);
});

photoСardCloseButton.addEventListener('click', () => {
  closePopup(popupPhotoСard);
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
  },
];


function addPhotoCard(name, link) {
  const photoCardTemplate = document.querySelector('#photo-card-template').content;
  const photoCard = photoCardTemplate.querySelector('.photo-card').cloneNode(true);
  photoCard.querySelector('.photo-card__image').src = link;
  photoCard.querySelector('.photo-card__title').textContent = name;
  photoCard.querySelector('.photo-card__button-heart').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('photo-card__button-heart_active');
  });
  photoCard.querySelector('.photo-card__button-delete').addEventListener('click', function (evt) {
    const listItem = photoCard.querySelector('.photo-card__button-delete').closest('.photo-card');
    listItem.remove();
  });
  photoCardList.prepend(photoCard);
};

for (i=0; i<initialCards.length; i++) {
  addPhotoCard(initialCards[i].name, initialCards[i].link);
};

photoСardSaveButton.addEventListener('click', () => {
  const name = popupPhotoСardTitle.value;
  const link = popupPhotoСardSubitle.value;
  addPhotoCard(name, link);
  savePopup(popupPhotoСard);
});
