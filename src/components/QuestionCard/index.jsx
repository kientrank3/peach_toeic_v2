import React, { useRef, useEffect } from "react";
import { getPath } from "../../assets/utilities/transform_text";

export default React.memo(function QuestionCard({ item }) {
	// This ref to the audio tag
	const sound = useRef();

	// Handle play sounds. This will pause and load new sounds then play them
	const playSound = () => {
		sound.current.pause();
		sound.current.load();
		sound.current.play();
	};

	// This side effect will automatically play sounds when mounted after .3 seconds.
	useEffect(() => {
		const pronouncePlay = setTimeout(() => {
			playSound();
		}, 300);

		return () => clearTimeout(pronouncePlay);
	}, [item]);

	return (
		<div className="rounded-lg shadow bg-s-white">
			<div className="p-2 text-center bg-blue-100 rounded-t-lg shadow rounded-b-3xl">
				<h3 className="text-2xl font-semibold text-primary one-line">
					{item.name}
				</h3>
				<p className="italic font-semibold text-12 opacity-60 one-line">
					/{item.pronounce}/
				</p>
			</div>
			<div className="flex flex-col items-start gap-2 p-2">
				<img
					onError={({ currentTarget }) =>
						(currentTarget.src = `${process.env.PUBLIC_URL}/assets/error_img.jpg`)
					}
					src={getPath(item)}
					alt={item.name}
					className="self-center h-[150px] object-contain rounded-lg border"
				/>
			</div>
			<audio ref={sound}>
				<source src={getPath(item, "sounds")} />
			</audio>
		</div>
	);
});
