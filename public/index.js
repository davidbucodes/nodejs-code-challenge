function validateForm() {
  const { 'santa-form': santaForm } = document.forms;
  const { name: nameInput, wish: wishInput } = santaForm;
  const { value: name } = nameInput;
  const { value: wish } = wishInput;

  if (wish.length > 100) {
    throw 'Wish is longer than 100 characters';
  }

  if (name.length > 100) {
    throw 'Name is longer than 100 characters';
  }
}
