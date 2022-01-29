import $ from 'jquery';

function handleInputKeydown(event) {
  const value = $(event.target).val();

  if (
    (event.key < '0' || event.key > '9' || value.match(/^\d{2}\.\d{2}\.\d{4}$/))
    && event.key !== 'ArrowLeft'
    && event.key !== 'ArrowRight'
    && event.key !== 'Delete'
    && event.key !== 'Backspace'
    && event.key !== 'Home'
    && event.key !== 'End'
  ) {
    event.preventDefault();
    return;
  }

  if (
    (value.match(/^\d{2}$/) || value.match(/^\d{2}\.\d{2}$/))
    && (event.key >= '0' && event.key <= '9')
  ) {
    $(event.target).val(`${value}.`);
  }
}

function handleInputKeyup(event) {
  const value = $(event.target).val();
  if (!value.match(/^(\d{1,2}|\d{0,2}\.\d{0,2}|\d{0,2}\.\d{0,2}\.\d{0,4})?$/)) {
    $(event.target).val(event.data.textField.value);
    return;
  }

  event.data.textField.setValue(value);

  if (
    value.match(/^\d{2}\.\d{2}\.\d{4}$/)
    && Number.isNaN(Date.parse(value.split('.').reverse().join('-')))
  ) {
    event.data.textField.$textField.addClass('text-field_invalid');
  } else {
    event.data.textField.$textField.removeClass('text-field_invalid');
  }
}

function handleInputChange(event) {
  const value = $(event.target).val();

  if (
    (
      value.match(/^\d{2}\.\d{2}\.\d{4}$/)
      && !Number.isNaN(Date.parse(value.split('.').reverse().join('-')))
    )
    || value === ''
  ) {
    event.data.textField.$textField.removeClass('text-field_invalid');
  } else {
    event.data.textField.$textField.addClass('text-field_invalid');
  }
}

class TextField {
  constructor(textField) {
    this.$textField = $(textField);
    this.value = '';
  }

  init() {
    ('.js-text-field__input', this.$textField).on(
      'keydown',
      null,
      { textField: this },
      handleInputKeydown,
    );

    ('.js-text-field__input', this.$textField).on(
      'keyup',
      null,
      { textField: this },
      handleInputKeyup,
    );

    ('.js-text-field__input', this.$textField).on(
      'change',
      null,
      { textField: this },
      handleInputChange,
    );
  }

  setValue(value) {
    this.value = value;
  }
}

$('.js-text-field').each((index, element) => {
  if (element.dataset.mask === 'date') {
    const textField = new TextField(element);
    textField.init();
  }
});
