import $ from 'jquery';

function getPlaceholder(value) {
  const placeholder = 'ДД.ММ.ГГГГ'.split('');

  value.split('').forEach((symbol, index) => {
    placeholder[index] = symbol;
  });

  return placeholder.join('');
}

/*
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
*/

function handleInputPaste(event) {
  event.preventDefault();
}

function handleInputInput(event) {
  const $input = $(event.target);

  let value = $input.val();

  const { preValue, $double } = event.data.textField;

  if (preValue.length > value.length) {
    const dotHasBeenRemoved = preValue === `${value}.`;

    const numberAfterDotHasBeenRemoved = value.match(/\.$/)
      && value === preValue.slice(0, preValue.length - 1);
    /* if (value.match(/^(\d{2}|\d{2}\.\d{2})$/)) {
      value = value.replace(/\d$/, '');
    }
    value = value.replace(/\.$/, ''); */
    if (dotHasBeenRemoved || numberAfterDotHasBeenRemoved) {
      value = value.slice(0, value.length - 1);
    }
  } else if (value.match(/^[4-9]$/)) {
    value = `0${value}.`;
  } else if (value.match(/^(0[1-9]|[12]\d|3[01])$/)) {
    value = `${value}.`;
  } else if (value.match(/^[3-9][2-9]$/)) {
    value = `0${value[0]}.0${value[1]}.`;
  } else if (value.match(/^[4-9][01]$/)) {
    value = `0${value[0]}.${value[1]}.`;
  } else if (value === '00') {
    value = '0';
  } else if (value.match(/^\d{2}[01]$/)) {
    value = `${value[0]}${value[1]}.${value[2]}`;
  } else if (value.match(/^\d{2}[2-9]$/)) {
    value = `${value[0]}${value[1]}.0${value[2]}.`;
  } else if (value.match(/^\d{2}\.[2-9]$/)) {
    value = `${value[0]}${value[1]}.0${value[3]}.`;
  } else if (value.match(/^\d{2}\.00$/)) {
    value = value.replace(/0$/, '');
  } else if (value.match(/^\d{2}\.(0\d|1[0-2])$/)) {
    value = `${value}.`;
  } else if (value.match(/^\d{2}\.[1-9][3-9]$/)) {
    value = `${value.slice(0, 3)}0${value[3]}.19${value[4]}`;
  } else if (value.match(/^\d{2}\.[2-9][0-2]$/)) {
    value = `${value.slice(0, 3)}0${value[3]}.20${value[4]}`;
  } else if (value.match(/^\d{2}\.\d{2}\.0$/)) {
    value = `${value.slice(0, 6)}200`;
  } else if (value.match(/^\d{2}\.\d{2}\.[3-9]$/)) {
    value = `${value.slice(0, 6)}19${value[6]}`;
  } else if (value.match(/^\d{2}\.\d{2}0$/)) {
    value = `${value.slice(0, 5)}.200`;
  } else if (value.match(/^\d{2}\.\d{2}[3-9]$/)) {
    value = `${value.slice(0, 5)}.19${value[5]}`;
  } else if (value.match(/^\d{2}\.\d{2}[12]$/)) {
    value = `${value.slice(0, 5)}.${value[5]}`;
  } else if (value.match(/^\d{2}\.\d{2}\.(2[1-9]|1[0-8])$/)) {
    value = `${value.slice(0, 6)}20${value[6]}${value[7]}`;
  } else if (!value.match(/^(\d{1,2}|\d{2}\.\d{0,2}|\d{2}\.\d{2}\.\d{0,4})$/)) {
    value = preValue;
  }

  $input.val(value);
  $double.attr('placeholder', getPlaceholder(value));

  event.data.textField.setPreValue(value);

  /* event.data.textField.$input_double.attr(
    'placeholder',
    getPlaceholder(value),
  );

  if (
    value.match(/^(\d{1,2}|\d{2}\.\d{0,2}|\d{2}\.\d{2}\.\d{0,3})?$/)
    || (
      value.match(/^\d{2}\.\d{2}\.\d{4}$/)
      && !Number.isNaN(Date.parse(value.split('.').reverse().join('-')))
    )
  ) {
    event.data.textField.$textField.removeClass('text-field_invalid');
  } else {
    event.data.textField.$textField.addClass('text-field_invalid');
  } */
}

function handleInputChange(event) {
  const $input = $(event.target);

  const value = $input.val();

  const correctValue = value.match(/^\d{2}\.\d{2}\.\d{4}$/)
    && !Number.isNaN(Date.parse(value.split('.').reverse().join('-')));

  const emptyValue = value === '';

  if (correctValue || emptyValue) {
    $input.removeClass('text-field__input_invalid');
  } else {
    $input.addClass('text-field__input_invalid');
  }
}

class TextField {
  constructor(textField) {
    this.$textField = $(textField);
  }

  init() {
    $('.js-text-field__input', this.$textField)
      .attr('placeholder', '')
      .on('input', null, { textField: this }, handleInputInput)
      .on('change', null, { textField: this }, handleInputChange)
      .on('paste', handleInputPaste);

    $('.js-text-field__wrapper', this.$textField)
      .append(`<input
          type="text"
          class="text-field__input text-field__input_double js-text-field__input js-text-field__input_double"
          disabled
          placeholder="ДД.ММ.ГГГГ"
        >`);

    this.$double = $('.js-text-field__input_double', this.$textField);

    this.preValue = '';
  }

  setPreValue(value) {
    this.preValue = value;
  }
}

$('.js-text-field_mask_date').each((index, element) => {
  const textField = new TextField(element);
  textField.init();
});
