import React, { useEffect, useRef } from "react";
import style from "./LoadingStyle.module.css";

const quotes = [
	{
		content: "You only live once, but if you do it right, once is enough.",
		author: "Mae West",
	},
	{
		content:
			"Insanity is doing the same thing, over and over again, but expecting different results.",
		author: "Narcotics Anonymous",
	},
	{
		content:
			"Good friends, good books, and a sleepy conscience: this is the ideal life.",
		author: "Mark Twain",
	},
	{
		content: "Everything you can imagine is real.",
		author: "Pablo Picasso",
	},
	{
		content:
			"Sometimes the questions are complicated and the answers are simple.",
		author: "Dr. Seuss",
	},
	{
		content:
			"Life is like riding a bicycle. To keep your balance, you must keep moving.",
		author: "Albert Einstein",
	},
	{
		content:
			"You should learn from your competitor, but never copy. Copy and you die.",
		author: "Jack Ma",
	},
	{
		content:
			" The only person you should try to be better than is the person you were yesterday.",
		author: "Anonymous",
	},
	{
		content: "No one can make you feel inferior without your consent.",
		author: "Eleanor Roosevelt",
	},
	{
		content:
			"If you want to go fast, go alone. If you want to go far, go together.",
		author: "African proverb",
	},
	{
		content: "I love those who can smile in trouble…",
		author: "Leonardo da Vinci",
	},
];

export default function Loading({ time = 9999 }) {
	const heroRandom = Math.floor(Math.random() * 7 + 1);
	const quoteRandom = Math.floor(Math.random() * quotes.length);
	// This ref to the current component
	const section = useRef();

	//This effect will auto remove this component after ${time} seconds
	useEffect(() => {
		const removeSelf = () => {
			section.current.remove();
		};

		const remove = setTimeout(removeSelf, time);

		return () => {
			clearTimeout(remove);
		};
	});

	return (
		<section ref={section} className="fixed inset-0 z-[999] bg-white">
			{/* Software name */}
			<header className="mx-4 my-10 text-center">
				<h1 className="mb-2 text-3xl font-bold text-red-400 font-rowdies">
					Peach{" "}
					<span className="font-bold text-primary font-rowdies">TOEIC</span>
				</h1>
				<h2 className="text-20">Chinh phục 600 từ vựng TOEIC</h2>
			</header>

			{/* Hero */}
			<div className="w-[80%] mx-auto">
				<img
					src={`/assets/hero_img/hero-${heroRandom}.png`}
					className="mx-auto h-[300px] object-contain"
					alt=""
				/>
			</div>

			{/* Loading animate */}
			<div className={style["loader-4"] + " mt-12"}>
				<span></span>
			</div>

			{/* Quotes */}
			<div className="mx-6 mt-8">
				<p className="italic text-center opacity-80">
					"{quotes[quoteRandom].content}"
				</p>
				<p className="mt-4 text-center text-15">
					-{quotes[quoteRandom].author}
				</p>
			</div>

			{/* Footer */}
			<footer className="absolute bottom-2 left-[50%] -translate-x-[50%] font-semibold">
				thanhcanhit.<span className="text-primary">github.io</span>
			</footer>
		</section>
	);
}
