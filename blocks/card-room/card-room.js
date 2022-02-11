import $ from 'jquery';

function handleBackMousedown(event) {
  let slide = parseInt(event.data.$card.attr('data-slide'), 10);
  slide -= 1;
  if (slide < 0) {
    slide = 3;
  }
  event.data.$card.attr('data-slide', slide);
}

function handleForwardMousedown(event) {
  let slide = parseInt(event.data.$card.attr('data-slide'), 10);
  slide += 1;
  if (slide > 3) {
    slide = 0;
  }
  event.data.$card.attr('data-slide', slide);
}

class CardRoom {
  constructor(card) {
    this.$card = $(card);
    this.$back = $('.js-card-room__back', this.$card);
    this.$forward = $('.js-card-room__forward', this.$card);
    this.$nav = $('.js-card-room__nav', this.$card);
  }

  init() {
    this.$back.on(
      'mousedown',
      null,
      { $card: this.$card },
      handleBackMousedown,
    );

    this.$forward.on(
      'mousedown',
      null,
      { $card: this.$card },
      handleForwardMousedown,
    );
  }
}

$('.js-card-room').each((index, element) => {
  const card = new CardRoom(element);
  card.init();
});
