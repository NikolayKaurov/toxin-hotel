import $ from 'jquery';
import { v4 as getId } from 'uuid';

$(document).on('keydown', '.checkbox__input', handleCheckKeydown);

$('.js-checkbox__input').each((index, checkbox) => {
  const id = getId();
  $(checkbox)
    .attr('id', id)
    .next().attr('for', id);
});

function handleCheckKeydown(event) {
  if (event.keyCode === 13 || event.keyCode === 32) {
    event.preventDefault();

    const $checkbox = $(event.target);

    const checked = $checkbox.prop('checked');

    $checkbox.prop('checked', !checked);
  }
}
