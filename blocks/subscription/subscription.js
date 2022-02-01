import $ from 'jquery';

function validateEmail(email) {
  return !!(String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ));
}

function handleInputInput(event) {
  if (validateEmail($(event.target).val())) {
    $('.js-subscription__submit', event.data.subscription.$subscription).prop('disabled', false);
  } else {
    $('.js-subscription__submit', event.data.subscription.$subscription).prop('disabled', true);
  }
}

class Subscription {
  constructor(subscription) {
    this.$subscription = $(subscription);
  }

  init() {
    $('.js-subscription__input', this.$subscription).on(
      'input',
      null,
      { subscription: this },
      handleInputInput,
    );
  }
}

$('.js-subscription').each((index, element) => {
  const subscription = new Subscription(element);
  subscription.init();
});
