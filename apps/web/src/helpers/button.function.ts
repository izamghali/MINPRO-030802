import clsx from "clsx";

export class ButtonStyleChange {
    isActive

    constructor(pathnameHook: string, pathnameSegment: string, activeClassName: string, nonActiveClassName: string) {
        this.isActive =  clsx({
            [activeClassName]: pathnameHook === pathnameSegment,
            [nonActiveClassName] : pathnameHook !== pathnameSegment
        })
    }
}