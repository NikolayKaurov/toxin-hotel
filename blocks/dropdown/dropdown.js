import $ from 'jquery';

const pressingTime = 500; // время зажатия кнопки счётчика
const changeInterval = 75; // интервал изменения счётчика при зажатой кнопке

// Количество элементов в общей строке: '3 гостя, 1 младенец' - 2 элемента
// const numberItemsInValue = 2;

class Dropdown {
  constructor(dropdown) {
    this.$dropdown = $(dropdown);
  }

  init() {
    this.$dropdown
      .on('mousedown', { dropdown: this }, handleDropdownMousedown)
      .on('focusin', { dropdown: this }, handleDropdownFocusin);

    this.$drop = $('.js-dropdown__drop', this.$dropdown);

    this.firstQuantity = $('.js-dropdown__quantity', this.$dropdown).get(0);

    $('.js-dropdown__item', this.$dropdown).each((index, item) => {
      const $item = $(item);

      const $quantity = $('.js-dropdown__quantity', $item).val('');

      const $minus = $('.js-dropdown__counter-button_action_minus', $item)
        .on('mousedown', { $quantity }, handleMinusMousedown);

      const $plus = $('.js-dropdown__counter-button_action_plus', $item)
        .on('mousedown', { $quantity }, handlePlusMousedown);

      $quantity
        .on('input', { $item, $minus, $plus }, handleQuantityInput);

      $('.js-dropdown__counter-button', $item)
        .on('mouseup mouseout', { $quantity }, handleCounterButtonMouseup);
    });

    $('.js-dropdown__down', this.$dropdown)
      .on('mousedown', stop);
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
  const { $item, $minus, $plus } = event.data;

  const previous = parseInt($input.attr('data-previous'), 10);

  const val = $input.val();

  const value = parseInt(val, 10) || 0;

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

  $input.attr('data-previous', value);

  $minus.prop('disabled', !(value > 0));

  $plus.prop('disabled', !(value < max));

  $item.attr('data-quantity', value);

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

function fastPlus($input, $button) {
  const timerID = setInterval(plus, changeInterval, $input);

  $button.attr('data-timerID', timerID);
}

function fastMinus($input, $button) {
  const timerID = setInterval(minus, changeInterval, $input);

  $button.attr('data-timerID', timerID);
}

function stop(event) {
  event.stopPropagation();
}

$('.js-dropdown').each((index, dropdown) => {
  const jsDropdown = new Dropdown(dropdown);
  jsDropdown.init();
});
