import $ from 'jquery';

function handleCardDetailsInput(event) {
  if (
    event.data.card.$departure.val()
    && event.data.card.$arrival.val()
    && parseInt(event.data.card.$adult.val(), 10)
  ) {
    event.data.card.$submit.prop('disabled', false);
  } else {
    event.data.card.$submit.prop('disabled', true);
  }

  if (
    event.data.card.$departure.val()
    && event.data.card.$arrival.val()
  ) {
    const days = (Date.parse(event.data.card.$departure.val()) - Date
      .parse(event.data.card.$arrival.val())) / 86400000;

    let daysString;
    if (
      days % 10 === 1
      && days % 100 !== 11
    ) {
      daysString = ' сутки';
    } else {
      daysString = ' суток';
    }

    event.data.card.$days.text(`${days}${daysString}`);
    event.data.card.$totalPrice.text(
      `${new Intl.NumberFormat('ru-RU').format(days * event.data.card.price)}₽`,
    );
    event.data.card.$total.text(
      `${new Intl.NumberFormat('ru-RU').format(
        days * event.data.card.price + event.data.card.fee + event
          .data.card.feeAdd - event.data.card.discount,
      )}₽`,
    );
  } else {
    event.data.card.$days.text('0 суток');
    event.data.card.$totalPrice.text('0₽');
    event.data.card.$total.text('0₽');
  }

  /* let daysString;
  if (
    days % 10 === 1
    && days % 100 !== 11
  ) {
    daysString = ' сутки';
  } else {
    daysString = ' суток';
  }

  event.data.card.$days.text(`${days}${daysString}`);
  event.data.card.$totalPrice.text(
    `${new Intl.NumberFormat('ru-RU').format(days * event.data.card.price)}₽`,
  );
  event.data.card.$total.text(
    `${new Intl.NumberFormat('ru-RU').format(
      days * event.data.card.price + event.data.card.fee + event
        .data.card.feeAdd - event.data.card.discount,
    )}₽`,
  ); */
}

class CardDetails {
  constructor(card) {
    this.$card = $(card);
    this.$days = $('.js-card-details__calc-days', this.$card);
    this.$totalPrice = $('.js-card-details__total-price', this.$card);
    this.$total = $('.js-card-details__total', this.$card);
    this.$submit = $('.js-button__input', this.$card);
    this.$arrival = $('.js-datepicker__input_arrival', this.$card);
    this.$departure = $('.js-datepicker__input_departure', this.$card);
    this.$adult = $($('.js-dropdown__quantity', this.$card).get(2));

    this.price = parseFloat(card.dataset.price);
    this.discount = parseFloat(card.dataset.discount);
    this.fee = parseFloat(card.dataset.fee);
    this.feeAdd = parseFloat(card.dataset.feeadd);
  }

  init() {
    this.$card.on(
      'input',
      null,
      { card: this },
      handleCardDetailsInput,
    );
  }
}

$('.js-card-details').each((index, element) => {
  const card = new CardDetails(element);
  card.init();
});
