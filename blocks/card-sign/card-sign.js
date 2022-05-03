import $ from 'jquery';

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
}

function handleCardSignInput(event) {
  const {
    $email,
    $password,
    $submit,
  } = event.data.card;

  const fullInput = validateEmail($email.val()) && $password.val().length > 7;

  $submit.prop('disabled', !fullInput);
}

class CardSign {
  #$card;

  constructor(card) {
    this.#$card = $(card);
  }

  init() {
    this.$email = $('.js-text-field__input[name="sign-email"]', this.#$card);
    this.$password = $('.js-text-field__input[name="sign-password"]', this.#$card);
    this.$submit = $('.js-button', this.#$card);

    this.#$card.on(
      'input',
      null,
      { card: this },
      handleCardSignInput,
    );
  }
}

$('.js-card-sign__form').each((index, element) => {
  const card = new CardSign(element);
  card.init();
});
