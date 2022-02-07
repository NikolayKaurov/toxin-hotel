import $ from 'jquery';

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
}

function handleCardRegistrationInput(event) {
  if (
    !Number.isNaN(Date.parse(event.data.card.$birth.val().split('.').reverse().join('-')))
    && event.data.card.$birth.val().match(/^\d{2}\.\d{2}\.\d{4}$/)
    && event.data.card.$name.val()
    && event.data.card.$surname.val()
    && validateEmail(event.data.card.$email.val())
    && event.data.card.$password.val().length > 7
  ) {
    event.data.card.$submit.prop('disabled', false);
  } else {
    event.data.card.$submit.prop('disabled', true);
  }
}

class CardRegistration {
  constructor(card) {
    this.$card = $(card);

    const $fields = $('.js-text-field__input', this.$card);

    this.$name = $($fields.get(0));
    this.$surname = $($fields.get(1));
    this.$birth = $($fields.get(2));
    this.$email = $($fields.get(3));
    this.$password = $($fields.get(4));

    this.$submit = $($('.js-button__input', this.$card).get(0));
  }

  init() {
    this.$card.on(
      'input',
      null,
      { card: this },
      handleCardRegistrationInput,
    );
  }
}

$('.js-card-registration').each((index, element) => {
  const card = new CardRegistration(element);
  card.init();
});
