import $ from 'jquery';

function handleItemClick(event) {
  let active = parseFloat(event.data.$paginator.attr('data-active'));

  const number = $(event.target).attr('data-number');

  if (number === 'back') {
    active -= 1;
  } else if (number === 'forward') {
    active += 1;
  } else {
    active = parseFloat(number);
  }

  event.data.$paginator.attr('data-active', active);

  const $description = $('.js-paginator__description', event.data.$paginator);
  $description.text(`${(active - 1) * 12 + 1} – ${active * 12} из 100+ вариантов аренды`);
}

class Paginator {
  constructor(paginator) {
    this.$paginator = $(paginator);
  }

  init() {
    this.$paginator.on(
      'click',
      '.js-paginator__item',
      { $paginator: this.$paginator },
      handleItemClick,
    );

    $('.js-paginator__item:nth-child(2)', this.$paginator).trigger('click');
  }
}

$('.js-paginator').each((index, element) => {
  const paginator = new Paginator(element);
  paginator.init();
});
