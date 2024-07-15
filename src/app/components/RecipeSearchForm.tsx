import { useState, FormEvent, ChangeEvent } from "react";
import useSWR from "swr";
import { Recipe } from "../types/types";
import RecipeCard from "./RecipeCard";

async function fetcher(url: string): Promise<Recipe | null> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json() as unknown as Recipe;
}

export default function RecipeSearchForm() {
  console.log(process.env.RECIPE_API, "RECIPE API");
  console.log(process.env.INGREDIENT_API, "ingredient API");
  const [currentInput, setCurrentInput] = useState("");
  const {
    data: recipe,
    error,
    isLoading,
  } = useSWR(`recipe/${currentInput}`, fetcher);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    alert(currentInput);
    setCurrentInput("");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setCurrentInput(e.target.value);
  }

  if (recipe) {
    return <RecipeCard recipe={recipe} />;
  }

  if (error) {
    return <>Something went wrong!</>;
  }

  if (isLoading) {
    return <>loading skeleton...</>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search recipes..."
            value={currentInput}
            onChange={handleChange}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
