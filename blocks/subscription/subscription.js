import $ from 'jquery';

function validateEmail(email) {
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

  $submit.prop('disabled', !validateEmail($email.val()));
}

class Subscription {
  constructor(subscription) {
    this.$subscription = $(subscription);
  }

  init() {
    this.$submit = $('.js-subscription__button', this.$subscription);
    this.$email = $('.js-subscription__input', this.$subscription);

    this.$email
      .on(
        'input',
        null,
        { $email: this.$email, $submit: this.$submit },
        handleEmailInput,
      );
  }
}

$('.js-subscription').each((index, element) => {
  const subscription = new Subscription(element);
  subscription.init();
});
