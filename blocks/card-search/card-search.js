import $ from 'jquery';

class CardSearch {
  #$card;

  constructor(card) {
    this.#$card = $(card);
  }

  init() {
    this.$arrival = $('.js-datepicker__input_date_arrival', this.#$card);
    this.$departure = $('.js-datepicker__input_date_departure', this.#$card);
    this.$adult = $('.js-dropdown__quantity[name="adult"]', this.#$card);
    this.$submit = $('.js-button', this.#$card);

    this.#$card.on(
      'input',
      null,
      { card: this },
      handleCardSearchInput,
    );
  }
}

function handleCardSearchInput(event) {
  const {
    $arrival,
    $departure,
    $adult,
    $submit,
  } = event.data.card;

  const fullInput = $departure.val() && $arrival.val() && parseInt($adult.val(), 10);

  $submit.prop('disabled', !fullInput);
}

$('.js-card-search').each((index, card) => {
  const jsCard = new CardSearch(card);
  jsCard.init();
});
