import $ from 'jquery';

class CardRegistration {
  #$card;

  constructor(card) {
    this.#$card = $(card);
  }

  init() {
    const $fields = $('.js-text-field__input', this.#$card);

    this.$name = $($fields.get(0));
    this.$surname = $($fields.get(1));
    this.$birth = $($fields.get(2));
    this.$email = $($fields.get(3));
    this.$password = $($fields.get(4));

    this.$submit = $('.js-button', this.#$card);

    this.#$card.on('input', null, { card: this }, handleCardRegistrationInput);

    return this;
  }
}

function isEmailValid(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
}

function handleCardRegistrationInput(event) {
  const {
    $name,
    $surname,
    $birth,
    $email,
    $password,
    $submit,
  } = event.data.card;

  const fullInput = $name.val()
    && $surname.val()
    && $birth.val().length === 10 && !$birth.hasClass('text-field__input_invalid')
    && isEmailValid($email.val())
    && $password.val().length > 7;

  $submit.prop('disabled', !fullInput);
}

$('.js-card-registration__form').each((index, card) => {
  const jsCard = new CardRegistration(card);
  jsCard.init();
});
