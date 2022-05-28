import $ from 'jquery';

// Количество элементов в общей строке: '3 гостя, 1 младенец' - 2 элемента
const numberItemsInValue = 2;

class Dropdown {
  constructor(dropdown) {
    this.$dropdown = $(dropdown);
  }

  init() {
    this.$dropdown
      .on('mousedown', { dropdown: this }, handleDropdownMousedown)
      .on('focusin', { dropdown: this }, handleDropdownFocusin);

    this.$drop = $('.js-dropdown__drop', this.$dropdown);

    $('.js-dropdown__down', this.$dropdown)
      .on('mousedown', stop);

    this.$items = $('.js-dropdown__item', this.$dropdown)
      .each((index, item) => {
        const $item = $(item);

        $('.js-dropdown__units', $item).text(item.dataset.units.split(' ')[0]);
      });
  }
}

function handleDropdownMousedown(event) {
  const { $dropdown } = event.data.dropdown;

  $dropdown.toggleClass('dropdown_open');
}

function handleDropdownFocusin(event) {

}

function stop(event) {
  event.stopPropagation();
}

$('.js-dropdown').each((index, dropdown) => {
  const jsDropdown = new Dropdown(dropdown);
  jsDropdown.init();
});
