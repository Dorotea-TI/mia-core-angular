export interface MiaConfirmModalButton<T = unknown> {
    title: string;
    value: T;
}

export class MiaConfirmModalConfig<T = unknown> {
    title = '';
    caption = '';
    buttons: Array<MiaConfirmModalButton<T>> = [
        { title: 'NO', value: false as T },
        { title: 'YES', value: true as T },
    ];

    constructor(title?: string, caption?: string) {
        this.title = title ?? '';
        this.caption = caption ?? '';
    }
}
