"use client";

import RecipeSearchForm from "./components/RecipeSearchForm";

export default function Home() {
  console.log(process.env.RECIPE_API, "RECIPE API");
  console.log(process.env.INGREDIENT_API, "ingredient API");
  return (
    <main>
      <RecipeSearchForm />
    </main>
  );
}
