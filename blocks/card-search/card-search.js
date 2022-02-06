import $ from 'jquery';

function handleCardSearchInput(event) {
  // console.log('ФОРМ ИНПУТ');
  // console.log(`ВЗРОСЛЫХ: ${event.data.card.$adult.val()}`);
  // console.log(`ПРИБЫТИЕ: ${event.data.card.$arrival.val()}`);
  // console.log(`ВЫЕЗД: ${event.data.card.$departure.val()}`);
  if (
    parseInt(event.data.card.$adult.val(), 10)
    && event.data.card.$arrival.val()
    && event.data.card.$departure.val()
  ) {
    event.data.card.$submit.prop('disabled', false);
  } else {
    event.data.card.$submit.prop('disabled', true);
  }
}

class CardSearch {
  constructor(card) {
    this.$card = $(card);
    this.$arrival = $('.js-datepicker__input_arrival', this.$card);
    this.$departure = $('.js-datepicker__input_departure', this.$card);
    this.$adult = $($('.js-dropdown__quantity', this.$card).get(2));
    this.$submit = $('.js-button__input', this.$card);
  }

  init() {
    this.$card.on(
      'input',
      null,
      { card: this },
      handleCardSearchInput,
    );
  }
}

$('.js-card-search').each((index, element) => {
  const card = new CardSearch(element);
  card.init();
});
