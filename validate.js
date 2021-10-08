export const enableValidation = ({...rest}) => {
  formEventListeners(rest);
};

// inputErrorClass: 'popup__item_type_error',
// errorClass: 'popup__error_visible'


//добавляем функцию для показа ошибки
const showInputError = (input, errorElement, errorMessage, {...rest}) => {
  input.classList.add(rest.inputErrorClass);  //показываем сообщение об ошибке
  errorElement.classList.add(rest.errorClass);
  errorElement.textContent = errorMessage;
};
//добавляем функцию для удаления ошибки
const hideInputError = (input, errorElement, {...rest}) => {
  input.classList.remove(rest.inputErrorClass);  //скрываем стилизацию подчеркивания
  errorElement.classList.remove(rest.errorClass); //и текста ошибки
  errorElement.textContent = ''; //ресет() возможно лучше подойдет. наверное в отд.функцию вынести и вызывать здесь и в закрытии формы
};

// Функция, которая проверяет валидность поля
const isValid = (form, input, {...rest}) => {
  // Выбираем элемент ошибки на основе уникального класса
  const errorElement = form.querySelector(`.${input.id}-error`);
  if (!input.validity.valid) {
    showInputError(input, errorElement, input.validationMessage, rest); // Если поле не проходит валидацию, покажем ошибку
  } else {
    hideInputError(input, errorElement, rest); // Если проходит, скроем
  }
};

//создадим функцию для добавления слушателей событий всем полям ввода внутри формы
//вместо добавления слушателя на одно поле ввода - formInput.addEventListener('input', isValid)
const inputEventListeners = (form, {...rest}) => {
  const inputList = Array.from(form.querySelectorAll(rest.inputSelector));  //делаем массив полей формы
  const button = form.querySelector(rest.submitButtonSelector);  //находим кнопку в разметке
    toggleButtonState(inputList, button, rest);  //вызываем функцию в первый раз, чтобы заблокировать кнопку еще до ввода данных в поля
  inputList.forEach((input) => {  //обходим все элементы полученного массива
    input.addEventListener('input', () => {  //каждому полю добавим обработчик события input с коллбеком, вызывающим проверку
      isValid(form, input, rest);
      toggleButtonState(inputList, button, rest);  //еще раз вызовем toggleButtonState, чтобы сверять состояние кнопки при каждом изменении полей ввода
    });
  });
};

//создадим функцию, принимающую массив полей, и возвращающую true, если один из инпутов невалиден
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => { //проверка на валидность, если проверяемое поле не валидно, колбэк вернёт true обход массива прекратится
    return !inputElement.validity.valid; //hasInvalidInput вернёт true
  })
};

//создадим функцию, активирующую кнопку
const toggleButtonState = (inputList, button, {...rest}) => {  //принимает массив полей и элемент кнопку
  if (hasInvalidInput(inputList)) {  //если есть хотя бы один невалидный инпут
    button.classList.add(rest.inactiveButtonClass); //сделать кнопку неактивной
  } else {
    button.classList.remove(rest.inactiveButtonClass);
  }
};

const formEventListeners = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault(); //отключает поведение по-умолчанию
    });
    inputEventListeners(form, rest);
  });
};


