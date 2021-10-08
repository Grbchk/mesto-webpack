// функции для работы с карточками проекта Mesto вынесите в файл
//все что касается работы карточки, в частности функция создания карточки,
//функция добавления карточки на страницу

const photoCardPlace = container.querySelector('.photo-grid__list');

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

//ОДНА ФУНКЦИЯ - ОДНО ДЕЙСТВИЕ (РАЗНЕСТИ НА МАЛЕНЬКИЕ ФУНКЦИИ, см. validste.js)

const createPhotoCard = (cardData, {...rest}) => {
  const photoCardTemplate = document.querySelector('#photo-card-template').content;//выбираем темплейт
  const photoCard = photoCardTemplate.querySelector(rest.cardItem).cloneNode(true); //клонировать всю структуру карточки

  cardEventListeners(photoCard, rest);
  addCardData(photoCard, cardData, rest);
  addViewImageData(photoCard, cardData, rest);
//передаваемые константы
{
  cardItem: '.photo-card',
  cardTitle: '.photo-card__title',
  cardImage: '.photo-card__image',
  heartButton: '.photo-card__button-heart',
  deleteButton: '.photo-card__button-delete',
};

  return photoCardElement;
}

const cardEventListeners = (photoCard, {...rest}) => {
  const card = photoCard;
  likeButtonListeners(card, rest); //добавит слушатель на конкретную карточку
  deleteButtonListeners(card, rest);
  imageListeners(card, rest);  //тут ли вызывать? по клику на картинку открывается попап из разметки для просмотра картинки
}

const likeButtonListeners = (card, {...rest}) => {
  card.querySelector(rest.heartButton).addEventListener('click', function (evt) {
    const eventTarget = evt.target; //это чтобы состояние туда-сюда менялось при клике
    eventTarget.classList.toggle('photo-card__button-heart_active');
  });
}

const deleteButtonListeners = (card, {...rest}) => {
  card.querySelector(rest.deleteButton).addEventListener('click', function () {  //можно ли сразу слушатель на deleteButton накладывать?
    const deletedCard = card.querySelector(rest.deleteButton).closest(card);
    deletedCard.remove(); //при клике на ведерко удалить ближ карточку, переименовать итем в кард
  });
}







const imageListeners = (card, {...rest}) => {
  card.querySelector(rest.cardImage).addEventListener('click', function () {
    openPopup(popupViewingPhoto); //открывает попап из разметки
    //и тут же обработчик
    viewingPhotoCloseButton.addEventListener('click', () => {
      closePopup(popupViewingPhoto);
    });
  });
}

const addCardData = (photoCard, cardData, {...rest}) => {
  photoCard.querySelector(rest.cardTitle).textContent = cardData.name;
  photoCard.querySelector(rest.cardImage).src = cardData.link;
  photoCard.querySelector(rest.cardImage).alt = cardData.name;
}

const addViewImageData = (photoCard, cardData, {...rest}) => {
    const photo = popupViewingPhoto.querySelector('.viewing-photo__image'); viewImage
    const figcaption = popupViewingPhoto.querySelector('.viewing-photo__figcaption');
    photo.src = cardData.link;
    photo.alt = cardData.name;
    figcaption.textContent = cardData.name;
}



const addPhotoCard = (cardData, cardContainer) => {
  const card = createPhotoCard(cardData);
  cardContainer.prepend(card); //добавляем готовую карточку в разметку
};


//можно вынести создание базовых карточек в отдельный файл
initialCards.forEach((arrayItem) => {   //запускаем массив циклично, создавая каждую карточку функцией addPhotoCard
  addPhotoCard(arrayItem, photoCardPlace); //photoCardPlace это контейнер в разметке
});




//popupForm глобальная переменная?
const popupForm = popupPhotoСard.querySelector('.popup__form');
const popupCloseButton = popupPhotoСard.querySelector('.popup__close-button');

const popupPhotoСard = container.querySelector('#add-photo-card'); //передается в открыть/закрыть попап


const photoCardForm = popupPhotoСard.querySelector('.popup__form');
const photoСardCloseButton = popupPhotoСard.querySelector('.popup__close-button');
const popupPhotoСardTitle = popupPhotoСard.querySelector('#popup-photo-title');
const popupPhotoСardSubtitle = popupPhotoСard.querySelector('#popup-photo-subtitle');

//название функции
photoCardAddButton.addEventListener('click', () => { //profile__button-add (уникальный селектор) это элемент блока профиль, открывает форму доб картинок
  popupForm.reset();
  openPopup(popupPhotoСard);
});
//добавля
popupForm.addEventListener('submit', () => {
  const name = popupPhotoСardTitle.value;
  const link = popupPhotoСardSubtitle.value;
  addPhotoCard({name, link}, photoCardPlace); //photoCardPlace это контейнер в разметке
  submitForm(popupPhotoСard); //закрываем форму добавления карточек
});

popupCloseButton.addEventListener('click', () => {
  closePopup(popupPhotoСard);
});


