import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, ChevronLeft } from "lucide-react";
import LoadingPage from "./loading";

async function getRecipeDetails(id: string) {
	try {
		const response = await fetch(
			`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`,
			{
				next: { revalidate: 60 },
			}
		);

		if (!response.ok) {
			throw new Error("Failed to fetch recipe details");
		}

		return response.json();
	} catch (error) {
		console.error("Error fetching recipe details:", error);
		throw error;
	}
}

function RecipeInfo({ recipe }: { recipe: any }) {
	return (
		<div className="space-y-8">
			<div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
				{recipe.readyInMinutes && (
					<div className="flex items-center">
						<Clock className="w-5 h-5 mr-2" />
						<span>{recipe.readyInMinutes} minutes</span>
					</div>
				)}
				{recipe.servings && (
					<div className="flex items-center">
						<Users className="w-5 h-5 mr-2" />
						<span>{recipe.servings} servings</span>
					</div>
				)}
			</div>

			{recipe.summary && (
				<div
					className="prose dark:prose-invert max-w-none"
					dangerouslySetInnerHTML={{
						__html: recipe.summary.split(". ").slice(0, 2).join(". ") + ".",
					}}
				/>
			)}

			<div>
				<h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
					Ingredients
				</h2>
				<ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{recipe.extendedIngredients.map((ingredient: any) => (
						<li
							key={ingredient.id}
							className="flex items-start space-x-2 text-gray-700 dark:text-gray-300"
						>
							<span className="block w-2 h-2 mt-2 rounded-full bg-blue-500" />
							<span>{ingredient.original}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default async function RecipeDetailsPage({
	params,
}: {
	params: { id: string };
}) {
	const recipe = await getRecipeDetails(params.id);

	return (
		<div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
			<div className="max-w-4xl mx-auto">
				<Link
					href="/recipes"
					className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
				>
					<ChevronLeft className="w-4 h-4 mr-1" />
					Back to recipes
				</Link>

				<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
					{recipe.title}
				</h1>

				{recipe.image && (
					<div className="relative aspect-video mb-8 rounded-xl overflow-hidden">
						<Image
							src={recipe.image}
							alt={recipe.title}
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							priority
						/>
					</div>
				)}

				<Suspense fallback={<LoadingPage />}>
					<RecipeInfo recipe={recipe} />
				</Suspense>
			</div>
		</div>
	);
}
