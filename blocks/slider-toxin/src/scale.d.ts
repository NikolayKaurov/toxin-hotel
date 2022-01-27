export default class Scale {
    $scale: JQuery;
    start: number;
    end: number;
    step: number;
    scaleView: boolean;
    units: string;
    constructor({ $scale, start, end, step, scaleView, units, }?: {
        $scale?: JQuery<HTMLElement> | undefined;
        start?: number | undefined;
        end?: number | undefined;
        step?: number | undefined;
        scaleView?: boolean | undefined;
        units?: string | undefined;
    });
    init(): void;
    update({ start, end, step, scaleView, }: {
        start?: number | undefined;
        end?: number | undefined;
        step?: number | undefined;
        scaleView?: boolean | undefined;
    }): void;
    static blank(): Scale;
}
