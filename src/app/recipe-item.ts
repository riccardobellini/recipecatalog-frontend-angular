import { DishTypeItem } from './dish-type';
import { IngredientItem } from './ingredient';
import { RecipePublication } from './recipe-publication';
import { BookItem } from './book';


export interface RecipeItem {
    title: string;
    id: number;
    creationTime: string;
    lastModificationTime: string;
    book?: BookItem;
    publication?: RecipePublication;
    ingredients?: IngredientItem[];
    dishtypes?: DishTypeItem[];
}
