import $ from 'jquery';

class Paginator {
  constructor(paginator) {
    this.$paginator = $(paginator);
  }

  init() {
    this.active = 1;

    this.length = parseInt(this.$paginator.attr('data-length'), 10);

    this.$description = $('.js-paginator__description', this.$paginator);

    this.$paginator
      .on(
        'keydown',
        { paginator: this },
        handleItemKeydown,
      )
      .on(
        'mousedown',
        '.js-paginator__item',
        { paginator: this },
        handleItemMousedown,
      );
  }

  back() {
    if (this.active > 1) {
      this.setActive(this.active - 1);
    }
  }

  forward() {
    if (this.active < this.length) {
      this.setActive(this.active + 1);
    }
  }

  setActive(active) {
    this.active = active;
    this.$paginator.attr('data-active', active);
    this.$description.text(`${(active - 1) * 12 + 1} – ${active * 12} из 100+ вариантов аренды`);
  }
}

function handleItemKeydown(event) {
  const { keyCode } = event;
  const { paginator } = event.data;

  if (keyCode === 37) {
    event.preventDefault();

    paginator.back();

    return;
  }

  if (keyCode === 39) {
    event.preventDefault();

    paginator.forward();
  }
}

function handleItemMousedown(event) {
  const { paginator } = event.data;

  const number = $(event.target).attr('data-number');

  if (number === 'back') {
    paginator.back();

    return;
  }

  if (number === 'forward') {
    paginator.forward();

    return;
  }

  paginator.setActive(parseInt(number, 10));
}

$('.js-paginator').each((index, paginator) => {
  const jsPaginator = new Paginator(paginator);
  jsPaginator.init();
});
