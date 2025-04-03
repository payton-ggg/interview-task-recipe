export default function LoadingPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
			<div className="max-w-4xl mx-auto">
				<div className="animate-pulse">
					<div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-8"></div>

					<div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>

					<div className="space-y-4 mb-8">
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
					</div>

					<div className="space-y-2">
						<div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
						{[...Array(6)].map((_, i) => (
							<div
								key={i}
								className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"
							></div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
