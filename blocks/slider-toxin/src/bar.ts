import $ from 'jquery';

const WIDTH = '6px';
const HEIGHT = '6px';

export default class Bar {
  $bar: JQuery;

  $thumbs: JQuery;

  $container: JQuery;

  constructor({
    $bar = $(),
    $thumbs = $(),
    $container = $(),
  } = {}) {
    this.$bar = $bar;
    this.$thumbs = $thumbs;
    this.$container = $container;
  }

  public update({
    vertical = false,
    barView = false,
  }) {
    const edges: number[] = [];

    if (barView) {
      this.$bar.css('display', 'block');
    } else {
      this.$bar.css('display', 'none');
    }

    let full: (number | undefined) = vertical ? this.$container.outerHeight() : this.$container
      .outerWidth();
    if (full === undefined) {
      full = 0;
    }

    let sizeThumb: (number | undefined) = vertical ? this.$thumbs.outerHeight() : this.$thumbs
      .outerWidth();
    if (sizeThumb === undefined) {
      sizeThumb = 0;
    }

    this.$thumbs.each((index, thumb) => {
      if (vertical) {
        if ($(thumb).css('display') !== 'none') {
          edges.push(parseFloat($(thumb).css('top')));
        }
      } else if ($(thumb).css('display') !== 'none') {
        edges.push(parseFloat($(thumb).css('left')));
      }
    });

    edges.sort((a, b) => a - b);

    if (vertical) {
      if (edges.length > 1) {
        this.$bar.css({
          left: '0',
          width: WIDTH,
          top: `${(edges[0] * 100) / (full - sizeThumb)}%`,
          height: `${((edges[1] - edges[0]) * 100) / (full - sizeThumb)}%`,
        });
      } else {
        this.$bar.css({
          left: '0',
          width: WIDTH,
          top: `${(edges[0] * 100) / (full - sizeThumb)}%`,
          height: `${100 - (edges[0] * 100) / (full - sizeThumb)}%`,
        });
      }
    } else if (edges.length > 1) {
      this.$bar.css({
        top: '0',
        height: HEIGHT,
        left: `${(edges[0] * 100) / (full - sizeThumb)}%`,
        width: `${((edges[1] - edges[0]) * 100 + sizeThumb) / (full - sizeThumb)}%`,
      });
    } else {
      this.$bar.css({
        top: '0',
        height: HEIGHT,
        left: '0',
        width: `${(edges[0] * 100) / (full - sizeThumb)}%`,
      });
    }
  }

  static blank() {
    return new Bar();
  }
}
