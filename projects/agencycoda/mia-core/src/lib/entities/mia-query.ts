export class MiaQuery {
    pageCurrent = 1;
    lastPage = 1;
    itemPerPage = 50;

    filters: {[k: string]: any} = {};

    withs: Array<string> = [];

    search = '';

    ordType = { title: '', asc: 1 };

    addWhere(key: string, value: any) {
        this.filters[key] = value;
    }

    addwhereIn(key: string, values: any) {
        this.filters[key + ':in'] = values;
    }

    addwhereNotIn(key: string, values: Array<any>) {
        this.filters[key + ':notin'] = values;
    }

    addwhereLike(key: string, values: Array<any>) {
        this.filters[key + ':like'] = values;
    }

    addwhereBetween(key: string, from: string, to: string) {
        this.filters[key + ':between'] = from + ':' + to;
    }

    removeWhere(key: string) {
        let index = this.filters.indexOf(key);
        if (index != -1) {
            this.filters.splice(index, 1);
        }
    }

    getWhere(): string {
        let result = '';
        let isFirst = true;
        // tslint:disable-next-line:forin
        for (const key in this.filters) {
            const value = this.filters[key];
            if (!isFirst) {
                result += ';';
            }
            result += key + ':' + value;
            isFirst = false;
        }
        return result;
    }

    resetWhere() {
        this.filters = [];
    }

    addWith(name: string) {
        this.withs.push(name);
    }

    removeWith(name: string) {
        let index = this.withs.indexOf(name);
        if (index != -1) {
            this.withs.splice(index, 1);
        }
    }

    resetWith() {
        this.withs = [];
    }

    setPagination(lastPage: number, itemPerPage: number) {
        // Guardamos ultima pagina
        this.lastPage = lastPage;
        this.itemPerPage = itemPerPage;
    }

    toParams() {
        return {
            page: this.pageCurrent,
            where: this.getWhere(),
            withs: this.withs,
            search: this.search,
            ord: this.ordType.title,
            asc: this.ordType.asc,
            limit: this.itemPerPage
        };
    }
}
