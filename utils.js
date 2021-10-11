//утилитарные функции, которые используются в работе сразу нескольких других функций
export { resetError, resetButton };

const resetError = (form, {...rest}) => {
  const inputList = Array.from(form.querySelectorAll(rest.inputSelector));
  inputList.forEach((input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(rest.inputErrorClass);
    errorElement.classList.remove(rest.errorClass);
    errorElement.textContent = '';
  });
}

const resetButton = (form, {...rest}) => {
  const button = form.querySelector(rest.submitButtonSelector);  //находим кнопку в разметке
  const popupProfile = document.querySelector('#add-profile');
  const profileButton = popupProfile.querySelector(rest.submitButtonSelector);
  if (button !== profileButton) {
    button.classList.add(rest.inactiveButtonClass);
  } else {
    button.classList.remove(rest.inactiveButtonClass);
  }
}

