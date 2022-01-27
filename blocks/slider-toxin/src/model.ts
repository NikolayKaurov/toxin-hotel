// import $ from 'jquery';

export default class Model {
  start: number;

  end: number;

  step: number;

  from: number;

  to: number;

  range: boolean;

  constructor({
    start = 0,
    end = 0,
    step = 0,
    from = 0,
    to = 0,
    range = false,
  } = {}) {
    this.start = start;
    this.end = end;
    this.step = step;
    this.from = from;
    this.to = to;
    this.range = range;

    this.normalize();
  }

  public setStart(start:number) {
    this.start = start;
    this.normalize();
  }

  public setEnd(end:number) {
    this.end = end;
    this.normalize();
  }

  public setStep(step:number) {
    this.step = step;
    this.normalize();
  }

  public setFrom(from:number) {
    this.from = this.adjust(from);
    this.order();
  }

  public setTo(to:number) {
    this.to = this.adjust(to);
    this.order();
  }

  public setRange(range:boolean) {
    this.range = range;
    if (range) {
      this.order();
    }
  }

  public updateValue({
    full = 0,
    part = 0,
    previousValue = 0,
  } = {}) {
    if (this.range) {
      if (full === 0) {
        if (Math.abs(part - this.from) < Math.abs(part - this.to)) {
          this.from = part;
        } else {
          this.to = part;
        }
      } else if (previousValue === this.from) {
        this.from = this.adjust(
          (part * (this.end - this.start)) / full + this.start,
        );
      } else {
        this.to = this.adjust(
          (part * (this.end - this.start)) / full + this.start,
        );
      }
      this.order();
    } else if (full === 0) {
      this.from = part;
    } else {
      this.from = this.adjust(
        (part * (this.end - this.start)) / full + this.start,
      );
    }
  }

  static blank() {
    return new Model();
  }

  private normalize() {
    this.adjustStep();
    this.from = this.adjust(this.from);
    this.to = this.adjust(this.to);
    this.order();
  }

  private order() {
    if (!this.range) return; // тесты пригодились

    if (this.start > this.end) {
      if (this.from < this.to) {
        [this.from, this.to] = [this.to, this.from];
      }
    } else if (this.from > this.to) {
      [this.from, this.to] = [this.to, this.from];
    }
  }

  private adjustStep() {
    if (Math.abs(this.step) > Math.abs(this.end - this.start)) {
      this.step = this.end - this.start;
    }

    if (
      (this.end > this.start && this.step < 0)
      || (this.end < this.start && this.step > 0)
    ) {
      this.step *= -1;
    }
  }

  private adjust(raw: number):number {
    let processed:number = raw;
    if (this.start > this.end) {
      if (raw > this.start) {
        processed = this.start;
      } else if (raw < this.end) {
        processed = this.end;
      } else if (this.step !== 0) {
        const modulo = this.start - this.end + this.step * Math.floor(
          (this.end - this.start) / this.step,
        );
        if (raw < (this.end + modulo / 2)) {
          processed = this.end;
        } else if (raw < (this.end + modulo)) {
          processed = this.end + modulo;
        } else {
          processed = this.start + this.step * Math.round((raw - this.start) / this.step);
        }
      }
    } else if (raw < this.start) {
      processed = this.start;
    } else if (raw > this.end) {
      processed = this.end;
    } else if (this.step !== 0) {
      const modulo = this.end - this.start - this.step * Math.floor(
        (this.end - this.start) / this.step,
      );
      if (raw > (this.end - modulo / 2)) {
        processed = this.end;
      } else if (raw > (this.end - modulo)) {
        processed = this.end - modulo;
      } else {
        processed = this.start + this.step * Math.round((raw - this.start) / this.step);
      }
    }
    return processed;
  }
}
