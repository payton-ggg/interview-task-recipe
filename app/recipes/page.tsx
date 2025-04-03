"use client";

import { useSearchParams } from "next/navigation";

export default function RecipesPage() {
	const searchParams = useSearchParams();
	console.log(searchParams.toString());

	return (
		<div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
					Search Results
				</h1>
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
					<pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
						{JSON.stringify(
							{
								query: searchParams.get("query"),
								cuisine: searchParams.get("cuisine"),
								maxPrepTime: searchParams.get("maxPrepTime"),
							},
							null,
							2
						)}
					</pre>
				</div>
			</div>
		</div>
	);
}
