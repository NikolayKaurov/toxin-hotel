import $ from 'jquery';

$(document).on('keydown', '.toggle__button', handleToggleKeydown);

function handleToggleKeydown(event) {
  if (event.keyCode === 13 || event.keyCode === 32) {
    event.preventDefault();

    const $toggle = $(event.target);

    const checked = $toggle.prop('checked');

    $toggle.prop('checked', !checked);
  }
}
