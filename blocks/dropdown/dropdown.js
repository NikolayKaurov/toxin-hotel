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

function handleFocus(event) {
  event.data.dropdown.$dropdown.addClass('dropdown_open');
  event.data.dropdown.$dropdown__down.css('height', event.data.dropdown.openHeight);
  event.data.dropdown.setTimeFocus(event.timeStamp);
}

function handleBlur(event) {
  if (event.data.dropdown.$dropdown.hasClass('dropdown_keeping-focus')) {
    event.data.dropdown.$dropdown.removeClass('dropdown_keeping-focus');
    return;
  }

  if (
    event.data.dropdown.$dropdown.hasClass('dropdown_rollback')
    && !(event.data.dropdown.$dropdown.hasClass('dropdown_confirmed'))
  ) {
    event.data.dropdown.rollback();
    event.data.dropdown.$dropdown__buttons.each((index, button) => {
      if (
        event.data.dropdown.getCommonValue() !== event.data.dropdown.defaultValue
        && $(button).hasClass('js-dropdown__button_action_clear')
      ) {
        $(button).prop('disabled', false);
      } else {
        $(button).prop('disabled', true);
      }
    });
  }

  event.data.dropdown.$dropdown.removeClass('dropdown_open');
  event.data.dropdown.$dropdown__down.css('height', event.data.dropdown.closedHeight);
}

function handleInput(event) {
  const value = event.data.dropdown.getCommonValue();
  event.data.dropdown.$dropdown.removeClass('dropdown_confirmed');
  event.data.dropdown.$dropdown__value.text(value);
  event.data.dropdown.$dropdown__buttons.each((index, button) => {
    if (
      value === event.data.dropdown.defaultValue
      && $(button).hasClass('js-dropdown__button_action_clear')
    ) {
      $(button).prop('disabled', true);
    } else {
      $(button).prop('disabled', false);
    }
  });
}

function handleDropMousedown(event) {
  if (Math.abs(event.timeStamp - event.data.dropdown.timeFocus) < INTERVAL) {
    return;
  }

  if (event.data.dropdown.$dropdown.hasClass('dropdown_open')) {
    event.data.dropdown.$dropdown.removeClass('dropdown_open');
    event.data.dropdown.$dropdown__down.css('height', event.data.dropdown.closedHeight);
  } else {
    event.data.dropdown.$dropdown.addClass('dropdown_open');
    event.data.dropdown.$dropdown__down.css('height', event.data.dropdown.openHeight);
  }
}

function handleClear(event) {
  event.data.dropdown.$dropdown__items.each((index, item) => {
    $(item).trigger('setValue', 0);
  });

  event.data.dropdown.$dropdown__value.text(event.data.dropdown.defaultValue);
  event.data.dropdown.$dropdown.addClass('dropdown_confirmed');
  event.data.dropdown.clearSnapshot();
  event.data.dropdown.$dropdown__buttons.prop('disabled', true);

  event.data.dropdown.$dropdown.trigger('input');
}

function handleConfirm(event) {
  event.data.dropdown.takeSnapshot();
  event.data.dropdown.$dropdown.addClass('dropdown_confirmed');

  event.data.dropdown.$dropdown.removeClass('dropdown_open');
  event.data.dropdown.$dropdown__down.css('height', event.data.dropdown.closedHeight);
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

  if (
    (lastTwoDigits > 4 && lastTwoDigits < 21)
    || lastDigit > 4
    || lastDigit === 0
  ) {
    return `${value} ${genitivePlural}`;
  }

  if (lastDigit === 1) {
    return `${value} ${nominative}`;
  }

  return `${value} ${genitive}`;
}

class Dropdown {
  constructor(dropdown) {
    this.$dropdown = $(dropdown);

    this.name = dropdown.dataset.dropdownName;
    this.zIndex = dropdown.dataset.zIndex;
    this.defaultValue = dropdown.dataset.defaultValue;

    this.openHeight = '';
    this.closedHeight = '';

    this.$dropdown__value = $('.js-dropdown__value', this.$dropdown);
    this.$dropdown__drop = $('.js-dropdown__drop', this.$dropdown);
    this.$dropdown__down = $('.js-dropdown__down', this.$dropdown);
    this.$dropdown__items = $($('.js-dropdown__item', this.$dropdown).get().reverse());
    this.$dropdown__buttons = $('.js-dropdown__button', this.$dropdown);

    this.timeFocus = 0;

    this.rollbackSnapshot = [];

    console.log('Конструктор');
  }

  init() {
    let openHeight = EMPTY_OPEN_HEIGHT;
    let durationOpen = 0;

    this.$dropdown__items.each((index, item) => {
      $(item).attr('data-dropdown-name', this.name);

      openHeight += ITEM_HEIGHT;
      durationOpen += ITEM_DURATION_OPEN;

      this.rollbackSnapshot.push('0');
    });

    this.$dropdown__buttons.each((index, button) => {
      $(button).attr('data-dropdown-name', this.name);
    });

    if (this.$dropdown__buttons.length) {
      openHeight += BUTTON_CONTAINER_HEIGHT;
      durationOpen += ITEM_DURATION_OPEN;
    }

    this.openHeight = `${openHeight}px`;
    this.closedHeight = `${CLOSED_HEIGHT}px`;

    this.$dropdown__down.css({
      transition: `height ${durationOpen}ms`,
      height: this.closedHeight,
      'z-index': () => 2 * this.zIndex - 1,
    });

    this.$dropdown__drop.css({
      transition: `border ${durationOpen}ms`,
      'z-index': () => 2 * this.zIndex,
    });

    this.$dropdown__value.text(this.defaultValue);

    this.$dropdown.on(`focus.dropdown.${this.name}`, null, { dropdown: this }, handleFocus);
    this.$dropdown.on(`blur.dropdown.${this.name}`, null, { dropdown: this }, handleBlur);
    this.$dropdown.on(`input.dropdown.${this.name}`, null, { dropdown: this }, handleInput);
    this.$dropdown.on(`clear.dropdown.${this.name}`, null, { dropdown: this }, handleClear);
    this.$dropdown.on(`confirm.dropdown.${this.name}`, null, { dropdown: this }, handleConfirm);

    this.$dropdown__drop.on(
      `mousedown.dropdown__drop.${this.name}`,
      null,
      { dropdown: this },
      handleDropMousedown,
    );
  }

  setTimeFocus(time) {
    this.timeFocus = time;
  }

  getCommonValue() {
    let value = '';
    let numberItems = 0;

    this.$dropdown__items.each((index, item) => {
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
    this.$dropdown__items.each((index, item) => {
      this.rollbackSnapshot[index] = item.dataset.quantity;
    });
  }

  clearSnapshot() {
    this.rollbackSnapshot.forEach((value, index) => {
      this.rollbackSnapshot[index] = '0';
    });
  }

  rollback() {
    this.$dropdown__items.each((index, item) => {
      $(item).trigger('setValue', this.rollbackSnapshot[index]);
    });

    this.$dropdown__value.text(this.getCommonValue());

    this.$dropdown.trigger('input');
  }
}

function isDropdownWithJSModifier(dropdown) {
  return !!($(dropdown).attr('class').match(/js-dropdown_[^_]/));
}

$('.js-dropdown').each((index, element) => {
  if (!isDropdownWithJSModifier(element)) {
    const dropdown = new Dropdown(element);
    dropdown.init();
  }
});

export { Dropdown, getValueWithCaseSelect };
