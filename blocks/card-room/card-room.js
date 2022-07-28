import $ from 'jquery';

/* this constant should be duplicated in ./card-room.pug: const quantitySlides = 4;
  and in ./card-room.scss: $quantity-slides: 4; */
const quantitySlides = 4;

const enter = 13;
const spaceBar = 32;
const left = 37;
const right = 39;

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
      this.#slide = quantitySlides - 1;
    }

    this.#$card.attr('data-slide', this.#slide);

    return this;
  }

  forward() {
    this.#slide += 1;

    if (this.#slide >= quantitySlides) {
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

  if (keyCode === enter || keyCode === spaceBar) {
    event.preventDefault();

    card.confirm();

    return;
  }

  if (keyCode === left) {
    event.preventDefault();

    card.back();

    return;
  }

  if (keyCode === right) {
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
