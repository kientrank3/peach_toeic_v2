import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSound } from "use-sound";
import { twMerge } from "tailwind-merge";
import { HiVolumeUp } from "react-icons/hi";

// Components
import Button from "../Button/";
import CircleButton from "../CircleButton/";

// Utility functions
import {
	capitalizeFirst,
	getPath,
} from "../../assets/utilities/transform_text";

// Sounds
import changeSound from "../../assets/sfx/notice.mp3";
import speak from "./../../utils/textToSpeech";

function ContentCard({ item }) {
	// State change between example view and meaning view
	const [isExample, setExample] = useState(false);
	const [text, setText] = useState(item.name);

	useLayoutEffect(() => {
		setExample(false);
	}, [item]);

	// This state for short screen device to responsive views
	const [isShort, setShort] = useState(() => {
		return window.innerHeight < 720;
	});

	// This side effect will catch height change to catch short height devices
	React.useEffect(() => {
		const cathHeight = () => {
			setShort(window.innerHeight < 720);
		};
		window.addEventListener("resize", cathHeight);

		return () => {
			window.removeEventListener("resize", cathHeight);
		};
	}, []);

	// This ref to audio tag
	// const sound = useRef();

	// This sound will be played when click something
	const [clickSound] = useSound(changeSound, { volume: 0.4 });

	// Handle change state view (meaning/example)
	const changeState = () => {
		clickSound();
		setExample((isExample) => !isExample);
	};

	useEffect(() => {
		setText(item.name);
	}, [item]);
	const playingSound = () => {
		speak(text);
	};

	const exampleButton = useRef();
	const playSoundButton = useRef();

	// Side effect playing sound
	useEffect(() => {
		const playSound = (e) => {
			// SPACE
			if (e.keyCode === 32) {
				e.preventDefault();
				playSoundButton.current.click();
				playSoundButton.current.focus();
			}
		};
		window.addEventListener("keydown", playSound);

		return () => window.removeEventListener("keydown", playSound);
	}, []);

	// Side effect change current state
	useEffect(() => {
		const changeState = (e) => {
			// SHIFT
			if (e.keyCode === 16) {
				exampleButton.current.click();
				exampleButton.current.focus();
			}
		};

		window.addEventListener("keydown", changeState);

		return () => window.removeEventListener("keydown", changeState);
	}, []);

	const imgBlockClassName =
		"relative flex items-center rounded-md mb-4 bg-s-white shadow";
	const imgClassName = "m-auto h-[200px] object-contain object-center";

	return (
		<article className="w-[330px] flex flex-col bg-white">
			{/* Img */}
			<header
				className={
					isShort
						? twMerge(imgBlockClassName, " h-[100px] w-[150px] mx-auto ")
						: imgBlockClassName
				}
			>
				<img
					onError={({ currentTarget }) =>
						(currentTarget.src = `/assets/error_img.jpg`)
					}
					src={getPath(item)}
					alt={item.name}
					className={
						isShort
							? twMerge(imgClassName, " h-[100px] w-[150px]")
							: imgClassName
					}
				/>
				<p className="absolute top-0 left-0 px-2 text-white shadow bg-primary opacity-40 rounded-br-md">
					{item.id + 1}
				</p>
			</header>
			{/* Content */}
			<main className="overflow-hidden rounded-md shadow bg-s-white">
				<div className="px-4 py-2 mb-2 bg-blue-100">
					<h3 className="text-2xl font-semibold text-primary one-line">
						{item.name}
					</h3>
					<p className="italic font-semibold text-15 opacity-60 one-line">
						/{item.pronounce}/
					</p>
				</div>
				<div className="p-4 pt-0">
					<p className="pb-2 mb-2 font-semibold text-black border-b">
						{isExample ? "Example" : "Meaning"}
					</p>
					<div className="text-left text-15">
						<p className="mb-2 italic">
							{isExample
								? capitalizeFirst(item.example.english)
								: capitalizeFirst(item.explain)}
						</p>
						<p className="font-semibold">
							{isExample
								? capitalizeFirst(item.example.vietnamse)
								: item.meaning}
						</p>
					</div>
				</div>
				<div className="flex items-center justify-between p-4 pt-0 mt-4">
					<Button ref={exampleButton} isPrimary onClick={changeState}>
						{isExample ? "Meaning" : "Example"}
					</Button>
					<CircleButton ref={playSoundButton} onClick={playingSound}>
						<HiVolumeUp />
					</CircleButton>
				</div>
			</main>
		</article>
	);
}

export default React.memo(ContentCard);
