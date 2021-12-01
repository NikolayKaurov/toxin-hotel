import $ from 'jquery';

// максимальное значение счётчика, минимальное значение 0
const MAX = 99;

function handleCounterButtonMousedown(event) {
  event.data.$dropdown.addClass('dropdown_keeping-focus');

  $(event.target).addClass('js-dropdown__counter-button_pressed');

  if ($(event.target).hasClass('js-dropdown__counter-button_action_plus')) {
    event.data.$dropdown__quantity.val(parseInt(event.data.$dropdown__quantity.val(), 10) + 1);
  } else {
    event.data.$dropdown__quantity.val(parseInt(event.data.$dropdown__quantity.val(), 10) - 1);
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
/*

function handlePlusMousedown(event) {
  event.data.$dropdown.addClass('dropdown_keeping-focus');

  event.data.$dropdown__quantity.val(parseInt(event.data.$dropdown__quantity.val(), 10) + 1);
}

function handleMinusMousedown(event) {
  event.data.$dropdown.addClass('dropdown_keeping-focus');

  event.data.$dropdown__quantity.val(parseInt(event.data.$dropdown__quantity.val(), 10) - 1);
}
*/

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

    this.$dropdown__label.text(this.units);
    this.$dropdown__quantity.val(0);

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

// function Dropdown__item(dropdown__item) {
//   this.$dropdown__item = $(dropdown__item);
//
//   this.dropdownName = dropdown__item.dataset.dropdownName;
//   this.name = this.dropdownName + '-' + dropdown__item.dataset.itemName;
//   this.$dropdown = $('.js-dropdown[data-dropdown-name="' + this.dropdownName + '"]');
//
//   this.$dropdown__label =     $('.js-dropdown__label',      this.$dropdown__item);
//   this.$dropdown__plus =      $('.js-dropdown__plus',       this.$dropdown__item);
//   this.$dropdown__minus =     $('.js-dropdown__minus',      this.$dropdown__item);
//   this.$dropdown__quantity = $('.js-dropdown__quantity', this.$dropdown__item);
//
//   this.$dropdown__quantity.val(0);
//
//   this.$dropdown__plus.on('mousedown.js-dropdown__plus.' + this.name,
//                           null,
//          {$dropdown: this.$dropdown, $dropdown__quantity: this.$dropdown__quantity},
//                           handlePlusMousedown);
//   function handlePlusMousedown( event ) {
//     event.data.$dropdown.addClass('dropdown_keeping-focus');
//
//     event.data.$dropdown__quantity.val(parseInt(event.data.$dropdown__quantity.val(), 10) + 3);
//   }
//
//   this.$dropdown__plus.on('click.js-dropdown__plus.' + this.name,
//       null,
//       {$dropdown: this.$dropdown},
//       handlePlusFocus);
//   function handlePlusFocus( event ) {
//     console.log('click');
//     event.data.$dropdown.trigger('focus');
//   }

// this.$dropdown__plus.on('mousedown', () => {
//   this.$dropdown__quantity.val(this.value);
// });

// $(this.$dropdown__item).on('mousedown', () => {
//   $(this.$dropdown).attr('data-test',this.name);
//   console.log(this.dropdownName);
// })
