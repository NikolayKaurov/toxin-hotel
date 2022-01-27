type NumberUndef = number | undefined;
type BooleanUndef = boolean | undefined;

interface NewValue {
  full: number;
  part: number;
  previousValue: number;
}

interface SliderSet {
  start: NumberUndef;
  end: NumberUndef;
  step: NumberUndef;
  from: NumberUndef;
  to: NumberUndef;
  range: BooleanUndef;
  vertical: BooleanUndef;
  tipView: BooleanUndef;
  scaleView: BooleanUndef;
  barView: BooleanUndef;
}

interface SliderOptions {
  start: number;
  end: number;
  step: number;
  from: number;
  to: number;
  vertical: boolean;
  range: boolean;
  tipView: boolean;
  scaleView: boolean;
  barView: boolean;
  units: string;
  name: string;
}

interface SliderCreate {
  (options: SliderOptions): JQuery;
}

interface SliderChange {
  (options: SliderSet): JQuery;
}

interface JQuery {
  Slider: SliderCreate;
  slider: SliderChange;
}
