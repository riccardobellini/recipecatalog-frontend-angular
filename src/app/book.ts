export interface BookItem {
    title: string;
    id: number;
    creationTime: string,
    lastModificationTime: string
}

export interface BookEdit {
    title: string;
    id?: number;
}

export class Book implements BookEdit {
    title: string;
    id?: number;

    constructor() { }
}

