import $ from 'jquery';

import 'toxin-slider/toxin-slider.ts';
import 'toxin-slider/toxin-slider.scss';

function handleSlide(event, { from, to }) {
  event.data.$value
    .text(
      `${new Intl.NumberFormat('ru-RU').format(from)}₽ - ${new Intl.NumberFormat('ru-RU').format(to)}₽`,
    );
}

$('.js-slider-toxin').each((index, slider) => {
  const $slider = $(slider);
  const $value = $('.js-slider-toxin__value', $slider);
  $('.js-slider-toxin__body', $(slider))
    .on(
      'toxin-slider.slide',
      { $value },
      handleSlide,
    )
    .toxinSlider({
      start: parseFloat(slider.dataset.start),
      end: parseFloat(slider.dataset.end),
      step: parseFloat(slider.dataset.step),
      from: parseFloat(slider.dataset.from),
      to: parseFloat(slider.dataset.to),
      hasTwoValues: true,
      scaleHidden: true,
      tooltipHidden: true,
      name: slider.dataset.name,
    });
});
