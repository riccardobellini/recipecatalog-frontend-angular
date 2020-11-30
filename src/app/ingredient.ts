export interface IngredientItem {
    name: string;
    id: number;
    creationTime: string,
    lastModificationTime: string
}

export interface IngredientEdit {
    name: string;
    id?: number;
}