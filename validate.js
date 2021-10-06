export const enableValidation = ({...rest}) => {
  formEventListeners(rest);
};




//добавляем функцию для показа ошибки
const showInputError = (input, errorElement, errorMessage, {...rest}) => {
  input.classList.add(rest.inputErrorClass);  //показываем сообщение об ошибке
  errorElement.classList.add(rest.errorClass);
  errorElement.textContent = errorMessage;
};
//добавляем функцию для удаления ошибки
const hideInputError = (input, errorElement, {...rest}) => {
  input.classList.remove(rest.inputErrorClass);  //скрываем сообщение об ошибке
  errorElement.classList.remove(rest.errorClass);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (form, input, {...rest}) => {
  // Выбираем элемент ошибки на основе уникального класса
  const errorElement = form.querySelector(`.${input.id}-error`); //(может лэт?)
  if (!input.validity.valid) {
    showInputError(input, errorElement, input.validationMessage, rest); // Если поле не проходит валидацию, покажем ошибку
  } else {
    hideInputError(input, errorElement, rest); // Если проходит, скроем
  }
};

//создадим функцию setEventListener для добавления слушателей событий всем полям ввода внутри формы
//вместо добавления слушателя на одно поле ввода - formInput.addEventListener('input', isValid)
const inputEventListeners = (form, {...rest}) => {
  console.log('from input: ', form);
  const inputList = Array.from(form.querySelectorAll(rest.inputSelector));  //делаем массив полей формы
  console.log('from input inputList: ', inputList);
  const buttonElement = form.querySelector(rest.submitButtonSelector);  //находим кнопку в разметке
    toggleButtonState(inputList, buttonElement, rest);  //вызываем функцию в первый раз, чтобы заблокировать кнопку еще до ввода данных в поля
  inputList.forEach((input) => {  //обходим все элементы полученного массива
    input.addEventListener('input', () => {  //каждому полю добавим обработчик события input с коллбеком, вызывающим проверку
      isValid(form, input, rest);
      toggleButtonState(inputList, buttonElement, rest);  //внутри обработчика события input, после вызова isValid, еще раз вызовем toggleButtonState, чтобы сверять состояние кнопки при каждом изменении полей ввода
    });
  });
};

//создадим функцию, принимающую массив полей, и возвращающую true, если один из инпутов невалиден
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => { //проверка на валидность, если проверяемое поле не валидно, колбэк вернёт true обход массива прекратится
    return !inputElement.validity.valid; //и вся фунцкция и hasInvalidInput вернёт true
  })
};

//создадим функцию, активирующую кнопку
const toggleButtonState = (inputList, buttonElement, {...rest}) => {  //принимает массив полей и элемент кнопку
  console.log('from button: ', buttonElement);
  if (hasInvalidInput(inputList)) {  //если есть хотя бы один невалидный инпут
    buttonElement.classList.add(rest.inactiveButtonClass); //сделать кнопку неактивной
  } else {
    buttonElement.classList.remove(rest.inactiveButtonClass);
  }
};

const formEventListeners = ({formSelector, ...rest}) => {
  console.log('from form: ', formSelector, rest);
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((form) => {
    console.log('first form: ', form);
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    inputEventListeners(form, rest);  //для каждой формы вызовем функцию setEventListeners, передав ей текущую форму
  });
};






// // Функция, которая добавляет класс с ошибкой
// const showInputError = (element) => {
//   element.classList.add('form__input_type_error');
// };
// // Функция, которая удаляет класс с ошибкой
// const hideInputError = (element) => {
//   element.classList.remove('form__input_type_error');
// };
// // Функция, которая проверяет валидность поля
// const isValid = (formElement, inputElement) => {
//   // Выбираем элемент ошибки на основе уникального класса
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   if (!formInput.validity.valid) {
//     showInputError(inputElement, errorElement, inputElement.validationMessage); // Если поле не проходит валидацию, покажем ошибку
//   } else {
//     hideInputError(inputElement, errorElement); // Если проходит, скроем
//   }
// };

// //добавляем функцию для показа ошибки
// const showInputError = (inputElement, errorElement, errorMessage) => {
//   inputElement.classList.add('form__input_type_error');  //показываем сообщение об ошибке
//   errorElement.classList.add('form__input-error_active');
//   errorElement.textContent = errorMessage;
// };
// //добавляем функцию для удаления ошибки
// const hideInputError = (inputElement, errorElement) => {
//   inputElement.classList.remove('form__input_type_error');  //скрываем сообщение об ошибке
//   errorElement.classList.remove('form__input-error_active');
//   errorElement.textContent = '';
// };

// //создадим функцию setEventListener для добавления слушателей событий всем полям ввода внутри формы
// //вместо добавления слушателя на одно поле ввода - formInput.addEventListener('input', isValid)
// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll('.form__input'));  //делаем массив полей формы
//   inputList.forEach((inputElement) => {  //обходим все элементы полученного массива
//     inputElement.addEventListener('input', () => {  //каждому полю добавим обработчик события input с коллбеком, вызывающим проверку
//       isValid(formElement, inputElement)
//     });
//   });
// };

// const formValidation = (formSelector, ...rest) => {
//   const formList = Array.from(document.querySelectorAll(formSelector));
//   formList.forEach((form) => {
//     form.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(form);  //для каждой формы вызовем функцию setEventListeners, передав ей текущую форму
//   });
// };
