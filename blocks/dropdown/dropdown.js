import $ from 'jquery';

const pressingTime = 500; // время зажатия кнопки счётчика
const changeInterval = 75; // интервал изменения счётчика при зажатой кнопке

// Количество элементов в общей строке: '3 гостя, 1 младенец' - 2 элемента
const maxNumberItems = 99;

class Dropdown {
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

    this.firstQuantity = this.$quantities.get(0);

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
        .on('mouseup mouseout', { $quantity }, handleCounterButtonMouseup);
    });

    $('.js-dropdown__down', this.$dropdown)
      .on('mousedown', stop);

    this.$clear = $('.js-dropdown__button_action_clear', this.$dropdown)
      .on('mousedown', { dropdown: this }, handleClearMousedown);

    this.$confirm = $('.js-dropdown__button_action_confirm', this.$dropdown)
      .on('mousedown', { dropdown: this }, handleConfirmMousedown);
  }
}

function handleDropdownMousedown(event) {
  const { $dropdown } = event.data.dropdown;

  $dropdown.toggleClass('dropdown_open');

  event.stopPropagation();
}

function handleDropdownFocusin(event) {
  const { dropdown } = event.data;
  const { $dropdown, firstQuantity } = dropdown;

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

  firstQuantity.focus();
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

  let empty = true;
  let enough = true;

  let numberItems = 0;

  quantities.reduceRight((previous, input) => {
    const $input = $(input);

    const quantity = $input.attr('data-quantity');
    const surplus = $input.attr('data-surplus');
    const nominative = $input.attr('data-nominative');
    const genitive = $input.attr('data-genitive');
    const genitivePlural = $input.attr('data-genitivePlural');
    const min = parseInt($input.attr('data-min'), 10);

    let value = parseInt(quantity, 10);

    if (value > 0) {
      empty = false;
    }

    if (value < min) {
      enough = false;
    }

    value += previous;

    if (surplus === 'surplus') {
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

  $clear.prop('disabled', empty);
  $confirm.prop('disabled', !enough);
}

function handleMinusMousedown(event) {
  const { $quantity } = event.data;
  const $button = $(event.target);

  minus($quantity);

  const timerID = setTimeout(
    fastMinus,
    pressingTime,
    $quantity,
    $button,
  );

  $button.attr('data-timerID', timerID);
}

function handlePlusMousedown(event) {
  const { $quantity } = event.data;
  const $button = $(event.target);

  plus($quantity);

  const timerID = setTimeout(
    fastPlus,
    pressingTime,
    $quantity,
    $button,
  );

  $button.attr('data-timerID', timerID);
}

function handleCounterButtonMouseup(event) {
  const timerID = parseInt($(event.target).attr('data-timerID'), 10);

  clearTimeout(timerID);
  clearInterval(timerID);
}

function handleQuantityInput(event) {
  const $input = $(event.target);
  const { $minus, $plus } = event.data;

  const previous = parseInt($input.attr('data-previous'), 10);

  const val = $input.val(); // СТРОКА

  const value = parseInt(val, 10) || 0; // ЧИСЛО

  const max = $input.attr('max');

  const invalid = !val.match(/^\d{0,2}$/) || value > max || value < 0;

  if (invalid) {
    if (previous > 0) {
      $input.val(previous);
    } else {
      $input.val('');
    }
    return;
  }

  $input.val(val.replace(/^0*/, ''));

  $input
    .attr('data-quantity', value)
    .attr('data-previous', value);

  $minus.prop('disabled', !(value > 0));

  $plus.prop('disabled', !(value < max));

  if (value < 1) {
    const timerID = parseInt($minus.attr('data-timerID'), 10);

    clearTimeout(timerID);
    clearInterval(timerID);
  } else if (value >= max) {
    const timerID = parseInt($plus.attr('data-timerID'), 10);

    clearTimeout(timerID);
    clearInterval(timerID);
  }
}

function handleQuantityKeydown(event) {
  const $input = $(event.target);
  const { keyCode } = event;

  const max = $input.attr('max');

  let val = $input.val();

  if (keyCode === 8 || keyCode === 46) {
    event.preventDefault();

    $input.val(val.replace(/.$/, ''));
    $input.trigger('input');
  } else if (keyCode > 47 && keyCode < 58) {
    event.preventDefault();

    const digit = keyCode - 48;

    val = `${val}${digit}`;
    let value = parseInt(val, 10);

    let invalid = !val.match(/^\d{0,2}$/) || value > max || value < 0;

    if (invalid) {
      val = val.replace(/^./, '');
      value = parseInt(val, 10);

      invalid = !val.match(/^\d{0,2}$/) || value > max || value < 0;

      if (invalid) {
        val = val.replace(/^./, '');
        value = parseInt(val, 10);

        invalid = !val.match(/^\d{0,2}$/) || value > max || value < 0;

        if (invalid) {
          return;
        }
      }
    }

    $input.val(val);
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

  $button.attr('data-timerID', timerID);
}

function fastPlus($input, $button) {
  const timerID = setInterval(plus, changeInterval, $input);

  $button.attr('data-timerID', timerID);
}

function stop(event) {
  event.stopPropagation();
}

$('.js-dropdown').each((index, dropdown) => {
  const jsDropdown = new Dropdown(dropdown);
  jsDropdown.init();
});
