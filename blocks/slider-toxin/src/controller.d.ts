import Model from './model';
import View from './view';
export default class Controller {
    model: Model;
    view: View;
    constructor({ model, view, }?: {
        model?: Model | undefined;
        view?: View | undefined;
    });
    init(): void;
}
