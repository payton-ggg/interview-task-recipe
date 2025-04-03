import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function Home() {
	return (
		<main className="flex justify-center items-center flex-col gap-5 h-[100vh]">
			<div className="flex gap-3 items-center">
				<input
					type="search"
					className="relative m-0 block w-[500px] rounded-2xl border border-solid bg-transparent bg-clip-padding px-3 py-[0.75rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none border-white/10 text-white placeholder:text-neutral-200 autofill:shadow-autofill"
					placeholder="Search"
					aria-label="Search"
				/>
				<Menu as="div" className="relative inline-block text-left">
					<div>
						<MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm text-neutral-300 border border-solid border-white/10 shadow-xs ring-gray-300">
							Options
							<ChevronDownIcon
								aria-hidden="true"
								className="-mr-1 size-5 text-neutral-300"
							/>
						</MenuButton>
					</div>

					<MenuItems
						transition
						className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md ring-1 shadow-lg ring-black/5 transition focus:outline-hidden bg-neutral-800 data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
					>
						<div className="py-1">
							<MenuItem>
								<a
									href="#"
									className="block px-4 py-2 text-sm text-neutral-300 data-focus:bg-neutral-600 data-focus:text-gray-400 data-focus:outline-hidden"
								>
									African
								</a>
							</MenuItem>
							<MenuItem>
								<a
									href="#"
									className="block px-4 py-2 text-sm text-neutral-300 data-focus:bg-neutral-600 data-focus:text-gray-400 data-focus:outline-hidden"
								>
									French
								</a>
							</MenuItem>
							<MenuItem>
								<a
									href="#"
									className="block px-4 py-2 text-sm text-neutral-300 data-focus:bg-neutral-600 data-focus:text-gray-400 data-focus:outline-hidden"
								>
									Latin American
								</a>
							</MenuItem>
						</div>
					</MenuItems>
				</Menu>
			</div>

			<div className="flex flex-col gap-1 items-center">
				<input
					type="number"
					inputMode="numeric"
					className="w-36 rounded-2xl border border-solid bg-transparent bg-clip-padding px-3 py-[0.75rem] text-base font-normal leading-[1.6] border-white/10 text-white placeholder:text-neutral-200 autofill:shadow-autofill focus:border-primary"
					placeholder="Number"
				/>
				<p className="text-sm text-neutral-200">
					Enter maximum preparation time
				</p>
			</div>
			<button className="bg-neutral-950 hover:bg-neutral-700 duration-200 text-white font-bold py-2 px-4 rounded">
				Next
			</button>
		</main>
	);
}
