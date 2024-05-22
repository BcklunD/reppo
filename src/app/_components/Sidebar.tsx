import Link from "next/link";
import * as Lu from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { Button } from "~/components/ui/button";
import React from "react";
import { getPopularRecipes } from "../_actions/recipes";
import Image from "next/image";
import { clerkClient } from "@clerk/nextjs/server";

type CategoryProp = {
  name: string;
  key: string;
  icon: string;
};

export async function Sidebar() {
  let { popularRecipes } = await getPopularRecipes(3);
  // console.log(popularRecipes);

  const topCategories: CategoryProp[] = [
    {
      name: "Breakfast",
      key: "breakfast",
      icon: "LuEgg",
    },
    {
      name: "Lunch",
      key: "lunch",
      icon: "LuPizza",
    },
    {
      name: "Dinner",
      key: "dinner",
      icon: "LuMenu",
    },
    {
      name: "Dessert",
      key: "dessert",
      icon: "LuIceCream2",
    },
    {
      name: "Snacks",
      key: "snacks",
      icon: "LuSandwich",
    },
  ];

  return (
    <div className="flex w-64 flex-col gap-6">
      <Link href="/cook">
        <Button>
          <div className="flex gap-2">
            <LuPlus className="h-5 w-5" />
            New Recipe
          </div>
        </Button>
      </Link>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold">Categories</h2>
        {topCategories.map((category, index) => (
          <Link
            key={category.key}
            href={`/explore?category=${category.key}`}
            className="group flex w-fit items-center gap-x-2"
          >
            {React.createElement(Lu[`${category.icon}` as keyof typeof Lu])}{" "}
            <span className="border-b border-transparent group-hover:border-slate-500">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-4 truncate">
        <h2 className="text-lg font-bold">Popular Recipes</h2>
        {popularRecipes.map((recipe, index) => (
          <PopularRecipeCard
            key={`${recipe.id}-${index}`}
            id={recipe.id}
            title={recipe.title}
            authorId={recipe.userId}
          />
        ))}
      </div>
    </div>
  );
}

type PopularRecipeCardProps = {
  id: string;
  title: string;
  authorId: string;
};
async function PopularRecipeCard({
  id,
  title,
  authorId,
}: PopularRecipeCardProps) {
  const user = await clerkClient.users.getUser(authorId);
  console.log(user);
  return (
    <Link key={id} href={`/recipe/${id}`} className="group flex gap-2">
      <Image
        src={
          "https://utfs.io/f/15c6bc80-b87d-4c43-a5e7-43e2748b8e7b-igobqk.PNG"
        }
        alt="image"
        width={80}
        height={100}
        className="rounded-md"
      />
      <div className="flex flex-col">
        <span className="text-lg group-hover:text-slate-500">{title}</span>
        <span className="whitespace-nowrap text-slate-500">
          by {`${user.firstName} ${user.lastName}`}
        </span>
      </div>
    </Link>
  );
}
