import $ from 'jquery';

$(document).on('keydown', '.checkbox__input', handleCheckKeydown);

function handleCheckKeydown(event) {
  if (event.keyCode === 13 || event.keyCode === 32) {
    event.preventDefault();

    const $checkbox = $(event.target);

    const checked = $checkbox.prop('checked');

    $checkbox.prop('checked', !checked);
  }
}
