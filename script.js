const container = document.querySelector('.page');
const profileTitle = container.querySelector('.profile__title');
const profileSubitle = container.querySelector('.profile__subtitle');
const profileEditButton = container.querySelector('.profile__button-edit');
const popupProfile = container.querySelector('#add-profile');
const profileCloseButton = popupProfile.querySelector('.popup__close-button');
const profileSaveButton = popupProfile.querySelector('#save-button');
const popupProfileTitle = popupProfile.querySelector('#popup-title');
const popupProfileSubitle = popupProfile.querySelector('#popup-subtitle');
const photoCardList = container.querySelector('.photo-grid__list');
const photoCardAddButton = container.querySelector('.profile__button-add');
const popupPhotoСard = container.querySelector('#add-photo-card');
const photoСardCloseButton = popupPhotoСard.querySelector('.popup__close-button');
const photoСardSaveButton = popupPhotoСard.querySelector('#save-button');
const popupPhotoСardTitle = popupPhotoСard.querySelector('#popup-title');
const popupPhotoСardSubitle = popupPhotoСard.querySelector('#popup-subtitle');
const popupViewingPhoto = container.querySelector('.viewing-photo');
const viewingPhotoCloseButton = popupViewingPhoto.querySelector('.popup__close-button');
const viewingPhotoLink = popupViewingPhoto.querySelector('.viewing-photo__image');
const viewingPhotoFigcaption = popupViewingPhoto.querySelector('.viewing-photo__figcaption');

const openPopup = function (popup, title, subtitle) {
  popup.classList.add('popup_opened');
  title.value = '';
  subtitle.value = '';
};

const savePopup = (popup) => {
  event.preventDefault();
  closePopup(popup);
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

photoСardSaveButton.addEventListener('click', () => {
  const name = popupPhotoСardTitle.value;
  const link = popupPhotoСardSubitle.value;
  addPhotoCard(name, link);
  savePopup(popupPhotoСard);
});

function addPhotoCard(name, link) {
  const photoCardTemplate = document.querySelector('#photo-card-template').content;
  const photoCard = photoCardTemplate.querySelector('.photo-card').cloneNode(true);
  photoCard.querySelector('.photo-card__image').src = link;
  photoCard.querySelector('.photo-card__title').textContent = name;
  photoCard.querySelector('.photo-card__button-heart').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('photo-card__button-heart_active');
  });
  photoCard.querySelector('.photo-card__button-delete').addEventListener('click', function () {
    const listItem = photoCard.querySelector('.photo-card__button-delete').closest('.photo-card');
    listItem.remove();
  });
  photoCardList.prepend(photoCard);
};

for (i=0; i<initialCards.length; i++) {
  addPhotoCard(initialCards[i].name, initialCards[i].link);
};

const openedPhotos = container.querySelectorAll('.photo-card__image');
const cardTitles = container.querySelectorAll('.photo-card__title');
for (let i = 0; i <= openedPhotos.length; i++) {
  openedPhotos[i].addEventListener('click', function openPhoto () {
  const link = popupViewingPhoto.querySelector('.viewing-photo__image');
  const figcaption = popupViewingPhoto.querySelector('.viewing-photo__figcaption');
  link.src = openedPhotos[i].src;
  figcaption.textContent = cardTitles[i].textContent;
  viewingPhotoCloseButton.addEventListener('click', () => {
    closePopup(popupViewingPhoto);
  });
  popupViewingPhoto.classList.add('popup_opened');
});
}

// viewingPhotoCloseButton.addEventListener('click', () => {
//   closePopup(popupViewingPhoto);
// });







// работает все, но не подключаются новые карточки
// const openedPhotos = container.querySelectorAll('.photo-card__image');
// const cardTitles = container.querySelectorAll('.photo-card__title');
// for (let i = 0; i <= openedPhotos.length; i++) {
//   openedPhotos[i].addEventListener('click', function openPhoto () {
//   const link = popupViewingPhoto.querySelector('.viewing-photo__image');
//   const figcaption = popupViewingPhoto.querySelector('.viewing-photo__figcaption');
//   link.src = openedPhotos[i].src;
//   figcaption.textContent = cardTitles[i].textContent;
//   viewingPhotoCloseButton.addEventListener('click', () => {
//     closePopup(popupViewingPhoto);
//   });
//   popupViewingPhoto.classList.add('popup_opened');
// });
// }


// работает одна карточка
// const openedPhotos = container.querySelectorAll('.photo-card__image');
// container.querySelector('.photo-card__image').addEventListener('click', () => {
//   const link = popupViewingPhoto.querySelector('.viewing-photo__image');
//   const figcaption = popupViewingPhoto.querySelector('.viewing-photo__figcaption');
//   link.src = container.querySelector('.photo-card__image').src;
//   figcaption.textContent = container.querySelector('.photo-card__title').textContent;
//   popupViewingPhoto.classList.add('popup_opened');
// });

// мой нерабочий вариант с двумя функциями
// function createPhotoCard(cardData) {
//   const photoCardTemplate = document.querySelector('#photo-card-template').content;
//   const photoCard = photoCardTemplate.querySelector('.photo-card').cloneNode(true);
//   photoCard.querySelector('.photo-card__image').src = cardData.link;
//   photoCard.querySelector('.photo-card__title').textContent = cardData.name;
//   photoCard.querySelector('.photo-card__button-heart').addEventListener('click', function (evt) {
//     const eventTarget = evt.target;
//     eventTarget.classList.toggle('photo-card__button-heart_active');
//   });
//   photoCard.querySelector('.photo-card__button-delete').addEventListener('click', function () {
//     const listItem = photoCard.querySelector('.photo-card__button-delete').closest('.photo-card');
//     listItem.remove();
//   });
//   const image = container.querySelector('.photo-card__image');
//   image.addEventListener('click', function () {
//     const link = popupViewingPhoto.querySelector('.viewing-photo__image');
//     const figcaption = popupViewingPhoto.querySelector('.viewing-photo__figcaption');
//     link.src = cardData.link;
//     figcaption.textContent = cardData.name;
//     popupViewingPhoto.classList.add('popup_opened');
//   });
//   return photoCard;
// }

// function addPhotoCard(photoCard, photoCardList) {
//   createPhotoCard(photoCard);
//   photoCardList.prepend(photoCard);
// });

// initialCards.forEach((item) => {
//   addCard(item, photoCardList);
// });
