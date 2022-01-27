import Model from './model';
import Thumb from './thumb';
import Scale from './scale';
import Bar from './bar';
export default class View {
    $slider: JQuery;
    $from: JQuery<HTMLElement>;
    $to: JQuery<HTMLElement>;
    model: Model;
    thumbs: Thumb[];
    scale: Scale;
    bar: Bar;
    vertical: boolean;
    tipView: boolean;
    scaleView: boolean;
    barView: boolean;
    units: string;
    constructor({ $slider, model, vertical, tipView, scaleView, barView, units, }?: {
        $slider?: JQuery<HTMLElement> | undefined;
        model?: Model | undefined;
        vertical?: boolean | undefined;
        tipView?: boolean | undefined;
        scaleView?: boolean | undefined;
        barView?: boolean | undefined;
        units?: string | undefined;
    });
    init(name?: string): void;
    update(): void;
    setVertical(vertical: boolean): void;
    setScaleView(scaleView: boolean): void;
    setBarView(barView: boolean): void;
    setTipView(tipView: boolean): void;
    get scope(): string;
    static blank(): View;
}
