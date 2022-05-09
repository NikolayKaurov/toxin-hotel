import $ from 'jquery';

function handleItemMousedown(event) {
  const {
    $paginator,
    $description,
  } = event.data;

  let active = parseFloat($paginator.attr('data-active'));

  const number = $(event.target).attr('data-number');

  if (number === 'back') {
    active -= 1;
  } else if (number === 'forward') {
    active += 1;
  } else {
    active = parseFloat(number);
  }

  $paginator.attr('data-active', active);

  $description.text(`${(active - 1) * 12 + 1} – ${active * 12} из 100+ вариантов аренды`);
}

class Paginator {
  constructor(paginator) {
    this.$paginator = $(paginator);
  }

  init() {
    this.$description = $('.js-paginator__description', this.$paginator);

    this.$paginator.on(
      'mousedown',
      '.js-paginator__item',
      { $paginator: this.$paginator, $description: this.$description },
      handleItemMousedown,
    );
  }
}

$('.js-paginator').each((index, element) => {
  const paginator = new Paginator(element);
  paginator.init();
});
