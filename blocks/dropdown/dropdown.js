import $ from 'jquery';

const pressingTime = 500;
const changeInterval = 75;

const maxNumberItems = 99;

const deleteKey = 46;
const backspaceKey = 8;
const zeroKey = 48;
const nineKey = 57;

class Dropdown {
  $dropdown;

  $drop;

  $quantities;

  $clear;

  $confirm;

  constructor(dropdown) {
    this.$dropdown = $(dropdown);
  }

  init() {
    this.$dropdown
      .on('mousedown', { dropdown: this }, handleDropdownMousedown)
      .on('input', { dropdown: this }, handleDropdownInput)
      .on('focusin', { dropdown: this }, handleDropdownFocusin);

    this.$drop = $('.js-dropdown__drop', this.$dropdown);

    this.$quantities = $('.js-dropdown__quantity', this.$dropdown);

    $('.js-dropdown__item', this.$dropdown).each((index, item) => {
      const $item = $(item);

      const $quantity = $('.js-dropdown__quantity', $item)
        .on('keydown', handleQuantityKeydown)
        .val('');

      const $minus = $('.js-dropdown__counter-button_action_minus', $item)
        .on('mousedown', { $quantity }, handleMinusMousedown);

      const $plus = $('.js-dropdown__counter-button_action_plus', $item)
        .on('mousedown', { $quantity }, handlePlusMousedown);

      $quantity
        .on('input', { $minus, $plus }, handleQuantityInput);

      $('.js-dropdown__counter-button', $item)
        .on('mouseup mouseout focusout', { $quantity }, handleCounterButtonMouseup);
    });

    $('.js-dropdown__down', this.$dropdown)
      .on('mousedown', stop);

    this.$clear = $('.js-dropdown__button_action_clear', this.$dropdown)
      .on('mousedown', { dropdown: this }, handleClearMousedown);

    this.$confirm = $('.js-dropdown__button_action_confirm', this.$dropdown)
      .on('mousedown', { dropdown: this }, handleConfirmMousedown);

    return this;
  }
}

function handleDropdownMousedown(event) {
  const { $dropdown } = event.data.dropdown;

  $dropdown.toggleClass('dropdown_open');

  event.stopPropagation();
}

function handleDropdownFocusin(event) {
  const { dropdown } = event.data;
  const { $dropdown } = dropdown;

  const close = (eventIN) => {
    const { close: closeIN, dropdown: dropdownIN } = eventIN.data;
    const { $dropdown: $dropdownIN } = dropdownIN;

    if ($dropdownIN.hasClass('dropdown_just-now-focused')) {
      $dropdownIN.removeClass('dropdown_just-now-focused');
      return;
    }

    $dropdownIN.removeClass('dropdown_open');

    $(window).off('focusin focusout mousedown', closeIN);

    $dropdownIN
      .off('focusin focusout', stop)
      .on('focusin', { dropdown: dropdownIN }, handleDropdownFocusin);
  };

  $dropdown.addClass('dropdown_open dropdown_just-now-focused');

  $(window).on('focusin focusout mousedown', { dropdown, close }, close);

  $dropdown
    .off('focusin', handleDropdownFocusin)
    .on('focusin focusout', stop);
}

function handleDropdownInput(event) {
  const { dropdown } = event.data;
  const {
    $drop,
    $quantities,
    $clear,
    $confirm,
  } = dropdown;

  const quantities = $quantities.get();

  let isEmpty = true;
  let isEnough = true;

  quantities.reduceRight((previous, input) => {
    const $input = $(input);

    const quantity = $input.attr('data-quantity');
    const surplus = $input.attr('data-surplus');
    const nominative = $input.attr('data-nominative');
    const genitive = $input.attr('data-genitive');
    const genitivePlural = $input.attr('data-genitive-plural');
    const min = parseInt($input.attr('data-min'), 10);

    const thisValue = parseInt(quantity, 10);

    if (thisValue > 0) {
      isEmpty = false;
    }

    if (thisValue < min) {
      isEnough = false;
    }

    const value = thisValue + previous;

    if (surplus !== undefined) {
      return value;
    }

    const lastTwoDigits = value % 100;
    const lastDigit = value % 10;

    const genitivePluralValue = (lastTwoDigits > 4 && lastTwoDigits < 21)
      || lastDigit > 4
      || lastDigit === 0;

    if (value === 0) {
      $input.attr('data-value', '');
    } else if (genitivePluralValue) {
      $input.attr('data-value', `${value} ${genitivePlural}`);
    } else if (lastDigit === 1) {
      $input.attr('data-value', `${value} ${nominative}`);
    } else {
      $input.attr('data-value', `${value} ${genitive}`);
    }

    return 0;
  }, 0);

  let numberItems = 0;

  const common = quantities.reduce((previous, input) => {
    const $input = $(input);
    const value = $input.attr('data-value');

    if (value !== '') {
      numberItems += 1;

      if (numberItems === maxNumberItems + 1) {
        return `${previous}...`;
      }

      if (numberItems > maxNumberItems + 1) {
        return previous;
      }
    }

    if (value !== '' && previous !== '') {
      return `${previous}, ${value}`;
    }

    return `${previous}${value}`;
  }, '');

  if (common !== '') {
    $drop.text(common);
  } else {
    $drop.text($drop.attr('data-placeholder'));
  }

  $clear.prop('disabled', isEmpty);
  $confirm.prop('disabled', !isEnough);
}

function handleMinusMousedown(event) {
  const { $quantity } = event.data;
  const $button = $(event.target);

  minus($quantity);

  if (parseInt($quantity.val(), 10) > 0) {
    const timerID = setTimeout(
      fastMinus,
      pressingTime,
      $quantity,
      $button,
    );

    $button.attr('data-timer-id', timerID);
  }
}

function handlePlusMousedown(event) {
  const { $quantity } = event.data;
  const $button = $(event.target);
  const max = parseInt($quantity.attr('max'), 10);

  plus($quantity);

  if (parseInt($quantity.val(), 10) < max) {
    const timerID = setTimeout(
      fastPlus,
      pressingTime,
      $quantity,
      $button,
    );

    $button.attr('data-timer-id', timerID);
  }
}

function handleCounterButtonMouseup(event) {
  const timerID = parseInt($(event.target).attr('data-timer-id'), 10);

  clearTimeout(timerID);
  clearInterval(timerID);
}

function handleQuantityInput(event) {
  const $input = $(event.target);
  const { $minus, $plus } = event.data;

  const previous = parseInt($input.attr('data-previous'), 10);

  const valusString = $input.val();

  const valueNumber = parseInt(valusString, 10) || 0;

  const max = $input.attr('max');

  const isCorrect = valusString.match(/^\d{0,2}$/)
    && valueNumber <= max
    && valueNumber >= 0;

  if (!isCorrect) {
    if (previous > 0) {
      $input.val(previous);
    } else {
      $input.val('');
    }
    return;
  }

  $input.val(valusString.replace(/^0*/, ''));

  $input
    .attr('data-quantity', valueNumber)
    .attr('data-previous', valueNumber);

  $minus.prop('disabled', !(valueNumber > 0));

  $plus.prop('disabled', !(valueNumber < max));

  if (valueNumber < 1) {
    const timerID = parseInt($minus.attr('data-timer-id'), 10);

    clearTimeout(timerID);
    clearInterval(timerID);
  } else if (valueNumber >= max) {
    const timerID = parseInt($plus.attr('data-timer-id'), 10);

    clearTimeout(timerID);
    clearInterval(timerID);
  }
}

function handleQuantityKeydown(event) {
  const $input = $(event.target);
  const { keyCode } = event;

  const max = $input.attr('max');

  let valueString = $input.val();

  if (keyCode === backspaceKey || keyCode === deleteKey) {
    event.preventDefault();

    $input.val(valueString.replace(/.$/, ''));
    $input.trigger('input');
  } else if (keyCode >= zeroKey && keyCode <= nineKey) {
    event.preventDefault();

    const digit = keyCode - zeroKey;

    valueString = `${valueString}${digit}`;
    let valueNumber = parseInt(valueString, 10);

    let isCorrect = valueString.match(/^\d{0,2}$/)
      && valueNumber <= max
      && valueNumber >= 0;

    if (!isCorrect) {
      if (valueString.length > 1) {
        valueString = valueString.replace(/^./, '');
        valueNumber = parseInt(valueString, 10);

        isCorrect = valueString.match(/^\d{0,2}$/)
          && valueNumber <= max
          && valueNumber >= 0;

        if (!isCorrect) {
          if (valueString.length > 1) {
            valueString = valueString.replace(/^./, '');
            valueNumber = parseInt(valueString, 10);

            isCorrect = valueString.match(/^\d{0,2}$/)
              && valueNumber <= max
              && valueNumber >= 0;

            if (!isCorrect) {
              return;
            }
          } else {
            return;
          }
        }
      } else {
        return;
      }
    }

    $input.val(valueString);
    $input.trigger('input');
  }
}

function handleClearMousedown(event) {
  const { $dropdown, $quantities } = event.data.dropdown;

  $quantities.each((index, input) => {
    const $input = $(input);

    $input
      .val('')
      .triggerHandler('input');
  });

  $dropdown.trigger('input');
}

function handleConfirmMousedown(event) {
  const { $dropdown } = event.data.dropdown;

  $dropdown.removeClass('dropdown_open');
}

function minus($input) {
  const value = parseInt($input.val(), 10);

  if (value > 0) {
    $input.val(value - 1);
  }

  $input.trigger('input');
}

function plus($input) {
  const value = parseInt($input.val(), 10) || 0;

  const max = $input.attr('max');

  if (value < max) {
    $input.val(value + 1);
  }

  $input.trigger('input');
}

function fastMinus($input, $button) {
  const timerID = setInterval(minus, changeInterval, $input);

  $button.attr('data-timer-id', timerID);
}

function fastPlus($input, $button) {
  const timerID = setInterval(plus, changeInterval, $input);

  $button.attr('data-timer-id', timerID);
}

function stop(event) {
  event.stopPropagation();
}

$('.js-dropdown').each((index, dropdown) => {
  const jsDropdown = new Dropdown(dropdown);
  jsDropdown.init();
});
