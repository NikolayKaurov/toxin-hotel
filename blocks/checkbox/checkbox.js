import $ from 'jquery';

const enter = 13;
const spaceBar = 32;

$(document).on('keydown', '.checkbox__input', handleCheckKeydown);
$(document).on('keydown mousedown', '.checkbox__expand-label', handleExpandToggle);

function handleCheckKeydown(event) {
  if (event.keyCode === enter || event.keyCode === spaceBar) {
    event.preventDefault();

    const $checkbox = $(event.target);

    const checked = $checkbox.prop('checked');

    $checkbox.prop('checked', !checked);
  }
}

function handleExpandToggle(event) {
  const { type, keyCode } = event;
  const $expand = $(event.target);

  if (type === 'keydown') {
    if (keyCode === enter || keyCode === spaceBar) {
      event.preventDefault();
      $expand.toggleClass('checkbox__expand-label_close');
    }
  } else {
    $expand.toggleClass('checkbox__expand-label_close');
  }
}
