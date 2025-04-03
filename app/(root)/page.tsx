"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Clock, Globe2 } from "lucide-react";

const cuisines = [
	"Italian",
	"Mexican",
	"Chinese",
	"Indian",
	"Japanese",
	"Thai",
	"Mediterranean",
	"French",
	"Greek",
	"Spanish",
];

export default function Home() {
	const router = useRouter();
	const [query, setQuery] = useState("");
	const [cuisine, setCuisine] = useState("");
	const [prepTime, setPrepTime] = useState("");

	const isFormValid = query || cuisine || prepTime;

	const handleSearch = () => {
		const params = new URLSearchParams();
		if (query) params.append("query", query);
		if (cuisine) params.append("cuisine", cuisine);
		if (prepTime) params.append("maxPrepTime", prepTime);

		router.push(`/recipes?${params.toString()}`);
	};

	return (
		<main className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
			<div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
				<div className="text-center">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
						Find Your Perfect Recipe
					</h1>
					<p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
						Discover delicious recipes from around the world. Search by name,
						cuisine, or preparation time.
					</p>
				</div>

				<div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
					<div className="space-y-6">
						<div className="space-y-2">
							<label
								htmlFor="search"
								className="block text-sm font-medium text-gray-700 dark:text-gray-200"
							>
								Recipe Search
							</label>
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
								<input
									id="search"
									type="text"
									placeholder="Enter recipe name (e.g., pasta)"
									className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="cuisine"
								className="block text-sm font-medium text-gray-700 dark:text-gray-200"
							>
								Cuisine Type
							</label>
							<div className="relative">
								<Globe2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
								<select
									id="cuisine"
									value={cuisine}
									onChange={(e) => setCuisine(e.target.value)}
									className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
								>
									<option value="">Select cuisine</option>
									{cuisines.map((c) => (
										<option key={c} value={c.toLowerCase()}>
											{c}
										</option>
									))}
								</select>
								<div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
									<svg
										className="h-4 w-4 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</div>
							</div>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="prepTime"
								className="block text-sm font-medium text-gray-700 dark:text-gray-200"
							>
								Maximum Preparation Time (minutes)
							</label>
							<div className="relative">
								<Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
								<input
									id="prepTime"
									type="number"
									min="0"
									placeholder="Enter max preparation time"
									className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
									value={prepTime}
									onChange={(e) => setPrepTime(e.target.value)}
								/>
							</div>
						</div>

						<button
							className={`w-full px-4 py-3 text-sm font-semibold text-white rounded-lg shadow-sm transition-colors duration-150 ${
								isFormValid
									? "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
									: "bg-gray-400 cursor-not-allowed"
							}`}
							disabled={!isFormValid}
							onClick={handleSearch}
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}
