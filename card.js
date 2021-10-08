// функции для работы с карточками проекта Mesto вынесите в файл
//все что касается работы карточки, в частности функция создания карточки,
//функция добавления карточки на страницу



// //popupForm глобальная переменная?
// const popupPhotoСard = container.querySelector('#add-photo-card'); //передается в открыть/закрыть попап



//ОДНА ФУНКЦИЯ - ОДНО ДЕЙСТВИЕ (РАЗНЕСТИ НА МАЛЕНЬКИЕ ФУНКЦИИ, см. validste.js)

const createPhotoCard = (cardData, {...rest}) => {
  const photoCardTemplate = document.querySelector('#photo-card-template').content;//выбираем темплейт
  const photoCard = photoCardTemplate.querySelector(rest.cardItem).cloneNode(true); //клонировать всю структуру карточки

  cardEventListeners(photoCard, rest); //слушатель на эту карточку
  addCardData(photoCard, cardData, rest); //данные этой карточки
  addViewImageData(photoCard, cardData, rest); //данные для просмотра карточки (не понимаю куда записывается)
  imageClickListeners(card, rest);  //добавляет слушатели картинкам, по клику на картинку открывается попап из разметки для просмотра картинки

  //передаваемые константы
{
  cardItem: '.photo-card', //это все из темплейта
  cardTitle: '.photo-card__title',
  cardImage: '.photo-card__image',
  heartButton: '.photo-card__button-heart',
  deleteButton: '.photo-card__button-delete',
  popupViewingPhoto: '.viewing-photo',
};

  return photoCardElement;
}

const cardEventListeners = (photoCard, {...rest}) => {
  const card = photoCard;
  likeButtonListeners(card, rest); //добавит слушатель на конкретную карточку
  deleteButtonListeners(card, rest);

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


const imageClickListeners = (card, {...rest}) => {
  card.querySelector(rest.cardImage).addEventListener('click', function () {
    openPopup(popupViewingPhoto); //открывает попап из разметки

    //тут наверное нужна универсальная функция для закрытия по крестику, оверлею и эскейпу
    //.popup__close-button - этот класс у всех крестиков, на них можно сразу повесить слушатели
    //что-то типа функции-проверки на три события?
    viewingPhotoCloseButton.addEventListener('click', () => {
      //и нужно убрать слушатели с оверлея и эскейпа перед закрытием (или внутри функции закрытия?)
      //спаать хочу
      closePopup(popupViewingPhoto);
    });
  });
}

const addCardData = (photoCard, cardData, {...rest}) => {
  photoCard.querySelector(rest.cardTitle).textContent = cardData.name;
  photoCard.querySelector(rest.cardImage).src = cardData.link;
  photoCard.querySelector(rest.cardImage).alt = cardData.name;
}

const addViewImageData = (photoCard, cardData, {...rest}) => { //текущая карточка, заголовок и ссылка, первый объект
    const photo = rest.popupViewingPhoto.querySelector('.viewing-photo__image');
    const figcaption = rest.popupViewingPhoto.querySelector('.viewing-photo__figcaption');
    photo.src = cardData.link;
    photo.alt = cardData.name;
    figcaption.textContent = cardData.name;
}

const addPhotoCard = (cardData, cardContainer) => {
  const card = createPhotoCard(cardData);
  cardContainer.prepend(card); //добавляем готовую карточку в разметку вперед дочерних элементов
};


{
  popupPhotoСard: '#add-photo-card', //это контейнер формы-попапа в разметке
  cardTitle: '#popup-photo-title ',
  cardImage: '#popup-photo-subtitle',  //это поля формы, которые заполнят
  photoCardPlace: '.photo-grid__list', //место в разметке для новых карточек


}


//название функции
photoCardAddButton.addEventListener('click', () => { //profile__button-add (уникальный селектор) это элемент блока профиль, открывает форму доб картинок
  popupForm.reset();
  openPopup(popupPhotoСard);
});
//
const submitListener = ({...rest}) => {
    rest.popupPhotoСard.addEventListener('submit', () => {
    const name = cardTitle.value; //берем значения из полей заполненной формы
    const link = cardImage.value;
    addPhotoCard({name, link}, photoCardPlace); //photoCardPlace это контейнер в разметке
    submitForm(popupPhotoСard); //закрываем заполненную форму
  });
}

//универсальная функция? или добавить слушатели при создании карточки?
popupCloseButton.addEventListener('click', () => {
  closePopup(popupPhotoСard);
});


