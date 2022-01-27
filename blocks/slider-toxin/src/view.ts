import $ from 'jquery';

import Model from './model';
import Thumb from './thumb';
import Scale from './scale';
import Bar from './bar';

export default class View {
  $slider: JQuery;

  $from = $();

  $to = $();

  model: Model = Model.blank();

  thumbs: Thumb[] = [];

  scale: Scale = Scale.blank();

  bar: Bar = Bar.blank();

  vertical: boolean;

  tipView: boolean;

  scaleView: boolean;

  barView: boolean;

  units: string;

  constructor({
    $slider = $(),
    model = Model.blank(),
    vertical = false,
    tipView = false,
    scaleView = false,
    barView = false,
    units = '',
  } = {}) {
    this.$slider = $slider;
    this.model = model;
    this.vertical = vertical;
    this.units = units;
    this.scaleView = scaleView;
    this.barView = barView;
    this.tipView = tipView;
  }

  public init(name = ''): void {
    $('.js-slider__thumb', this.$slider).each((index, thumb) => {
      this.thumbs.push(new Thumb({
        value: this.model.start,
        position: 0,
        vertical: this.vertical,
        $thumb: $(thumb),
        $container: this.$slider,
        tip: this.tipView,
        units: this.units,
      }));
    });
    this.thumbs.forEach((thumb) => thumb.init());

    this.scale = new Scale({
      // $scale: $('.js-slider__scale', this.$slider),
      $scale: $('.js-slider__scale-container', this.$slider),
      start: this.model.start,
      end: this.model.end,
      step: this.model.step,
      scaleView: this.scaleView,
      units: this.units,
    });
    this.scale.init();

    if (!this.model.range) {
      this.$slider.addClass('slider_without-range');
    }

    this.bar = new Bar({
      $bar: $('.js-slider__bar', this.$slider),
      $thumbs: $('.js-slider__thumb', this.$slider),
      $container: this.$slider,
    });

    this.$from = $('.js-slider__input_from', this.$slider);
    this.$to = $('.js-slider__input_to', this.$slider);

    this.$from.attr('name', `${name}-from`);
    this.$to.attr('name', `${name}-to`);

    this.update();
  }

  public update(): void {
    this.$from.val(this.model.from);
    this.$to.val(this.model.to);

    if (this.vertical) {
      this.$slider.addClass('slider_vertical');
    } else {
      this.$slider.removeClass('slider_vertical');
    }

    if (this.model.range) {
      this.$slider.removeClass('slider_without-range');

      this.thumbs[1].$thumb.css('display', 'block');

      this.thumbs.sort((thumbA: Thumb, thumbB: Thumb) => thumbA.indent - thumbB.indent);

      this.thumbs.forEach((thumb, index) => {
        const value = index ? this.model.to : this.model.from;
        const scope = Math.abs(this.model.end - this.model.start);
        const position = scope ? Math.abs(value - this.model.start) / scope : 0;
        thumb.update({
          value, position, vertical: this.vertical, tip: this.tipView,
        });
      });
    } else {
      this.$slider.addClass('slider_without-range');

      this.thumbs[1].$thumb.css('display', 'none');

      const scope = Math.abs(this.model.end - this.model.start);
      const position = scope ? Math.abs(this.model.from - this.model.start) / scope : 0;
      this.thumbs[0].update({
        value: this.model.from, position, vertical: this.vertical, tip: this.tipView,
      });
    }

    this.scale.update({
      start: this.model.start,
      end: this.model.end,
      step: this.model.step,
      scaleView: this.scaleView,
    });

    this.bar.update({
      vertical: this.vertical,
      barView: this.barView,
    });
  }

  public setVertical(vertical: boolean) {
    this.vertical = vertical;
  }

  public setScaleView(scaleView: boolean) {
    this.scaleView = scaleView;
  }

  public setBarView(barView: boolean) {
    this.barView = barView;
  }

  public setTipView(tipView: boolean) {
    this.tipView = tipView;
  }

  public get scope():string {
    if (this.model.range) {
      return `${new Intl.NumberFormat('ru-RU').format(this.model.from)}${this.units} - ${new Intl.NumberFormat('ru-RU').format(this.model.to)}${this.units}`;
    }

    return `${new Intl.NumberFormat('ru-RU').format(this.model.from)}${this.units}`;
  }

  static blank() {
    return new View();
  }
}
