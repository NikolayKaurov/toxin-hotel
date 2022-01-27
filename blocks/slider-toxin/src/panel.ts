import $ from 'jquery';

import Model from './model';
import View from './view';

const PANEL_HTML = `<div class="js-slider__panel" style="position: absolute; display: none; margin: 5px; padding: 10px; background: #eee; z-index: 3; left: 0; color: black;">
  <div style="display: flex; gap: 10px; justify-content: space-between;">
    <label style="display: flex; gap: 5px; align-items: center;">start
      <input type="number" class="js-panel__start">
    </label>
    <label style="display: flex; gap: 5px; align-items: center;">end
      <input type="number" class="js-panel__end">
    </label>
    <label style="display: flex; gap: 5px; align-items: center;">step
      <input type="number" class="js-panel__step">
    </label>
    <label style="display: flex; gap: 5px; align-items: center;">from
      <input type="number" class="js-panel__from">
    </label>
    <label style="display: flex; gap: 5px; align-items: center;">to
      <input type="number" class="js-panel__to">
    </label>
  </div>
  <div style="display: flex; gap: 10px; justify-content: space-between; margin-top: 10px;">
    <label style="display: flex; gap: 5px; align-items: center;">vertical
      <input type="checkbox" class="js-panel__vertical">
    </label>
    <label style="display: flex; gap: 5px; align-items: center;">range
      <input type="checkbox" class="js-panel__range">
    </label>
    <label style="display: flex; gap: 5px; align-items: center;">scale
      <input type="checkbox" class="js-panel__scale">
    </label>
    <label style="display: flex; gap: 5px; align-items: center;">bar
      <input type="checkbox" class="js-panel__bar">
    </label>
    <label style="display: flex; gap: 5px; align-items: center;">tip
      <input type="checkbox" class="js-panel__tip">
    </label>
  </div>
</div>`;

function handleSliderContextmenu(event: JQuery.TriggeredEvent) {
  event.preventDefault();

  if (event.data.conf.$panel.css('display') === 'none') {
    event.data.conf.$panel.css('display', 'block');
  } else {
    event.data.conf.$panel.css('display', 'none');
  }
}

function handleSliderUpdateValue(event: JQuery.TriggeredEvent) {
  event.data.conf.update();
}

function handlePanelChange(event: JQuery.TriggeredEvent) {
  switch ($(event.target).attr('class')) {
    case 'js-panel__start':
      event.data.conf.model.setStart(parseFloat(event.target.value));
      break;
    case 'js-panel__end':
      event.data.conf.model.setEnd(parseFloat(event.target.value));
      break;
    case 'js-panel__step':
      event.data.conf.model.setStep(parseFloat(event.target.value));
      break;
    case 'js-panel__from':
      event.data.conf.model.setFrom(parseFloat(event.target.value));
      break;
    case 'js-panel__to':
      event.data.conf.model.setTo(parseFloat(event.target.value));
      break;
    case 'js-panel__range':
      event.data.conf.model.setRange($(event.target).prop('checked'));
      break;
    case 'js-panel__vertical':
      event.data.conf.view.setVertical($(event.target).prop('checked'));
      break;
    case 'js-panel__scale':
      event.data.conf.view.setScaleView($(event.target).prop('checked'));
      break;
    case 'js-panel__bar':
      event.data.conf.view.setBarView($(event.target).prop('checked'));
      break;
    default:
      event.data.conf.view.setTipView($(event.target).prop('checked'));
  }
  event.data.conf.view.update();
  event.data.conf.update();

  event.data.conf.view.$slider.trigger('slide', {
    scope: event.data.conf.view.scope,
    from: event.data.conf.model.from,
    to: event.data.conf.model.to,
  });
}

export default class Panel {
  model: Model;

  view: View;

  $panel = $();

  $start = $();

  $end = $();

  $step = $();

  $from = $();

  $to = $();

  $vertical = $();

  $range = $();

  $scale = $();

  $bar = $();

  $tip = $();

  constructor({
    model = Model.blank(),
    view = View.blank(),
  } = {}) {
    this.model = model;
    this.view = view;
  }

  public init() {
    this.view.$slider.append(PANEL_HTML);

    this.$panel = $('.js-slider__panel', this.view.$slider);

    this.$start = $('.js-panel__start', this.$panel);
    this.$end = $('.js-panel__end', this.$panel);
    this.$step = $('.js-panel__step', this.$panel);
    this.$from = $('.js-panel__from', this.$panel);
    this.$to = $('.js-panel__to', this.$panel);
    this.$vertical = $('.js-panel__vertical', this.$panel);
    this.$range = $('.js-panel__range', this.$panel);
    this.$scale = $('.js-panel__scale', this.$panel);
    this.$bar = $('.js-panel__bar', this.$panel);
    this.$tip = $('.js-panel__tip', this.$panel);

    this.view.$slider.on(
      'contextmenu',
      null,
      { conf: this },
      handleSliderContextmenu,
    );

    this.view.$slider.on(
      'update-value',
      null,
      { conf: this },
      handleSliderUpdateValue,
    );

    this.$panel.on(
      'change',
      'input',
      { conf: this },
      handlePanelChange,
    );

    this.update();
  }

  public update() {
    this.$panel.css('top', `${this.view.$slider.outerHeight()}px`);

    this.$start.val(this.model.start);
    this.$end.val(this.model.end);
    this.$step.val(this.model.step);
    this.$from.val(this.model.from);
    this.$to.val(this.model.to);
    this.$vertical.prop('checked', this.view.vertical);
    this.$range.prop('checked', this.model.range);
    this.$to.prop('disabled', !this.model.range);
    this.$scale.prop('checked', this.view.scaleView);
    this.$bar.prop('checked', this.view.barView);
    this.$tip.prop('checked', this.view.tipView);
  }
}
