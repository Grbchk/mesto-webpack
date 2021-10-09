//утилитарные функции, которые используются в работе сразу нескольких других функций


//добавляем функцию для удаления ошибки
export const hideInputError = (input, errorElement, {...rest}) => {
  input.classList.remove(rest.inputErrorClass);  //скрываем стилизацию подчеркивания
  errorElement.classList.remove(rest.errorClass); //и текста ошибки
  errorElement.textContent = ''; //ресет() возможно лучше подойдет. наверное в отд.функцию вынести и вызывать здесь и в закрытии формы
};

//как-то автоматизировать .querySelector?
