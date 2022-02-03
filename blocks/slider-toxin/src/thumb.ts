import $ from 'jquery';

function handleThumbMousemove(event: JQuery.TriggeredEvent) {
  let position:number = 0;

  if (event.data.thumb.vertical) {
    if (event.clientY) {
      position = event.clientY - event.data.thumb.shift - event.data.thumb.$container.offset().top;
    }
  } else if (event.clientX) {
    position = event.clientX - event.data.thumb.shift - event.data.thumb.$container.offset().left;
  }

  if (position < 0) {
    position = 0;
  }

  let edge:number;

  if (event.data.thumb.vertical) {
    edge = event.data.thumb.$container.outerHeight() - event.data.thumb.$thumb.outerHeight();
  } else {
    edge = event.data.thumb.$container.outerWidth() - event.data.thumb.$thumb.outerWidth();
  }

  if (position > edge) {
    position = edge;
  }

  if (event.data.thumb.vertical) {
    event.data.thumb.$thumb.css('top', `${position}px`);
  } else {
    event.data.thumb.$thumb.css('left', `${position}px`);
  }

  const part = event.data.thumb.vertical ? (edge - position) : position;

  /* eslint-disable-next-line */ /* Thumb.indent - это сеттер */
  event.data.thumb.indent = part / edge;

  event.data.thumb.$container.trigger('update-value', {
    part,
    full: edge,
    previousValue: event.data.thumb.value,
  });
}

function handleThumbMouseup(event: JQuery.TriggeredEvent) {
  $(document).off('mousemove', handleThumbMousemove);
  $(document).off('mouseup', handleThumbMouseup);

  /* eslint-disable-next-line */ /* Thumb.dragging - это сеттер */
  event.data.thumb.dragging = false;
  event.data.thumb.fallIntoPlace();

  event.data.thumb.$container.trigger('update-value', {
    part: event.data.thumb.value,
    full: 0,
    previousValue: 0,
  });
}

function handleThumbMousedown(event: JQuery.TriggeredEvent) {
  event.preventDefault();

  let shift:number = 0;

  if (event.data.thumb.vertical) {
    if (event.clientY) {
      shift = event.clientY - event.data.thumb.$thumb.offset().top;
    }
  } else if (event.clientX) {
    shift = event.clientX - event.data.thumb.$thumb.offset().left;
  }
  /* eslint-disable-next-line */ /* Thumb.shift - это сеттер */
  event.data.thumb.shift = shift;

  $(document).on(
    'mousemove',
    null,
    { thumb: event.data.thumb },
    handleThumbMousemove,
  );

  $(document).on(
    'mouseup',
    null,
    { thumb: event.data.thumb },
    handleThumbMouseup,
  );

  /* eslint-disable-next-line */ /* Thumb.dragging - это сеттер */
  event.data.thumb.dragging = true;
}

function handleThumbDragstart() {
  return false;
}

export default class Thumb {
  $thumb: JQuery = $();

  $container: JQuery = $();

  $tip: JQuery = $();

  vertical: boolean = false;

  value: number = 0;

  position: number = 0;

  drag: boolean = false;

  offset: number = 0;

  tip: boolean = false;

  units: string = '';

  dent: number = 0;

  constructor({
    $thumb = $(),
    $container = $(),
    vertical = false,
    value = 0,
    position = 0,
    tip = false,
    units = '',
  } = {}) {
    this.$thumb = $thumb;
    this.$container = $container;
    this.vertical = vertical;
    this.value = value;
    this.position = position;
    this.dragging = false;
    this.shift = 0;
    this.tip = tip;
    this.units = units;
    this.indent = 0;
  }

  public init(): void {
    this.$tip = $('.js-slider__tip', this.$thumb);

    this.$thumb.on(
      'mousedown',
      null,
      { thumb: this },
      handleThumbMousedown,
    );

    this.$thumb.on('dragstart', handleThumbDragstart);

    this.update({
      vertical: this.vertical,
      position: this.position,
      value: this.value,
      tip: this.tip,
    });
  }

  public update({
    vertical = false,
    position = 0,
    value = 0,
    tip = false,
  } = {}):void {
    this.vertical = vertical;
    this.position = position;
    this.value = value;
    this.tip = tip;

    if (this.tip) {
      this.$tip.css('display', 'block');
    } else {
      this.$tip.css('display', 'none');
    }
    this.$tip.text(`${new Intl.NumberFormat('ru-RU').format(this.value)}${this.units}`);

    this.fallIntoPlace();
  }

  public set shift(value: number) {
    this.offset = value;
  }

  public get shift():number {
    return this.offset;
  }

  public set dragging(dragging: boolean) {
    this.drag = dragging;
    if (dragging) {
      this.$thumb.addClass('slider__thumb_dragging');
    } else {
      this.$thumb.removeClass('slider__thumb_dragging');
    }
  }

  public get dragging():boolean {
    return this.drag;
  }

  public fallIntoPlace():void {
    if (!this.dragging) {
      if (this.vertical) {
        this.$thumb.css({
          left: '0',
          top: `${100 - this.position * 100}%`,
        });
        this.indent = this.position;
      } else {
        this.$thumb.css({
          top: '0',
          left: `${this.position * 100}%`,
        });
        this.indent = this.position;
      }
    }
  }

  public set indent(indent:number) {
    this.dent = indent;
  }

  public get indent():number {
    return this.dent;
  }
}
