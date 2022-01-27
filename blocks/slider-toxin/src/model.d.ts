export default class Model {
    start: number;
    end: number;
    step: number;
    from: number;
    to: number;
    range: boolean;
    constructor({ start, end, step, from, to, range, }?: {
        start?: number | undefined;
        end?: number | undefined;
        step?: number | undefined;
        from?: number | undefined;
        to?: number | undefined;
        range?: boolean | undefined;
    });
    setStart(start: number): void;
    setEnd(end: number): void;
    setStep(step: number): void;
    setFrom(from: number): void;
    setTo(to: number): void;
    setRange(range: boolean): void;
    updateValue({ full, part, previousValue, }?: {
        full?: number | undefined;
        part?: number | undefined;
        previousValue?: number | undefined;
    }): void;
    static blank(): Model;
    private normalize;
    private order;
    private adjustStep;
    private adjust;
}
