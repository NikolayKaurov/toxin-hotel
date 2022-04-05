import $ from 'jquery';

function handleButtonMousedown(event) {
  $(event.target).prop('disabled', true);

  if ($(event.target).hasClass('js-dropdown__button_action_clear')) {
    event.data.$dropdown.trigger('clear');
    return;
  }

  if ($(event.target).hasClass('js-dropdown__button_action_confirm')) {
    event.data.$dropdown.trigger('confirm');
  }
}

/* eslint-disable-next-line */
class Dropdown__button {
  constructor(button) {
    this.$dropdown__button = $(button);
    this.dropdownName = button.dataset.dropdownName;
    this.$dropdown = $(`.js-dropdown[data-dropdown-name="${this.dropdownName}"]`);
  }

  init() {
    if (this.$dropdown__button.hasClass('js-dropdown__button_action_confirm')) {
      this.$dropdown.addClass('dropdown_rollbackable');
    }

    this.$dropdown__button.on(
      `mousedown.dropdown__button.${this.dropdownName}`,
      null,
      { $dropdown: this.$dropdown },
      handleButtonMousedown,
    );
  }
}

$('.js-dropdown__button').each((index, element) => {
  const button = new Dropdown__button(element);
  button.init();
});
