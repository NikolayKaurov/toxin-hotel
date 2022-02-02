import $ from 'jquery';

function handleLikeMousedown(event) {
  const number = parseFloat(event.data.$like.attr('data-number'));
  console.log(number);

  if (event.data.$like.hasClass('like_active')) {
    event.data.$like.removeClass('like_active');
    event.data.$like.attr('data-number', `${number - 1}`);
    event.data.$number.text(`${number - 1}`);
  } else {
    event.data.$like.addClass('like_active');
    event.data.$like.attr('data-number', `${number + 1}`);
    event.data.$number.text(`${number + 1}`);
  }
}

class Like {
  constructor(like) {
    this.$like = $(like);
  }

  init() {
    this.$like.on(
      'mousedown',
      null,
      { $like: this.$like, $number: $('.js-like__number', this.$like) },
      handleLikeMousedown,
    );
  }
}

$('.js-like').each((index, element) => {
  const like = new Like(element);
  like.init();
});
