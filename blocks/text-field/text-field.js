import $ from 'jquery';

class TextField {
  #$textField;

  constructor(textField) {
    this.#$textField = $(textField);
  }

  init() {
    $('.js-text-field__input', this.#$textField)
      .attr('placeholder', '')
      .on('input', null, { textField: this }, handleInputInput)
      .on('change focusout', null, { textField: this }, handleInputChange)
      .on('paste', handleInputPaste);

    const name = this.#$textField.data('name');

    $('.js-text-field__wrapper', this.#$textField)
      .append(`
        <input
          type="text"
          class="text-field__input text-field__input_double js-text-field__input_double"
          disabled
          placeholder="ДД.ММ.ГГГГ"
        >
        <input
          type="date"
          class="text-field__date js-text-field__date"
          name="${name}-date"
        >`);

    this.$double = $('.js-text-field__input_double', this.#$textField);
    this.$dateInput = $('.js-text-field__date', this.#$textField);

    this.preValue = '';
  }

  setPreValue(value) {
    this.preValue = value;
  }
}

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

  wrong = (daysTemp === 31) && [4, 6, 9, 11].includes(monthTemp);

  return !wrong;
}

function handleInputPaste(event) {
  event.preventDefault();
}

function handleInputInput(event) {
  const input = event.target;
  const $input = $(input);

  $input.removeClass('text-field__input_invalid');

  let selectPos = input.selectionStart;

  let value = $input.val();

  const { preValue, $double } = event.data.textField;

  if (preValue.length > value.length) {
    if (!value.match(/^(\d{0,2}\.?|\d{0,2}\.\d{0,2}\.?|\d{0,2}\.\d{0,2}\.\d{0,4})$/)) {
      value = preValue; // prevent deletion of dots within a string
    } else {
      value = value.replace(/\.$/, ''); // remove dots at the end of a string, if one - one
      value = value.replace(/\.$/, ''); // if 2 - both
    }
  } else if (!value.match(/^(\d{0,3}|\d{0,2}\.\d{1,3}|\d{0,2}\.\d{0,2}\.\d{1,4})$/)) {
    value = preValue; // prohibition of incorrect input
    selectPos -= 1;
  } else {
    let addPos = 0;

    // the number of the substring in which the digit has just been entered
    // 0 - day, 1 - month, 2 - year
    let lastEditedSubstring = (value.slice(0, selectPos).match(/\./g) || []).length;

    if (value.match(/^(3[2-9]|[4-9]\d)$/)) {
      value = `0${value}`;
      addPos += 1;
      lastEditedSubstring = 1;
    } else if (value.match(/^\d{0,2}\.(1[3-9]|[2-9]\d)$/)) {
      value = `${value.slice(0, value.length - 2)}0${value.slice(value.length - 2, value.length)}`;
      addPos += 1;
      lastEditedSubstring = 2;
    }

    let days;
    let month;
    let year;

    if (value.match(/^\d{3}$/)) {
      days = value.slice(0, 2);
      month = value.slice(2);

      addPos += 1;
      lastEditedSubstring = 1;
    } else if (value.match(/^\d{0,2}\.\d{3}$/)) {
      [days, month] = value.slice(0, value.length - 1).split('.');
      year = value[value.length - 1];

      addPos += 1;
      lastEditedSubstring = 2;
    } else {
      [days, month, year] = value.split('.');
    }

    if (isCorrectDate(days, month, year)) {
      if (year) {
        if (year.match(/^(0[1-9]?|1[0-8]|2[1-9]|[3-9]\d?)$/)) {
          if (lastEditedSubstring > 1) {
            addPos += 2;
          }
        }

        if (year.match(/^(0[1-9]?|1[0-8]|2[1-9])$/)) {
          year = `20${year}`;
        } else if (year.match(/^[3-9]\d?$/)) {
          year = `19${year}`;
        }
      }

      if (month) {
        if (month.match(/^[2-9]$/)) {
          month = `0${month}`;

          if (lastEditedSubstring > 0) {
            addPos += 1;
          }
        }
      }

      if (days) {
        if (days.match(/^[4-9]$/)) {
          days = `0${days}`;
          addPos += 1;
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
      selectPos += addPos;
    } else {
      value = preValue; // prevent wrong date input
      selectPos -= 1;
    }
  }

  $input.val(value);
  $double.attr('placeholder', getPlaceholder(value));

  input.setSelectionRange(selectPos, selectPos);

  event.data.textField.setPreValue(value);
}

function handleInputChange(event) {
  const $input = $(event.target);

  const value = $input.val();
  const dateValue = value.split('.').reverse().join('-');

  const { $dateInput } = event.data.textField;

  const correctValue = value.match(/^\d{2}\.\d{2}\.\d{4}$/)
    && !Number.isNaN(Date.parse(dateValue));

  const emptyValue = value === '';

  if (correctValue || emptyValue) {
    $input.removeClass('text-field__input_invalid');

    $dateInput.val(dateValue);
  } else {
    $input.addClass('text-field__input_invalid');
  }
}

$('.js-text-field_type_date').each((index, field) => {
  const textField = new TextField(field);
  textField.init();
});
