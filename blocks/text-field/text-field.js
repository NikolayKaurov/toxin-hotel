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

    return this;
  }

  setPreValue(value) {
    this.preValue = value;

    return this;
  }
}

function getPlaceholder(value) {
  const placeholder = 'ДД.ММ.ГГГГ'.split('');

  value.split('').forEach((symbol, index) => {
    placeholder[index] = symbol;
  });

  return placeholder.join('');
}

function isCorrectDate(options = {}) {
  const { days = '', month = '', year = '' } = options;

  const daysNumber = days !== ''
    ? parseInt(days, 10)
    : 0;

  const isCorrectDays = (days !== '00') && daysNumber < 32;

  if (!isCorrectDays) {
    return false;
  }

  const monthNumber = month !== ''
    ? parseInt(month, 10)
    : 0;

  const isCorrectMonth = (month !== '00') && monthNumber < 13;

  if (!isCorrectMonth) {
    return false;
  }

  const yearTooShort = (year === '')
    || (year.match(/^(19|20)$/) !== null)
    || year.length === 1
    || year.length === 3;

  const yearNumber = (() => {
    if (yearTooShort) {
      return 0;
    }

    if (year.length === 2) {
      if (parseInt(year, 10) < 30) {
        return parseInt(`20${year}`, 10);
      }

      return parseInt(`19${year}`, 10);
    }

    return parseInt(year, 10);
  })();

  const isCorrectFebruary = (monthNumber !== 2)
    || (daysNumber < 29)
    || ((daysNumber < 30) && (yearNumber % 4 === 0 && yearNumber !== 1900));

  if (!isCorrectFebruary) {
    return false;
  }

  return (daysNumber < 31) || ![4, 6, 9, 11].includes(monthNumber);
}

function handleInputPaste(event) {
  event.preventDefault();
}

function handleInputInput(event) {
  const input = event.target;
  const $input = $(input);

  // Deleting a character is considered correct if dots inside the string are not deleted.
  const correctIncompleteDeletion = /^(\d{0,2}\.?|\d{0,2}\.\d{0,2}\.?|\d{0,2}\.\d{0,2}\.\d{0,4})$/;

  const correctIncompleteInput = /^(\d{0,3}|\d{0,2}\.\d{1,3}|\d{0,2}\.\d{0,2}\.\d{1,4})$/;

  $input.removeClass('text-field__input_invalid');

  let selectPos = input.selectionStart;

  let value = $input.val();

  const { preValue, $double } = event.data.textField;

  if (preValue.length > value.length) {
    if (value.match(correctIncompleteDeletion) === null) {
      value = preValue; // prevent deletion of dots within a string
    } else {
      value = value.replace(/\.$/, ''); // remove dots at the end of a string, if one - one
      value = value.replace(/\.$/, ''); // if 2 - both
    }
  } else if (value.match(correctIncompleteInput) === null) {
    value = preValue; // prohibition of incorrect input
    selectPos -= 1;
  } else {
    const tooManyDaysRegExp = /^(3[2-9]|[4-9]\d)$/;
    const tooManyMonthsRegExp = /^\d{0,2}\.(1[3-9]|[2-9]\d)$/;
    const isFirstDigitMonthRegExp = /^\d{3}$/;
    const isFirstDigitYearRegExp = /^\d{0,2}\.\d{3}$/;

    const tooManyDays = value.match(tooManyDaysRegExp) !== null;
    const tooManyMonths = value.match(tooManyMonthsRegExp) !== null;
    const isFirstDigitMonth = value.match(isFirstDigitMonthRegExp) !== null;
    const isFirstDigitYear = value.match(isFirstDigitYearRegExp) !== null;

    const { length } = value;

    const days = (() => {
      if (tooManyDays) {
        return `0${value[0]}`;
      }

      if (isFirstDigitMonth) {
        return value.slice(0, 2);
      }

      return value.split('.')[0];
    })();

    const month = (() => {
      if (tooManyDays) {
        return value[1];
      }

      if (isFirstDigitMonth) {
        return value[2];
      }

      if (tooManyMonths) {
        return `0${value[length - 2]}`;
      }

      if (isFirstDigitYear) {
        return value.slice(length - 3, length - 1);
      }

      // the value 'undefined' will not result in an error
      return value.split('.')[1];
    })();

    const year = (() => {
      if (tooManyMonths || isFirstDigitYear) {
        return value[length - 1];
      }

      // the value 'undefined' will not result in an error
      return value.split('.')[2];
    })();

    if (isCorrectDate({ days, month, year })) {
      // the number of the substring in which the digit has just been entered
      // 0 - days, 1 - month, 2 - year
      const lastEditedSubstring = (() => {
        if (tooManyDays || isFirstDigitMonth) {
          return 1;
        }

        if (tooManyMonths || isFirstDigitYear) {
          return 2;
        }

        return (value.slice(0, selectPos).match(/\./g) ?? []).length;
      })();

      const needZeroToDays = days.match(/^[4-9]$/) !== null;

      const needZeroToMonth = month !== undefined
        ? month.match(/^[2-9]$/) !== null
        : false;

      const needTwoDigitsToYear = year !== undefined
        ? year.match(/^(0\d?|1[0-8]|2[1-9]|[3-9]\d?)$/) !== null
        : false;

      const newValue = [];

      newValue.push(needZeroToDays ? `0${days}` : days);

      if (month !== undefined) {
        newValue.push(needZeroToMonth ? `0${month}` : month);
      }

      if (year !== undefined) {
        if (needTwoDigitsToYear) {
          if (year.match(/^[3-9]\d?$/) !== null) {
            newValue.push(`19${year}`);
          } else {
            newValue.push(`20${year}`);
          }
        } else {
          newValue.push(year);
        }
      }

      const addPosition = (() => {
        // just a list of all possible options

        if (lastEditedSubstring === 0) {
          if (needZeroToDays) {
            return 1;
          }

          return 0;
        }

        if (lastEditedSubstring === 1) {
          if (tooManyDays && needZeroToMonth) {
            return 3;
          }

          if (tooManyDays) {
            return 2;
          }

          if (isFirstDigitMonth && needZeroToMonth) {
            return 2;
          }

          if (isFirstDigitMonth) {
            return 1;
          }

          if (needZeroToDays && needZeroToMonth) {
            return 2;
          }

          if (needZeroToDays || needZeroToMonth) {
            return 1;
          }

          return 0;
        }

        const total = tooManyMonths && needZeroToDays && needTwoDigitsToYear;

        if (total) {
          return 5;
        }

        if (tooManyMonths && needZeroToDays) {
          return 3;
        }

        if (tooManyMonths && needTwoDigitsToYear) {
          return 4;
        }

        if (tooManyMonths) {
          return 2;
        }

        const secondTotal = isFirstDigitYear && needZeroToDays && needTwoDigitsToYear;

        if (secondTotal) {
          return 4;
        }

        if (isFirstDigitYear && needZeroToDays) {
          return 2;
        }

        if (isFirstDigitYear && needTwoDigitsToYear) {
          return 3;
        }

        if (isFirstDigitYear) {
          return 1;
        }

        const thirdTotal = needZeroToDays && needZeroToMonth && needTwoDigitsToYear;

        if (thirdTotal) {
          return 4;
        }

        if (needZeroToDays && needZeroToMonth) {
          return 2;
        }

        if (needZeroToDays && needTwoDigitsToYear) {
          return 3;
        }

        if (needZeroToMonth && needTwoDigitsToYear) {
          return 3;
        }

        if (needZeroToDays || needZeroToMonth) {
          return 1;
        }

        if (needTwoDigitsToYear) {
          return 2;
        }

        return 0;
      })();

      value = newValue.join('.');
      selectPos += addPosition;
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

  const isCorrectValue = value.match(/^\d{2}\.\d{2}\.\d{4}$/)
    && !Number.isNaN(Date.parse(dateValue));

  const isEmptyValue = value === '';

  if (isCorrectValue || isEmptyValue) {
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
