import $ from 'jquery';

const enter = 13;
const spaceBar = 32;

$(document).on('keydown', '.toggle__button', handleToggleKeydown);

function handleToggleKeydown(event) {
  if (event.keyCode === enter || event.keyCode === spaceBar) {
    event.preventDefault();

    const $toggle = $(event.target);

    const checked = $toggle.prop('checked');

    $toggle.prop('checked', !checked);
  }
}
