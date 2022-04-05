// import $ from 'jquery';
//
// import { getValueWithCaseSelect } from '../dropdown';
//
// // максимальное значение счётчика, минимальное значение 0
// const MAX = 99;
//
// function handleCounterButtonMousedown(event) {
//   let value = parseInt(event.data.$dropdown__quantity.val(), 10);
//
//   if ($(event.target).hasClass('js-dropdown__counter-button_action_plus')) {
//     value += 1;
//     if (value < MAX) {
//       event.data.$dropdown.addClass('dropdown_keeping-focus');
//       $(event.target).addClass('js-dropdown__counter-button_pressed');
//     }
//   } else {
//     value -= 1;
//     if (value > 0) {
//       event.data.$dropdown.addClass('dropdown_keeping-focus');
//       $(event.target).addClass('js-dropdown__counter-button_pressed');
//     }
//   }
//
//   event.data.$dropdown__quantity.val(value);
//   event.data.$dropdown__quantity.trigger('input');
// }
//
// function handleCounterButtonMouseup(event) {
//   if ($(event.target).hasClass('js-dropdown__counter-button_pressed')) {
//     $(event.target).removeClass('js-dropdown__counter-button_pressed');
//
//     event.data.$dropdown.trigger('focus');
//   }
// }
//
// function handleQuantityInput(event) {
//   const value = parseInt($(event.target).val(), 10);
//
//   event.data.dropdown__item.$dropdown__counterButtons.each((index, element) => {
//     if ($(element).hasClass('js-dropdown__counter-button_action_plus')) {
//       if (value < MAX) {
//         $(element).prop('disabled', false);
//       } else {
//         $(element).prop('disabled', true);
//       }
//     } else if (value > 0) {
//       $(element).prop('disabled', false);
//     } else {
//       $(element).prop('disabled', true);
//     }
//   });
//
//   event.data.dropdown__item.$dropdown__item.attr(
//     'data-value',
//     getValueWithCaseSelect({ value, cases: event.data.dropdown__item.units }),
//   );
//
//   event.data.dropdown__item.$dropdown__item.attr('data-quantity', value);
// }
//
// function handleQuantityMousedown(event) {
//   event.preventDefault();
// }
//
// function handleItemSetValue(event, value) {
//   event.data.dropdown__item.$dropdown__quantity.val(value);
//   event.data.dropdown__item.$dropdown__quantity.triggerHandler('input');
// }
//
// class Dropdown__item {
//   constructor(item) {
//     this.$dropdown__item = $(item);
//     this.name = `${item.dataset.dropdownName}-${item.dataset.itemName}`;
//     this.units = item.dataset.units;
//
//     this.$dropdown = $(`.js-dropdown[data-dropdown-name="${item.dataset.dropdownName}"]`);
//     this.$dropdown__label = $('.js-dropdown__label', this.$dropdown__item);
//     this.$dropdown__counterButtons = $('.js-dropdown__counter-button', this.$dropdown__item);
//     this.$dropdown__quantity = $('.js-dropdown__quantity', this.$dropdown__item);
//   }
//
//   init() {
//     this.$dropdown__item.attr('data-value', '');
//     this.$dropdown__item.attr('data-quantity', 0);
//     this.$dropdown__quantity.attr('name', this.name);
//
//     this.$dropdown__label.text(this.units.split(' ')[0]);
//     this.$dropdown__quantity.val('0');
//
//     $('.js-dropdown__counter-button_action_minus', this.$dropdown__item).prop('disabled', true);
//
//     this.$dropdown__counterButtons.on(
//       `mousedown.dropdown__counter-button.${this.name}`,
//       null,
//       {
//         $dropdown: this.$dropdown,
//         $dropdown__quantity: this.$dropdown__quantity,
//       },
//       handleCounterButtonMousedown,
//     );
//
//     this.$dropdown__counterButtons.on(
//       `mouseup.dropdown__counter-button.${this.name}
//       mouseout.dropdown__counter-button.${this.name}`,
//       null,
//       { $dropdown: this.$dropdown },
//       handleCounterButtonMouseup,
//     );
//
//     this.$dropdown__quantity.on(
//       `input.dropdown__quantity.${this.name}`,
//       null,
//       { dropdown__item: this },
//       handleQuantityInput,
//     );
//
//     this.$dropdown__quantity.on(
//       `mousedown.dropdown__quantity.${this.name}`,
//       null,
//       { dropdown__item: this },
//       handleQuantityMousedown,
//     );
//
//     this.$dropdown__item.on(
//       `setValue.dropdown__quantity.${this.name}`,
//       null,
//       { dropdown__item: this },
//       handleItemSetValue,
//     );
//   }
// }
//
// $('.js-dropdown__item').each((index, element) => {
//   const item = new Dropdown__item(element);
//   item.init();
// });
