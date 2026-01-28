import { Subject } from "rxjs";

export class MiaDataResult<T = unknown> {
    static readonly STATUS_PENDING = 0;
    static readonly STATUS_SEARCHING = 1;
    static readonly STATUS_READY = 2;

    key = '';
    status = 0;
    obs?: Subject<T>;
    items?: T;
    result?: T;
}
