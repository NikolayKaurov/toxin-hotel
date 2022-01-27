import Model from './model';
import View from './view';
export default class Panel {
    model: Model;
    view: View;
    $panel: JQuery<HTMLElement>;
    $start: JQuery<HTMLElement>;
    $end: JQuery<HTMLElement>;
    $step: JQuery<HTMLElement>;
    $from: JQuery<HTMLElement>;
    $to: JQuery<HTMLElement>;
    $vertical: JQuery<HTMLElement>;
    $range: JQuery<HTMLElement>;
    $scale: JQuery<HTMLElement>;
    $bar: JQuery<HTMLElement>;
    $tip: JQuery<HTMLElement>;
    constructor({ model, view, }?: {
        model?: Model | undefined;
        view?: View | undefined;
    });
    init(): void;
    update(): void;
}
