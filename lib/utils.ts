import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function getServerSideFirst({
	query,
	cuisine,
	maxPrepTime,
}: {
	query?: string;
	cuisine?: string;
	maxPrepTime?: number;
}) {
	const res = await fetch(
		`https://api.spoonacular.com/recipes/complexSearch?${
			query ? `query=${query}` : ""
		}&${cuisine ? `cuisine=${cuisine}` : ""}&={maxReadyTime}${
			maxPrepTime ? `maxReadyTime=${maxPrepTime}` : ""
		}&apiKey=c76c078d094c46c5b7bd7145ddf311cd`
	);
	const data = await res.json();

	return { props: { data } };
}
