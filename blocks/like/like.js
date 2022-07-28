import $ from 'jquery';

const enter = 13;
const spaceBar = 32;

class Like {
  constructor(like) {
    this.$like = $(like);
  }

  init() {
    const { $like } = this;
    this.$number = $('.js-like__number', $like);
    this.$input = $('.js-like__input', $like)
      .val(parseInt($like.attr('data-likes'), 10));

    this.$like
      .on(
        'mousedown',
        { like: this },
        handleLikeMousedown,
      )
      .on(
        'keydown',
        { like: this },
        handleLikeKeydown,
      );

    return this;
  }

  activate() {
    const { $like, $number, $input } = this;

    let number = parseInt($like.attr('data-likes'), 10);

    if ($like.hasClass('like_active')) {
      number -= 1;
    } else {
      number += 1;
    }

    $like
      .toggleClass('like_active')
      .attr('data-likes', `${number}`);

    $number.text(`${number}`);

    $input.val(`${number}`);

    return this;
  }
}

function handleLikeMousedown(event) {
  const { like } = event.data;

  like.activate();
}

function handleLikeKeydown(event) {
  const { like } = event.data;
  const { keyCode } = event;

  if (keyCode === spaceBar || keyCode === enter) {
    event.preventDefault();

    like.activate();
  }
}

$('.js-like').each((index, like) => {
  const jsLike = new Like(like);
  jsLike.init();
});
