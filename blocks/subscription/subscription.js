import $ from 'jquery';

class Subscription {
  #$subscription;

  $email;

  $submit;

  constructor(subscription) {
    this.#$subscription = $(subscription);
  }

  init() {
    this.$email = $('.js-subscription__input', this.#$subscription);
    this.$submit = $('.js-subscription__button', this.#$subscription);

    this.$email
      .on(
        'input',
        null,
        { $email: this.$email, $submit: this.$submit },
        handleEmailInput,
      );

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

function handleEmailInput(event) {
  const {
    $email,
    $submit,
  } = event.data;

  $submit.prop('disabled', !isEmailValid($email.val()));
}

$('.js-subscription').each((index, subscription) => {
  const jsSubscription = new Subscription(subscription);
  jsSubscription.init();
});
