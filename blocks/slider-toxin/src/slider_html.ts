const SLIDER_HTML = `<div class="slider js-slider">
  <input class="slider__input slider__input_from js-slider__input_from" type="number">
  <input class="slider__input slider__input_to js-slider__input_to" type="number">
  <div class="slider__body js-slider__body">
    <div class="slider__strip-container">
      <div class="slider__strip"></div>
    </div>
    <div class="slider__thumb-container">
      <div class="slider__thumb-container">
        <div class="slider__thumb-container">
          <div class="js-slider__thumb slider__thumb">
            <div class="slider__tip js-slider__tip"></div>
          </div>
        </div>
        <div class="slider__thumb slider__thumb_spacer"></div>
      </div>
    </div>
    <div class="slider__thumb-container">
      <div class="slider__thumb-container">
        <div class="slider__thumb-container">
          <div class="js-slider__thumb slider__thumb">
            <div class="slider__tip js-slider__tip"></div>
          </div>
        </div>
        <div class="slider__thumb slider__thumb_spacer"></div>
      </div>
    </div>
    <div class="slider__bar-container">
      <div class="slider__bar-container">
        <div class="slider__thumb slider__thumb_half-spacer"></div>
        <div class="slider__bar-container">
          <div class="slider__bar js-slider__bar"></div>
        </div>
        <div class="slider__thumb slider__thumb_half-spacer"></div>    
      </div>
    </div>
  </div>
  <div class="slider__scale-container js-slider__scale-container">
<!--
    <div class="slider__thumb slider__thumb_half-spacer"></div>
    <div class="slider__scale js-slider__scale"></div>
    <div class="slider__thumb slider__thumb_half-spacer"></div>
-->
  </div>
</div>`;

export default SLIDER_HTML;
