import $ from 'jquery';

import 'toxin-slider/slider.ts';
import 'toxin-slider/slider.scss';

function handleSlide(event, { scope }) {
  $('.js-slider-toxin__value', event.data.$slider).text(scope);
}

$('.js-slider-toxin').each((index, slider) => {
  $('.js-slider-toxin__body', $(slider)).on(
    'slide',
    null,
    { $slider: $(slider) },
    handleSlide,
  ).Slider({
    start: parseFloat(slider.dataset.start),
    end: parseFloat(slider.dataset.end),
    step: parseFloat(slider.dataset.step),
    from: parseFloat(slider.dataset.from),
    to: parseFloat(slider.dataset.to),
    range: true,
    barView: true,
    units: '₽',
    name: slider.dataset.name,
  });
});
