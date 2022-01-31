import $ from 'jquery';

function getPlaceholder(value) {
  const placeholder = 'ДД.ММ.ГГГГ'.split('');
  value.split('').forEach((symbol, index) => {
    placeholder[index] = symbol;
  });
  return placeholder.join('');
}

function handleInputKeydown(event) {
  const value = $(event.target).val();

  if (
    (
      event.key < '0' || event.key > '9'
      || value.match(/^\d{2}\.\d{2}\.\d{4}$/)
      || (value === '0' && event.key === '0')
      || (value.match(/^\d{2}.0$/) && event.key === '0')
    )
    && event.key !== 'Backspace'
    && event.key !== 'Tab'
  ) {
    event.preventDefault();
    return;
  }

  if (
    (value.match(/^\d{2}\.\d$/))
    && (event.key === 'Backspace')
  ) {
    $(event.target).val(value.replace(/\./, ''));
  } else if (
    (value.match(/^\d{2}\.\d{2}\.\d$/))
    && (event.key === 'Backspace')
  ) {
    $(event.target).val(value.replace(/\.(?=\d$)/, ''));
  } else if (
    (value === '')
    && (event.key >= '4' && event.key <= '9')
  ) {
    $(event.target).val('0');
  } else if (
    (value === '3')
    && (event.key >= '2' && event.key <= '9')
  ) {
    $(event.target).val('03.0');
  } else if (
    (value.match(/^\d{2}$/))
    && (event.key >= '2' && event.key <= '9')
  ) {
    $(event.target).val(`${value}.0`);
  } else if (
    (value.match(/^\d{2}$/))
    && (event.key >= '0' && event.key <= '1')
  ) {
    $(event.target).val(`${value}.`);
  } else if (
    (value.match(/^\d{2}\.1$/))
    && (event.key >= '3' && event.key <= '9')
  ) {
    $(event.target).val(`${value.replace(/\.1$/, '.01.19')}`);
  } else if (
    (value.match(/^\d{2}\.\d{2}$/))
    && (event.key >= '1' && event.key <= '2')
  ) {
    $(event.target).val(`${value}.`);
  } else if (
    (value.match(/^\d{2}\.\d{2}$/))
    && (event.key >= '3' && event.key <= '9')
  ) {
    $(event.target).val(`${value}.19`);
  } else if (
    (value.match(/^\d{2}\.\d{2}$/))
    && (event.key === '0')
  ) {
    $(event.target).val(`${value}.20`);
  } else if (
    (value.match(/^\d{2}\.\d{2}\.1$/))
    && (event.key >= '0' && event.key <= '8')
  ) {
    $(event.target).val(`${value.replace(/\.1$/, '.201')}`);
  } else if (
    (value.match(/^\d{2}\.\d{2}\.2$/))
    && (event.key >= '1' && event.key <= '9')
  ) {
    $(event.target).val(`${value.replace(/\.2$/, '.202')}`);
  }
}

function handleInputInput(event) {
  const value = $(event.target).val();

  event.data.textField.$input_double.attr(
    'placeholder',
    getPlaceholder(value),
  );

  if (value.match(/^(\d{1,2}|\d{2}\.\d{0,2}|\d{2}\.\d{2}\.\d{0,4})?$/)) {
    event.data.textField.$textField.removeClass('text-field_invalid');
  } else {
    event.data.textField.$textField.addClass('text-field_invalid');
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
    this.$input = $('.js-text-field__input', this.$textField);
    this.$input_double = $();
  }

  init() {
    this.$input.attr('placeholder', '');

    this.$input.on(
      'keydown',
      null,
      { textField: this },
      handleInputKeydown,
    ).on(
      'input',
      null,
      { textField: this },
      handleInputInput,
    ).on(
      'change',
      null,
      { textField: this },
      handleInputChange,
    );

    $('.js-text-field__wrapper', this.$textField)
      .append(`<input
        class="js-text-field__input js-text-field__input_double text-field__input text-field__input_double"
        disabled
        placeholder="ДД.ММ.ГГГГ"
      >`);

    this.$input_double = $('.js-text-field__input_double', this.$textField);
  }
}

$('.js-text-field').each((index, element) => {
  if ($(element).hasClass('js-text-field_date')) {
    const textField = new TextField(element);
    textField.init();
  }
});
