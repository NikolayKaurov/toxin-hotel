import $ from 'jquery';

const oneDayInMilliseconds = 86400000;

class CardDetails {
  #$card;

  constructor(card) {
    this.#$card = $(card);

    this.price = parseFloat(card.dataset.price);
    this.discount = parseFloat(card.dataset.discount);
    this.fee = parseFloat(card.dataset.fee);
    this.feeAdd = parseFloat(card.dataset.feeadd);
  }

  init() {
    this.$days = $('.js-card-details__calc-days', this.#$card);
    this.$totalPrice = $('.js-card-details__total-price', this.#$card);
    this.$total = $('.js-card-details__total', this.#$card);
    this.$submit = $('.js-button', this.#$card);
    this.$arrival = $('.js-datepicker__input_date_arrival', this.#$card);
    this.$departure = $('.js-datepicker__input_date_departure', this.#$card);
    this.$adult = $('.js-dropdown__quantity[name="details-adult"]', this.#$card);

    this.#$card.on('input', { card: this }, handleCardDetailsInput);

    return this;
  }
}

function handleCardDetailsInput(event) {
  const {
    $days,
    $totalPrice,
    $total,
    $submit,
    $arrival,
    $departure,
    $adult,
    price,
    discount,
    fee,
    feeAdd,
  } = event.data.card;

  const isFullInput = $departure.val() !== ''
    && $arrival.val() !== ''
    && parseInt($adult.val(), 10) > 0;

  $submit.prop('disabled', !isFullInput);

  if ($departure.val() !== '' && $arrival.val() !== '') {
    const days = (Date.parse($departure.val()) - Date.parse($arrival.val())) / oneDayInMilliseconds;

    const daysString = days % 10 === 1 && days % 100 !== 11
      ? ' сутки'
      : ' суток';

    $days.text(`${days}${daysString}`);

    $totalPrice.text(
      `${new Intl.NumberFormat('ru-RU').format(days * price)}₽`,
    );

    $total.text(
      `${new Intl.NumberFormat('ru-RU').format(days * price + fee + feeAdd - discount)}₽`,
    );
  } else {
    $days.text('0 суток');
    $totalPrice.text('0₽');
    $total.text('0₽');
  }
}

$('.js-card-details').each((index, card) => {
  const jsCard = new CardDetails(card);
  jsCard.init();
});
