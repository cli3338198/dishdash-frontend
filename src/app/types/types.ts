export type Recipe = {
  label: string;
  image: string;
  ingredients: string[];
};

export type Ingredient = {
  calories: number;
  healthLabels: string[];
};
