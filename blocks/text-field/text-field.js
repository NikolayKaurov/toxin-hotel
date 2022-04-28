import $ from 'jquery';

function getPlaceholder(value) {
  const placeholder = 'ДД.ММ.ГГГГ'.split('');

  value.split('').forEach((symbol, index) => {
    placeholder[index] = symbol;
  });

  return placeholder.join('');
}

function isCorrectDate(days, month, year) {
  let daysTemp;

  if (days) {
    daysTemp = parseInt(days, 10);
  } else {
    daysTemp = 0;
  }

  let wrong = (days === '00') || daysTemp > 31;

  if (wrong) {
    return false;
  }

  let monthTemp;

  if (month) {
    monthTemp = parseInt(month, 10);
  } else {
    monthTemp = 0;
  }

  wrong = (month === '00') || monthTemp > 12;

  if (wrong) {
    return false;
  }

  const yearTooShort = !year
    || (year.length < 4 && year.match(/^(19|20)/))
    || year.length === 1
    || year.length === 3;

  let yearTemp;

  if (yearTooShort) {
    yearTemp = 0;
  } else if (year.length === 2) {
    if (parseInt(year, 10) < 30) {
      yearTemp = parseInt(`20${year}`, 10);
    } else {
      yearTemp = parseInt(`19${year}`, 10);
    }
  } else {
    yearTemp = parseInt(year, 10);
  }

  wrong = ((daysTemp > 29) && (monthTemp === 2))
    || ((daysTemp > 28) && (monthTemp === 2) && (yearTemp % 4 !== 0 || yearTemp === 1900));

  if (wrong) {
    return false;
  }

  wrong = (daysTemp === 31) && [4, 6, 9, 10].includes(monthTemp);

  return !wrong;
}

function handleInputPaste(event) {
  event.preventDefault();
}

function handleInputInput(event) {
  const input = event.target;
  const $input = $(event.target);

  let selectPos = input.selectionStart;

  let value = $input.val();

  const { preValue, $double } = event.data.textField;

  if (preValue.length > value.length) {
    if (!value.match(/^(\d{0,2}\.?|\d{0,2}\.\d{0,2}\.?|\d{0,2}\.\d{0,2}\.\d{0,4})$/)) {
      value = preValue;
    } else {
      value = value.replace(/\.$/, ''); // удалить точки в конце строки, если одна - одну
      value = value.replace(/\.$/, ''); // если 2 - обе
    }
    /* const dotHasBeenRemoved = preValue === `${value}.`;

    const numberAfterDotHasBeenRemoved = value.match(/\.$/)
      && value === preValue.slice(0, preValue.length - 1);

    if (dotHasBeenRemoved || numberAfterDotHasBeenRemoved) {
      value = value.slice(0, value.length - 1);
    } */
  } else if (!value.match(/^(\d{0,3}|\d{0,2}\.\d{1,3}|\d{0,2}\.\d{0,2}\.\d{1,4})$/)) {
    value = preValue;
    selectPos -= 1;
  } else {
    /* if (value.match(/^(\d{3}|\d{0,2}\.\d{3})$/)) {
      if (selectPos === value.length) {
        selectPos += 1;
      }
      value = `${value.slice(0, value.length - 1)}.${value[value.length - 1]}`;
    } */
    let days;
    let month;
    let year;

    if (value.match(/^\d{3}$/)) {
      days = value.slice(0, 2);
      month = value.slice(2);
    } else if (value.match(/^\d{0,2}\.\d{3}$/)) {
      [days, month] = value.slice(0, value.length - 1).split('.');
      year = value[value.length - 1];
    } else {
      [days, month, year] = value.split('.');
    }

    if (isCorrectDate(days, month, year)) {
      if (days) {
        if (days.match(/^[4-9]$/)) {
          days = `0${days}`;
        }
      }

      if (month) {
        if (month.match(/^[2-9]$/)) {
          month = `0${month}`;
        }
      }

      if (year) {
        const twoDigitYear = (year.length === 2) && (!year.match(/^(19|20)$/));
        if (twoDigitYear) {
          if (parseInt(year, 10) < 30) {
            year = parseInt(`20${year}`, 10);
          } else {
            year = parseInt(`19${year}`, 10);
          }
        }
      }

      const newValue = [];

      if (days !== undefined) {
        newValue.push(days);
      }

      if (month !== undefined) {
        newValue.push(month);
      }

      if (year !== undefined) {
        newValue.push(year);
      }

      value = newValue.join('.');
    } else {
      value = preValue;
      selectPos -= 1;
    }
    // console.log([days, month, year].join('.'));
  }
  /* else if (value.match(/^[4-9]$/)) {
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
  } */ /* else if (!value.match(/^(\d{1,2}|\d{2}\.\d{0,2}|\d{2}\.\d{2}\.\d{0,4})$/)) {
    value = preValue;
  } */

  $input.val(value);
  $double.attr('placeholder', getPlaceholder(value));

  input.setSelectionRange(selectPos, selectPos);

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
