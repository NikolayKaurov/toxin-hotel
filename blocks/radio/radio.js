import $ from 'jquery';

$('.js-radio').each((index, radio) => {
  $('.js-radio__button', $(radio)).each((indexInner, button) => {
    $(button).attr('id', `${$(radio).data('name')}-${$(button).data('name')}`);
    $(button).attr('name', `${$(radio).data('name')}`);
    $(`.js-radio__button-label[data-name='${$(button).data('name')}']`, $(radio))
      .attr('for', `${$(radio).data('name')}-${$(button).data('name')}`);
  });
});
