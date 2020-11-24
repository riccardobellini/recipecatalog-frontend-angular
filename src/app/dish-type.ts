export interface DishTypeItem {
  name: string;
  id: number;
}

export class DishType {

  constructor();

  constructor(
    public id?: number,
    public name?: string
  ) {}
}
