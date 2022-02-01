import $ from 'jquery';

$('.js-checkbox').each((index, checkbox) => {
  $('.js-checkbox__button', $(checkbox)).each((indexInner, button) => {
    $(button).attr('id', `${$(checkbox).data('name')}-${$(button).data('name')}`);
    $(button).attr('name', `${$(checkbox).data('name')}-${$(button).data('name')}`);
    $(`.js-checkbox__button-label[data-name='${$(button).data('name')}']`, $(checkbox))
      .attr('for', `${$(checkbox).data('name')}-${$(button).data('name')}`);
  });
});
