import $ from 'jquery';

// minimum interval between getting focus and clicking the mouse 50 milliseconds
const INTERVAL = 50;

// Высота выпадающего элемента в закрытом состоянии в пикселах
const CLOSED_HEIGHT = 42;

// Высота одной строки в выпадающем элементе в пикселах
const ITEM_HEIGHT = 37;

// Высота нижней строки с кнопками 'очистить' и 'применить' в пикселах
const BUTTON_CONTAINER_HEIGHT = 40;

// Высота выпадающего элемента в открытом состоянии без строк в пикселах
const EMPTY_OPEN_HEIGHT = 51;

// Количество элементов в общей строке: '3 гостя, 1 младенец' - 2 элемента
const NUMBER_ITEMS_IN_VALUE = 2;

// Длительность появления одной строки в выпадающем элементе в миллисекундах
const ITEM_DURATION_OPEN = 100;

// максимальное значение счётчиков, минимальное значение 0
const MAX = 99;

function handleDropdownFocus(event) {
  event.data.dropdown.open();

  event.data.dropdown.setTimeFocus(event.timeStamp);
}

function handleDropdownBlur(event) {
  if (event.data.dropdown.$dropdown.hasClass('dropdown_keeping-focus')) {
    event.data.dropdown.$dropdown.removeClass('dropdown_keeping-focus');
    return;
  }

  if (event.data.dropdown.isRollbackable()) {
    event.data.dropdown.rollback();
  }

  event.data.dropdown.close();
}

function handleDropdownInput(event) {
  const value = event.data.dropdown.getCommonValue();

  event.data.dropdown.$dropdown__value.text(value);

  event.data.dropdown.$dropdown__buttons.each((index, button) => {
    const $button = $(button);
    if ($button.hasClass('js-dropdown__button_action_clear')) {
      if (value === event.data.dropdown.defaultValue) {
        $button.prop('disabled', true);
      } else {
        $button.prop('disabled', false);
      }
    } else if (event.data.dropdown.isRollbackable()) {
      $button.prop('disabled', false);
    } else {
      $button.prop('disabled', true);
    }
  });
}

function handleDropMousedown(event) {
  if (Math.abs(event.timeStamp - event.data.dropdown.timeFocus) < INTERVAL) {
    return;
  }

  if (event.data.dropdown.$dropdown.hasClass('dropdown_open')) {
    event.data.dropdown.close();
  } else {
    event.data.dropdown.open();
  }
}

function handleCounterButtonMousedown(event) {
  const $quantity = $('.js-dropdown__quantity', $(event.delegateTarget));
  const $button = $(event.target);

  let value = parseInt($quantity.val(), 10);

  if ($button.hasClass('js-dropdown__counter-button_action_plus')) {
    value += 1;
  } else {
    value -= 1;
  }

  if (value > 0 && value < MAX) {
    event.data.dropdown.$dropdown.addClass('dropdown_keeping-focus');
    $button.addClass('js-dropdown__counter-button_pressed');
  }

  $quantity.val(value).trigger('input');
}

function handleCounterButtonMouseup(event) {
  const $button = $(event.target);
  if ($button.hasClass('js-dropdown__counter-button_pressed')) {
    $button.removeClass('js-dropdown__counter-button_pressed');

    event.data.dropdown.$dropdown.trigger('focus');
  }
}

function getValueWithCaseSelect({ value = 0, cases = 'units' } = {}) {
  if (value === 0) {
    return '';
  }

  let [, nominative, genitive, genitivePlural] = cases.split(' ');
  if (nominative === undefined) {
    nominative = cases;
  }
  if (genitive === undefined) {
    genitive = nominative;
  }
  if (genitivePlural === undefined) {
    genitivePlural = genitive;
  }

  const lastTwoDigits = value % 100;
  const lastDigit = value % 10;

  const genitivePluralValue = (lastTwoDigits > 4 && lastTwoDigits < 21)
    || lastDigit > 4
    || lastDigit === 0;

  if (genitivePluralValue) {
    return `${value} ${genitivePlural}`;
  }

  if (lastDigit === 1) {
    return `${value} ${nominative}`;
  }

  return `${value} ${genitive}`;
}

function handleQuantityInput(event) {
  const $item = $(event.delegateTarget);
  const value = parseInt($(event.target).val(), 10);

  $('.js-dropdown__counter-button', $item).each((index, button) => {
    const $button = $(button);
    if ($button.hasClass('js-dropdown__counter-button_action_plus')) {
      if (value < MAX) {
        $button.prop('disabled', false);
      } else {
        $button.prop('disabled', true);
      }
    } else if (value > 0) {
      $button.prop('disabled', false);
    } else {
      $button.prop('disabled', true);
    }
  });

  $item.attr(
    'data-value',
    getValueWithCaseSelect({ value, cases: $item.data('units') }),
  );

  $item.attr('data-quantity', value);
}

function handleQuantityMousedown(event) {
  event.preventDefault();
}

function handleButtonMousedown(event) {
  const $button = $(event.target);
  $button.prop('disabled', true);

  if ($button.hasClass('js-dropdown__button_action_clear')) {
    event.data.dropdown.clearSnapshot();

    event.data.dropdown.$dropdown__quantities.each((index, quantity) => {
      $(quantity).val(0).trigger('input');
    });

    return;
  }

  event.data.dropdown.takeSnapshot();

  event.data.dropdown.close();
}

class Dropdown {
  #rollbackSnapshot = [];

  #guest = false;

  #$dropdown__down = $();

  #$dropdown__items = $();

  #openHeight = '';

  #closedHeight = `${CLOSED_HEIGHT}px`;

  constructor(dropdown) {
    this.$dropdown = $(dropdown);

    this.defaultValue = dropdown.dataset.defaultValue;
  }

  init() {
    this.timeFocus = 0;

    this.$dropdown__value = $('.js-dropdown__value', this.$dropdown);
    this.#$dropdown__items = $($('.js-dropdown__item', this.$dropdown).get().reverse());
    this.#$dropdown__down = $('.js-dropdown__down', this.$dropdown);
    this.$dropdown__quantities = $($('.js-dropdown__quantity', this.$dropdown).get().reverse());
    this.$dropdown__buttons = $('.js-dropdown__button', this.$dropdown);

    this.#guest = this.$dropdown.hasClass('dropdown_guest');

    let openHeight = EMPTY_OPEN_HEIGHT;
    let durationOpen = 0;

    this.#$dropdown__items.each((index, item) => {
      const $item = $(item);

      $('.js-dropdown__label', $item).text(item.dataset.units.split(' ')[0]);

      $('.js-dropdown__quantity', $item).val(0);

      openHeight += ITEM_HEIGHT;
      durationOpen += ITEM_DURATION_OPEN;

      this.#rollbackSnapshot.push('0');
    });

    if (this.$dropdown__buttons.length) {
      openHeight += BUTTON_CONTAINER_HEIGHT;
      durationOpen += ITEM_DURATION_OPEN;
    }

    this.#openHeight = `${openHeight}px`;

    const zIndex = this.$dropdown.data('z-index');

    this.#$dropdown__down
      .css({
        transition: `height ${durationOpen}ms`,
        height: this.#closedHeight,
        'z-index': () => 2 * zIndex - 1,
      });

    const name = this.$dropdown.data('dropdown-name');

    this.#$dropdown__items
      .on(
        `mousedown.dropdown__counter-button.${name}`,
        '.js-dropdown__counter-button',
        { dropdown: this },
        handleCounterButtonMousedown,
      )
      .on(
        `mouseup.dropdown__counter-button.${name} mouseout.dropdown__counter-button.${name}`,
        '.js-dropdown__counter-button',
        { dropdown: this },
        handleCounterButtonMouseup,
      )
      .on(
        `input.dropdown__quantity.${name}`,
        '.js-dropdown__quantity',
        { dropdown: this },
        handleQuantityInput,
      );

    $('.js-dropdown__drop', this.$dropdown)
      .css({
        transition: `border ${durationOpen}ms`,
        'z-index': () => 2 * zIndex,
      })
      .on(
        `mousedown.dropdown__drop.${name}`,
        null,
        { dropdown: this },
        handleDropMousedown,
      );

    this.$dropdown
      .on(`focus.dropdown.${name}`, null, { dropdown: this }, handleDropdownFocus)
      .on(`blur.dropdown.${name}`, null, { dropdown: this }, handleDropdownBlur)
      .on(`input.dropdown.${name}`, null, { dropdown: this }, handleDropdownInput)
      .on(
        `mousedown.dropdown__quantity.${name}`,
        '.dropdown__quantity',
        handleQuantityMousedown,
      )
      .on(
        `mousedown.dropdown__button.${name}`,
        '.dropdown__button',
        { dropdown: this },
        handleButtonMousedown,
      );
  }

  open() {
    this.$dropdown.addClass('dropdown_open');
    this.#$dropdown__down.css('height', this.#openHeight);
  }

  close() {
    this.$dropdown.removeClass('dropdown_open');
    this.#$dropdown__down.css('height', this.#closedHeight);
  }

  isRollbackable() {
    if (!this.$dropdown.hasClass('dropdown_rollbackable')) {
      return false;
    }

    let rollbackable = false;

    this.$dropdown__quantities.each((index, quantity) => {
      if (this.#rollbackSnapshot[index] !== $(quantity).val()) {
        rollbackable = true;
      }
    });

    return rollbackable;
  }

  setTimeFocus(time) {
    this.timeFocus = time;
  }

  getCommonValue() {
    let value = '';
    let numberItems = 0;

    if (this.#guest) {
      const firstItem = this.#$dropdown__items.get(0);
      const secondItem = this.#$dropdown__items.get(1);

      let guestsValue = 0;

      if (secondItem) {
        guestsValue = parseInt(secondItem.dataset.quantity, 10) || 0;
        secondItem.dataset.value = '';
      }

      if (firstItem) {
        guestsValue += parseInt(firstItem.dataset.quantity, 10) || 0;
        firstItem.dataset.value = getValueWithCaseSelect({
          value: guestsValue,
          cases: firstItem.dataset.units,
        });
      }
    }

    this.#$dropdown__items.each((index, item) => {
      if (item.dataset.value !== '') {
        if (numberItems === NUMBER_ITEMS_IN_VALUE) {
          value += '...';
        } else if (numberItems < NUMBER_ITEMS_IN_VALUE) {
          if (value === '') {
            value = item.dataset.value;
          } else {
            value += `, ${item.dataset.value}`;
          }
        }
        numberItems += 1;
      }
    });

    if (value === '') {
      return this.defaultValue;
    }

    return value;
  }

  takeSnapshot() {
    this.#$dropdown__items.each((index, item) => {
      this.#rollbackSnapshot[index] = item.dataset.quantity;
    });
  }

  clearSnapshot() {
    this.#rollbackSnapshot.forEach((value, index) => {
      this.#rollbackSnapshot[index] = '0';
    });
  }

  rollback() {
    this.$dropdown__quantities.each((index, quantity) => {
      $(quantity).val(this.#rollbackSnapshot[index]).trigger('input');
    });
  }
}

$('.js-dropdown').each((index, element) => {
  const dropdown = new Dropdown(element);
  dropdown.init();
});
