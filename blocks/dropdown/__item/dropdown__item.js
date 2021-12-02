import $ from 'jquery';

// максимальное значение счётчика, минимальное значение 0
const MAX = 99;

function handleCounterButtonMousedown(event) {
  let value = parseInt(event.data.$dropdown__quantity.val(), 10);

  if ($(event.target).hasClass('js-dropdown__counter-button_action_plus')) {
    value += 1;
    event.data.$dropdown__quantity.val(value);
    if (value < MAX) {
      event.data.$dropdown.addClass('dropdown_keeping-focus');
      $(event.target).addClass('js-dropdown__counter-button_pressed');
    }
  } else {
    value -= 1;
    event.data.$dropdown__quantity.val(value);
    if (value > 0) {
      event.data.$dropdown.addClass('dropdown_keeping-focus');
      $(event.target).addClass('js-dropdown__counter-button_pressed');
    }
  }

  event.data.$dropdown__quantity.trigger('input');
}

function handleCounterButtonMouseup(event) {
  if ($(event.target).hasClass('js-dropdown__counter-button_pressed')) {
    $(event.target).removeClass('js-dropdown__counter-button_pressed');

    event.data.$dropdown.trigger('focus');
  }
}

function handleQuantityInput(event) {
  const value = parseInt($(event.target).val(), 10);

  event.data.dropdown__item.$dropdown__counterButtons.each((index, element) => {
    if ($(element).hasClass('js-dropdown__counter-button_action_plus')) {
      if (value < MAX) {
        $(element).prop('disabled', false);
      } else {
        $(element).prop('disabled', true);
      }
    } else if (value > 0) {
      $(element).prop('disabled', false);
    } else {
      $(element).prop('disabled', true);
    }
  });

  // При выборе падежа предполагается, что value < 100. Если value > 100, будут ошибки
  if (value === 0) {
    event.data.dropdown__item.$dropdown__item.attr('data-value', '');
  } else if ((value > 4 && value < 21) || value % 10 > 4 || value % 10 === 0) {
    event.data.dropdown__item.$dropdown__item.attr(
      'data-value',
      `${value} ${event.data.dropdown__item.unitsGenitivePlural}`,
    );
  } else if (value % 10 === 1) {
    event.data.dropdown__item.$dropdown__item.attr(
      'data-value',
      `${value} ${event.data.dropdown__item.unitsNominative}`,
    );
  } else {
    event.data.dropdown__item.$dropdown__item.attr(
      'data-value',
      `${value} ${event.data.dropdown__item.unitsGenitive}`,
    );
  }
}

/* eslint-disable-next-line */
class Dropdown__item {
  constructor(item) {
    this.$dropdown__item = $(item);
    this.name = `${item.dataset.dropdownName}-${item.dataset.itemName}`;

    this.units = undefined;
    this.unitsNominative = undefined;
    this.unitsGenitive = undefined;
    this.unitsGenitivePlural = undefined;
    [this.units, this.unitsNominative, this.unitsGenitive, this.unitsGenitivePlural] = item.dataset.units.split(' ');
    if (this.unitsNominative === undefined) {
      this.unitsNominative = this.units;
    }
    if (this.unitsGenitive === undefined) {
      this.unitsGenitive = this.unitsNominative;
    }
    if (this.unitsGenitivePlural === undefined) {
      this.unitsGenitivePlural = this.unitsGenitive;
    }

    this.$dropdown = $(`.js-dropdown[data-dropdown-name="${item.dataset.dropdownName}"]`);
    this.$dropdown__label = $('.js-dropdown__label', this.$dropdown__item);
    this.$dropdown__counterButtons = $('.js-dropdown__counter-button', this.$dropdown__item);
    this.$dropdown__quantity = $('.js-dropdown__quantity', this.$dropdown__item);
  }

  init() {
    this.$dropdown__item.attr('data-value', '');
    this.$dropdown__quantity.attr('name', this.name);

    this.$dropdown__label.text(this.units);
    this.$dropdown__quantity.val('0');

    this.$dropdown__counterButtons.on(
      `mousedown.dropdown__counter-button.${this.name}`,
      null,
      {
        $dropdown: this.$dropdown,
        $dropdown__quantity: this.$dropdown__quantity,
      },
      handleCounterButtonMousedown,
    );

    this.$dropdown__counterButtons.on(
      `mouseup.dropdown__counter-button.${this.name} mouseout.dropdown__counter-button.${this.name}`,
      null,
      { $dropdown: this.$dropdown },
      handleCounterButtonMouseup,
    );

    this.$dropdown__quantity.on(
      `input.dropdown__quantity.${this.name}`,
      null,
      { dropdown__item: this },
      handleQuantityInput,
    );
  }
}

$('.js-dropdown__item').each((index, element) => {
  const item = new Dropdown__item(element);
  item.init();
});
