import $ from 'jquery';

function handleBackMousedown(event) {
  const { $card } = event.data;

  let slide = parseInt($card.attr('data-slide'), 10);
  slide -= 1;
  if (slide < 0) {
    slide = 3;
  }
  $card.attr('data-slide', slide);
}

function handleForwardMousedown(event) {
  const { $card } = event.data;

  let slide = parseInt($card.attr('data-slide'), 10);
  slide += 1;
  if (slide > 3) {
    slide = 0;
  }
  $card.attr('data-slide', slide);
}

function handleNavMousedown(event) {
  event.data.$card.attr('data-slide', parseInt(event.target.dataset.slide, 10));
}

class CardRoom {
  constructor(card) {
    this.$card = $(card);
  }

  init() {
    $('.js-card-room__back', this.$card)
      .on(
        'mousedown',
        null,
        { $card: this.$card },
        handleBackMousedown,
      );

    $('.js-card-room__forward', this.$card)
      .on(
        'mousedown',
        null,
        { $card: this.$card },
        handleForwardMousedown,
      );

    $('.js-card-room__nav', this.$card)
      .on(
        'mousedown',
        '.js-card-room__nav-item',
        { $card: this.$card },
        handleNavMousedown,
      );
  }
}

$('.js-card-room').each((index, element) => {
  const card = new CardRoom(element);
  card.init();
});
