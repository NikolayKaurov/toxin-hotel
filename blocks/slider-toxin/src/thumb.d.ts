export default class Thumb {
    $thumb: JQuery;
    $container: JQuery;
    $tip: JQuery;
    vertical: boolean;
    value: number;
    position: number;
    drag: boolean;
    offset: number;
    tip: boolean;
    units: string;
    dent: number;
    constructor({ $thumb, $container, vertical, value, position, tip, units, }?: {
        $thumb?: JQuery<HTMLElement> | undefined;
        $container?: JQuery<HTMLElement> | undefined;
        vertical?: boolean | undefined;
        value?: number | undefined;
        position?: number | undefined;
        tip?: boolean | undefined;
        units?: string | undefined;
    });
    init(): void;
    update({ vertical, position, value, tip, }?: {
        vertical?: boolean | undefined;
        position?: number | undefined;
        value?: number | undefined;
        tip?: boolean | undefined;
    }): void;
    set shift(value: number);
    get shift(): number;
    set dragging(dragging: boolean);
    get dragging(): boolean;
    fallIntoPlace(): void;
    set indent(indent: number);
    get indent(): number;
}
