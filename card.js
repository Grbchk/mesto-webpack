import { openPopup, submitEvent, popupCloseButtonListeners} from './popup.js';
export { addPhotoCard, addCardButtonListeners, popupPhotoCardListener};

const likeButtonListeners = (photoCard, {...rest}) => {
  photoCard.querySelector(rest.heartButton).addEventListener('click', function (evt) {
    const eventTarget = evt.target; //это чтобы состояние туда-сюда менялось при клике
    eventTarget.classList.toggle('photo-card__button-heart_active');
  });
}

const deleteButtonListeners = (photoCard, {...rest}) => {
  const button = photoCard.querySelector(rest.deleteButton);
  button.addEventListener('click', function () {  //можно ли сразу слушатель на deleteButton накладывать?
    const deletedCard = button.closest(rest.cardItem);
    deletedCard.remove(); //при клике на ведерко удалить ближ карточку, переименовать итем в кард
  });
}

const addCardButtonListeners = () => {
  const button = document.querySelector('.profile__button-add');
  const popup = document.querySelector('#add-photo-card');
  button.addEventListener('click', () => {
    openPopup(popup);
  });
}

const cardEventListeners = (photoCard, {...rest}) => {
  likeButtonListeners(photoCard, rest); //добавит слушатель на конкретную карточку
  deleteButtonListeners(photoCard, rest);
};

const addCardData = (image, photoCard, cardData, {...rest}) => {
  photoCard.querySelector(rest.cardTitle).textContent = cardData.name;
  image.src = cardData.link;
  image.alt = cardData.name;
}

const addViewImageData = (popup, cardData, {...rest}) => {
  const photo = popup.querySelector('.viewing-photo__image');
  const figcaption = popup.querySelector('.viewing-photo__figcaption');
  photo.src = cardData.link;
  photo.alt = cardData.name;
  figcaption.textContent = cardData.name;
}

const imageClickListeners = (image, cardData, {...rest}) => {
  const popup = document.querySelector(rest.popupViewingPhoto);
  image.addEventListener('click', function () {
    addViewImageData(popup, cardData, rest);  //добавляем данные в разметку попапа просмотра картинки
    popupCloseButtonListeners(popup);
    openPopup(popup); //открывает попап из разметки
  });
}

//заполняем темплейт (пустую новую карточку)
const createPhotoCard = (cardData, {...rest}) => {
  const photoCardTemplate = document.querySelector('#photo-card-template').content;//выбираем темплейт
  const photoCard = photoCardTemplate.querySelector(rest.cardItem).cloneNode(true); //клонировать всю структуру карточки
  const image = photoCard.querySelector(rest.cardImage)
  cardEventListeners(photoCard, rest); //слушатель на эту карточку
  addCardData(image, photoCard, cardData, rest); //данные этой карточки
  imageClickListeners(image, cardData, rest);  //добавляет слушатели картинкам, по клику на картинку открывается попап из разметки для просмотра картинки
  return photoCard;
}

const addPhotoCard = (cardData, {...rest}) => {
  const card = createPhotoCard(cardData, rest);
  document.querySelector(rest.photoCardPlace).prepend(card); //добавляем готовую карточку в разметку вперед дочерних элементов
};

const popupPhotoCardListener = ({...rest}) => { //вызываем из script.js
  const popup = document.querySelector(rest.popupPhotoСard);
  popupCloseButtonListeners(popup);
  const form = popup.querySelector(rest.photoCardForm);
  form.addEventListener('submit', () => {
    const title = document.querySelector(rest.popupTitle)
    const image = document.querySelector(rest.popupImageLink)
    const name = title.value; //берем значения из полей заполненной формы
    const link = image.value;
    addPhotoCard({name, link}, rest); //photoCardPlace это контейнер в разметке
    submitEvent(popup); //закрываем заполненную форму
  });
}


