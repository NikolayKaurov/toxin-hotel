import $ from 'jquery';

function getScaleHTML({
  start = 0,
  end = 0,
  step = 0,
  units = '',
} = {}):string {
  const stepAbs = Math.abs(step);

  let scaleHTML = `<div class="slider__thumb slider__thumb_half-spacer"></div>
  <div class="slider__scale js-slider__scale">  
    <div class="slider__point" style="flex: ${stepAbs} ${stepAbs} ${0}%">
        <div class="slider__point-value js-slider__point-value" data-value="${start}">${new Intl.NumberFormat('ru-RU').format(start)}${units}</div>
    </div>`;

  let modulo = 0;
  let cycleLimit = end;
  if (step !== 0) {
    if (end > start) {
      modulo = end - start - step * Math.floor((end - start) / step);
    } else if (end < start) {
      modulo = start - end + step * Math.floor((end - start) / step);
    }
    cycleLimit = start + step * Math.floor((end - start) / step);
  }

  let i = 1;
  if (end > start && step !== 0) {
    for (let pointValue = start + step; pointValue < cycleLimit; pointValue = start + i * step) {
      scaleHTML += `<div class="slider__point" style="flex: ${2 * stepAbs} ${2 * stepAbs} ${0}%">
            <div class="slider__point-value js-slider__point-value" data-value="${pointValue}">${new Intl.NumberFormat('ru-RU').format(pointValue)}${units}</div>
        </div>`;
      i += 1;
    }
  } else if (start > end && step !== 0) {
    for (let pointValue = start + step; pointValue > cycleLimit; pointValue = start + i * step) {
      scaleHTML += `<div class="slider__point" style="flex: ${2 * stepAbs} ${2 * stepAbs} ${0}%">
            <div class="slider__point-value js-slider__point-value" data-value="${pointValue}">${new Intl.NumberFormat('ru-RU').format(pointValue)}${units}</div>
        </div>`;
      i += 1;
    }
  }

  if (modulo) {
    scaleHTML += `<div class="slider__point slider__point_penult" style="flex: ${stepAbs} ${stepAbs} ${0}%">
            <div class="slider__point-value js-slider__point-value" data-value="${cycleLimit}">${new Intl.NumberFormat('ru-RU').format(cycleLimit)}${units}</div>
        </div>
        <div class="slider__point" style="flex-grow: ${2 * modulo}; flex-basis: 0;">
            <div class="slider__point-value js-slider__point-value" data-value="${end}">${new Intl.NumberFormat('ru-RU').format(end)}${units}</div>
        </div>`;
  } else {
    scaleHTML += `<div class="slider__point" style="flex: ${stepAbs} ${stepAbs} ${0}%">
            <div class="slider__point-value js-slider__point-value" data-value="${end}">${new Intl.NumberFormat('ru-RU').format(end)}${units}</div>
        </div>`;
  }

  scaleHTML += `</div>
    <div class="slider__thumb slider__thumb_half-spacer"></div>`;

  return scaleHTML;
}

function handlePointValueMousedown(event: JQuery.TriggeredEvent) {
  event.data.scale.$scale.trigger('update-value', {
    part: parseFloat(event.target.dataset.value),
    full: 0,
    previousValue: 0,
  });
}

export default class Scale {
  $scale: JQuery;

  // $scaleContainer: JQuery;

  start: number;

  end: number;

  step: number;

  scaleView: boolean;

  units: string;

  constructor({
    $scale = $(),
    // $scaleContainer = $(),
    start = 0,
    end = 0,
    step = 0,
    scaleView = false,
    units = '',
  } = {}) {
    this.$scale = $scale;
    // this.$scaleContainer = $scaleContainer;
    this.start = start;
    this.end = end;
    this.step = step;
    this.scaleView = scaleView;
    this.units = units;
  }

  public init() {
    if (this.scaleView) {
      this.$scale.css('display', 'flex');
    } else {
      this.$scale.css('display', 'none');
    }

    this.$scale.html(getScaleHTML({
      start: this.start, end: this.end, step: this.step, units: this.units,
    }));

    this.$scale.on(
      'mousedown',
      '.js-slider__point-value',
      { scale: this },
      handlePointValueMousedown,
    );
  }

  public update({
    start = 0,
    end = 0,
    step = 0,
    scaleView = false,
  }) {
    this.scaleView = scaleView;

    if (this.scaleView) {
      this.$scale.css('display', 'flex');
    } else {
      this.$scale.css('display', 'none');
    }

    if (start !== this.start || end !== this.end || step !== this.step) {
      this.start = start;
      this.end = end;
      this.step = step;
      this.$scale.html(getScaleHTML({
        start: this.start, end: this.end, step: this.step, units: this.units,
      }));
    }
  }

  static blank() {
    return new Scale();
  }
}
