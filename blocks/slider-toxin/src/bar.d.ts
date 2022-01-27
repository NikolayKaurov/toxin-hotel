export default class Bar {
    $bar: JQuery;
    $thumbs: JQuery;
    $container: JQuery;
    constructor({ $bar, $thumbs, $container, }?: {
        $bar?: JQuery<HTMLElement> | undefined;
        $thumbs?: JQuery<HTMLElement> | undefined;
        $container?: JQuery<HTMLElement> | undefined;
    });
    update({ vertical, barView, }: {
        vertical?: boolean | undefined;
        barView?: boolean | undefined;
    }): void;
    static blank(): Bar;
}
