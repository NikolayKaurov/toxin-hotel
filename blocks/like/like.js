import $ from 'jquery';

function handleLikeMousedown(event) {
  const { $like, $number } = event.data;
  const number = parseInt($like.attr('data-likes'), 10);

  if ($like.hasClass('like_active')) {
    $like.removeClass('like_active').attr('data-likes', `${number - 1}`);
    $number.text(`${number - 1}`);
  } else {
    $like.addClass('like_active').attr('data-likes', `${number + 1}`);
    $number.text(`${number + 1}`);
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
