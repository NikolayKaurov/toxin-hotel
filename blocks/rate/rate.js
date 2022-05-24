import $ from 'jquery';

function handleStarMouseover(event) {
  event.data.rate.$rate.attr('data-rating', $(event.target).data('rating'));
}

function handleStarMouseout(event) {
  const { $rate, rating } = event.data.rate;

  $rate.attr('data-rating', rating);
}

function handleStarMousedown(event) {
  event.data.rate.setRating($(event.target).data('rating'));
}

class Rate {
  constructor(rate) {
    this.$rate = $(rate);

    this.rating = this.$rate.data('rating');
  }

  init() {
    this.$rate
      .on('mouseover', '.js-rate__star', { rate: this }, handleStarMouseover)
      .on('mouseout', '.js-rate__star', { rate: this }, handleStarMouseout)
      .on('mousedown', '.js-rate__star', { rate: this }, handleStarMousedown);
  }

  setRating(rating) {
    this.rating = rating;
  }
}

$('.js-rate.rate_enabled').each((index, element) => {
  const rate = new Rate(element);
  rate.init();
});
