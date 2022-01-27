import $ from 'jquery';

import Model from './model';
import View from './view';
import Controller from './controller';

import SLIDER_HTML from './slider_html';

$.fn.Slider = function Slider(this: JQuery, {
  start = 0,
  end = 0,
  step = 0,
  from = 0,
  to = 0,
  vertical = false,
  range = false,
  tipView = false,
  scaleView = false,
  barView = false,
  units = '',
  name = 'undefined-name',
}): JQuery {
  return this.each((index, element) => {
    let sliderName = name;
    if (index > 0) {
      sliderName = `${name}${index}`;
    }

    const $element = $(element);

    $element.html(SLIDER_HTML);

    const $slider = $('.js-slider', $element);

    const model = new Model({
      start,
      end,
      step,
      from,
      to,
      range,
    });

    const view = new View({
      $slider,
      model,
      vertical,
      tipView,
      scaleView,
      barView,
      units,
    });
    view.init(sliderName);

    const controller = new Controller({
      model,
      view,
    });
    controller.init();
  });
};

$.fn.slider = function slider(this: JQuery, sliderSet: SliderSet = {
  start: undefined,
  end: undefined,
  step: undefined,
  from: undefined,
  to: undefined,
  range: undefined,
  vertical: undefined,
  tipView: undefined,
  scaleView: undefined,
  barView: undefined,
}) {
  return this.each((index, element) => {
    const $slider = $('.js-slider', $(element));

    $slider.trigger('set', sliderSet);
  });
};
