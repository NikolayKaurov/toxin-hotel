import $ from 'jquery';

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
}

function handleCardSignInput(event) {
  if (
    validateEmail(event.data.card.$email.val())
    && event.data.card.$password.val().length > 7
  ) {
    event.data.card.$submit.prop('disabled', false);
  } else {
    event.data.card.$submit.prop('disabled', true);
  }
}

class CardSign {
  constructor(card) {
    this.$card = $(card);
    this.$email = $($('.js-text-field__input', this.$card).get(0));
    this.$password = $($('.js-text-field__input', this.$card).get(1));
    this.$submit = $('.js-button__input', this.$card);
  }

  init() {
    this.$card.on(
      'input',
      null,
      { card: this },
      handleCardSignInput,
    );
  }
}

$('.js-card-sign').each((index, element) => {
  const card = new CardSign(element);
  card.init();
});
