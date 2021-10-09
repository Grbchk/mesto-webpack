import { formSelectors } from './selectors.js';
import { hideInputError } from './utils.js';
export { openPopup, closePopup, submitEvent, popupCloseButtonListeners};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');

  //установить слушатели еск и оверлея
};

const resetPopup = (popup) => {
  const form = popup.querySelector('.popup__form');
  const item = form.querySelector('.popup__item');  //
  const errorElement = form.querySelector(`.${item.id}-error`);
  hideInputError(item, errorElement, formSelectors);
  form.reset();
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  resetPopup(popup);
  //снять слушатели с еск и оверлея
};

const submitEvent = (popup) => {
  event.preventDefault(); //сбрасывает поведение по-умолчанию
  closePopup(popup); //закрывает попап после нажатия кнопки (события сабмит)
};

const popupCloseButtonListeners = (popup) => {
  popup.querySelector('.popup__close-button').addEventListener('click', () => {
  closePopup(popup);
  });
}
