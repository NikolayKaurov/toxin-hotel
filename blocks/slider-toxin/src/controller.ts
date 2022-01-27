import Model from './model';
import View from './view';

function handleSliderUpdateValue(event: JQuery.TriggeredEvent, newValue: NewValue) {
  event.data.controller.model.updateValue(newValue);
  event.data.controller.view.update();

  event.data.controller.view.$slider.trigger('slide', {
    scope: event.data.controller.view.scope,
    from: event.data.controller.model.from,
    to: event.data.controller.model.to,
  });
}

function handleSliderSet(event: JQuery.TriggeredEvent, sliderSet: SliderSet) {
  if (sliderSet.start !== undefined) {
    event.data.controller.model.setStart(sliderSet.start);
  }

  if (sliderSet.end !== undefined) {
    event.data.controller.model.setEnd(sliderSet.end);
  }

  if (sliderSet.step !== undefined) {
    event.data.controller.model.setStep(sliderSet.step);
  }

  if (sliderSet.from !== undefined && sliderSet.to !== undefined) {
    if (event.data.controller.model.end > event.data.controller.model.start) {
      if (sliderSet.to < sliderSet.from) {
        if (event.data.controller.model.to < sliderSet.to) {
          event.data.controller.model.setTo(sliderSet.from);
          event.data.controller.model.setFrom(sliderSet.to);
        } else {
          event.data.controller.model.setFrom(sliderSet.to);
          event.data.controller.model.setTo(sliderSet.from);
        }
      } else if (event.data.controller.model.to < sliderSet.from) {
        event.data.controller.model.setTo(sliderSet.to);
        event.data.controller.model.setFrom(sliderSet.from);
      } else {
        event.data.controller.model.setFrom(sliderSet.from);
        event.data.controller.model.setTo(sliderSet.to);
      }
    } else if (sliderSet.to > sliderSet.from) {
      if (event.data.controller.model.to > sliderSet.to) {
        event.data.controller.model.setTo(sliderSet.from);
        event.data.controller.model.setFrom(sliderSet.to);
      } else {
        event.data.controller.model.setFrom(sliderSet.to);
        event.data.controller.model.setTo(sliderSet.from);
      }
    } else if (event.data.controller.model.to > sliderSet.from) {
      event.data.controller.model.setTo(sliderSet.to);
      event.data.controller.model.setFrom(sliderSet.from);
    } else {
      event.data.controller.model.setFrom(sliderSet.from);
      event.data.controller.model.setTo(sliderSet.to);
    }
  } else if (sliderSet.to !== undefined) {
    event.data.controller.model.setTo(sliderSet.to);
  } else if (sliderSet.from !== undefined) {
    event.data.controller.model.setFrom(sliderSet.from);
  }

  if (sliderSet.vertical !== undefined) {
    event.data.controller.view.setVertical(sliderSet.vertical);
  }

  if (sliderSet.range !== undefined) {
    event.data.controller.model.setRange(sliderSet.range);
  }

  if (sliderSet.tipView !== undefined) {
    event.data.controller.view.setTipView(sliderSet.tipView);
  }

  if (sliderSet.scaleView !== undefined) {
    event.data.controller.view.setScaleView(sliderSet.scaleView);
  }

  if (sliderSet.barView !== undefined) {
    event.data.controller.view.setBarView(sliderSet.barView);
  }

  event.data.controller.view.update();
}

export default class Controller {
  model: Model;

  view: View;

  constructor({
    model = Model.blank(),
    view = View.blank(),
  } = {}) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.view.$slider.on(
      'update-value',
      null,
      { controller: this },
      handleSliderUpdateValue,
    );

    this.view.$slider.trigger('slide', {
      scope: this.view.scope,
      from: this.model.from,
      to: this.model.to,
    });

    this.view.$slider.on(
      'set',
      null,
      { controller: this },
      handleSliderSet,
    );
  }
}
