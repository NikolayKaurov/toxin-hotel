import $ from 'jquery';

class CardRoom {
  #$card;

  #$form;

  #slide;

  constructor(card) {
    this.#$card = $(card);

    this.#slide = 0;
  }

  init() {
    this.#$card
      .on('keydown', { card: this }, handleCardKeydown);

    this.#$form = $('.js-card-room__form', this.#$card);

    $('.js-card-room__back', this.#$card)
      .on(
        'mousedown',
        null,
        { card: this },
        handleBackMousedown,
      );

    $('.js-card-room__forward', this.#$card)
      .on(
        'mousedown',
        null,
        { card: this },
        handleForwardMousedown,
      );

    $('.js-card-room__nav', this.#$card)
      .on(
        'mousedown',
        '.js-card-room__nav-item',
        { card: this },
        handleNavMousedown,
      );

    return this;
  }

  back() {
    this.#slide -= 1;

    if (this.#slide < 0) {
      this.#slide = 3;
    }

    this.#$card.attr('data-slide', this.#slide);

    return this;
  }

  forward() {
    this.#slide += 1;

    if (this.#slide > 3) {
      this.#slide = 0;
    }

    this.#$card.attr('data-slide', this.#slide);

    return this;
  }

  setSlide(slide) {
    this.#slide = slide;
    this.#$card.attr('data-slide', slide);

    return this;
  }

  confirm() {
    this.#$form.trigger('submit');

    return this;
  }
}

function handleCardKeydown(event) {
  const { keyCode } = event;
  const { card } = event.data;

  if (keyCode === 32 || keyCode === 13) {
    event.preventDefault();

    card.confirm();

    return;
  }

  if (keyCode === 37) {
    event.preventDefault();

    card.back();

    return;
  }

  if (keyCode === 39) {
    event.preventDefault();

    card.forward();
  }
}

function handleBackMousedown(event) {
  const { card } = event.data;

  card.back();
}

function handleForwardMousedown(event) {
  const { card } = event.data;

  card.forward();
}

function handleNavMousedown(event) {
  const { card } = event.data;

  const slide = parseInt(event.target.dataset.slide, 10);

  card.setSlide(slide);
}

$('.js-card-room').each((index, card) => {
  const jsCard = new CardRoom(card);
  jsCard.init();
});
