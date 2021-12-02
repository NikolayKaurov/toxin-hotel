import $ from 'jquery';

// minimum interval between getting focus and clicking the mouse 50 milliseconds
const INTERVAL = 50;

// Высота выпадающего элемента в закрытом состоянии в пикселах
const CLOSED_HEIGHT = 43;

// Высота одной строки в выпадающем элементе в пикселах
const ITEM_HEIGHT = 37;

// Высота нижней строки с кнопками 'очистить' и 'применить' в пикселах
const BUTTON_CONTAINER_HEIGHT = 41;

// Высота выпадающего элемента в открытом состоянии без строк в пикселах
const EMPTY_OPEN_HEIGHT = 52;

export const NUMBER_ITEMS_IN_VALUE = 2;

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

  event.data.dropdown.$dropdown.removeClass('dropdown_open');
  event.data.dropdown.$dropdown__down.css('height', event.data.dropdown.closedHeight);
}

function handleInput(event) {
  event.data.dropdown.$dropdown__value.text(event.data.dropdown.getCommonValue());
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
    this.$dropdown__confirm = $('.js-dropdown__confirm', this.$dropdown);

    this.timeFocus = 0;

    this.rollbackSnapshot = [];
  }

  init() {
    let openHeight = EMPTY_OPEN_HEIGHT;

    this.$dropdown__items.each((index, item) => {
      $(item).attr('data-dropdown-name', this.name);

      openHeight += ITEM_HEIGHT;

      this.rollbackSnapshot.push('0');
    });

    if ($('.js-dropdown__button-container', this.$dropdown).length) {
      openHeight += BUTTON_CONTAINER_HEIGHT;
    }

    this.openHeight = `${openHeight}px`;
    this.closedHeight = `${CLOSED_HEIGHT}px`;

    this.$dropdown__down.css({
      height: this.closedHeight,
      'z-index': () => 2 * this.zIndex - 1,
    });

    this.$dropdown__drop.css({
      'z-index': () => 2 * this.zIndex,
    });

    this.$dropdown__value.text(this.defaultValue);

    this.$dropdown.on(`focus.dropdown.${this.name}`, null, { dropdown: this }, handleFocus);
    this.$dropdown.on(`blur.dropdown.${this.name}`, null, { dropdown: this }, handleBlur);
    this.$dropdown.on(`input.dropdown.${this.name}`, null, { dropdown: this }, handleInput);

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

export { Dropdown };
