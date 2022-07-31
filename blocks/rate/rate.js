import $ from 'jquery';

/*  this constant should be duplicated in ./rate.pug: const maxRating = 5;
    and in ./rate.scss: $max-rating: 5; */
const maxRating = 5;

const left = 37;
const right = 39;

class Rate {
  $rate;

  $input;

  rating;

  constructor(rate) {
    this.$rate = $(rate);

    this.rating = parseInt(this.$rate.attr('data-rating'), 10);
  }

  init() {
    this.$rate
      .on('mouseover', '.js-rate__star', { rate: this }, handleStarMouseover)
      .on('mouseout', '.js-rate__star', { rate: this }, handleStarMouseout)
      .on('mousedown', '.js-rate__star', { rate: this }, handleStarMousedown)
      .on('keydown', { rate: this }, handleRateKeydown)
      .append(`
        <input
          type="number"
          class="rate__input js-rate__input"
          name="rating"
        >`);

    this.$input = $('.js-rate__input').val(this.rating);

    return this;
  }

  setRating(rating) {
    this.rating = rating;

    return this;
  }
}

function handleStarMouseover(event) {
  const { $rate } = event.data.rate;

  $rate.attr('data-rating', $(event.target).attr('data-rating'));
}

function handleStarMouseout(event) {
  const { $rate, rating } = event.data.rate;

  $rate.attr('data-rating', rating);
}

function handleStarMousedown(event) {
  const { rate } = event.data;
  const rating = parseInt($(event.target).attr('data-rating'), 10);

  rate.setRating(rating);
  rate.$input.val(rating);
}

function handleRateKeydown(event) {
  const { rate } = event.data;
  const { keyCode } = event;
  const { $rate, $input, rating } = rate;

  if (keyCode === left || keyCode === right) {
    event.preventDefault();

    const newRating = (() => {
      if (keyCode === left) {
        if (rating > 1) {
          return rating - 1;
        }

        return rating;
      }

      if (rating < maxRating) {
        return rating + 1;
      }

      return rating;
    })();

    rate.setRating(newRating);
    $input.val(newRating);
    $rate.attr('data-rating', newRating);
  }
}

$('.js-rate.rate_enabled').each((index, rate) => {
  const jsRate = new Rate(rate);
  jsRate.init();
});
