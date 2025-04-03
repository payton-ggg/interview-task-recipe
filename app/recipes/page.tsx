import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  PromiseLikeOfReactNode,
  ReactPortal,
} from 'react';

async function getRecipes(searchParams: { [key: string]: string | undefined }) {
  const { query, cuisine, maxPrepTime } = searchParams;

  const params = new URLSearchParams();
  if (query) params.append('query', query);
  if (cuisine) params.append('cuisine', cuisine);
  if (maxPrepTime) params.append('maxReadyTime', maxPrepTime);
  params.append('apiKey', `${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`);

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  let recipes = [];
  let error = null;

  try {
    const data = await getRecipes(searchParams);
    recipes = data.results;
  } catch (e) {
    error = 'Failed to load recipes. Please try again later.';
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Recipe Results
          </h1>
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            New Search
          </Link>
        </div>

        {recipes.length === 0 ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/50 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-yellow-800 dark:text-yellow-200">
              No recipes found. Try adjusting your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map(
              (recipe: {
                id: Key | null | undefined;
                image: string | StaticImport;
                title:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | PromiseLikeOfReactNode
                  | null
                  | undefined;
                readyInMinutes:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | PromiseLikeOfReactNode
                  | null
                  | undefined;
              }) => (
                <Link
                  key={recipe.id}
                  href={`/recipes/${recipe.id}`}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={recipe.image}
                      alt={`${recipe.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {recipe.title}
                    </h2>
                    {recipe.readyInMinutes && (
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{recipe.readyInMinutes} minutes</span>
                      </div>
                    )}
                  </div>
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
