import React from "react";

import cat from "./cat.png";

// Icons
import { HiCheckCircle } from "react-icons/hi2";

// Utility functions
import {
	capitalize,
	transformName,
} from "../../assets/utilities/transform_text";

export default React.memo(
	React.forwardRef(function TopicItem(
		{ topic, isPrevious, isCompleted, handleClick },
		ref
	) {
		return (
			<div
				className="relative w-[160px] flex flex-col items-center rounded-lg select-none"
				onClick={handleClick}
				ref={ref}
			>
				{/* Complete icon */}
				{isCompleted && (
					<HiCheckCircle
						className="absolute z-10 top-2 right-2"
						style={{
							color: "#00C853",
							backgroundColor: "#FFFFFF",
							borderRadius: "50%",
						}}
					/>
				)}
				{/* Previous icon */}
				{isPrevious && (
					<img
						src={cat}
						alt="previous"
						className="absolute z-50 object-contain w-16 h-16 right-1 bottom-4 animate-cat-jump"
					/>
				)}
				{/* Content */}
				<div className="relative w-full h-[105px] overflow-hidden rounded-md rounded-b-none border border-b-0">
					<img
						onError={({ currentTarget }) =>
							(currentTarget.src = `/assets/error_img.jpg`)
						}
						src={`/assets/img/${transformName(topic.name)}/${transformName(
							topic.name
						)}.jpg`}
						alt={topic.name}
						className="w-full h-[105px] object-cover object-center"
					/>
					<p className="absolute top-1 left-1 px-1 rounded-full bg-white text-[.75rem] font-semibold text-primary">
						{topic.id + 1}
					</p>
				</div>
				{/* Main */}
				<h3 className="w-full text-[.75rem] bg-primary text-white p-2 rounded-br-full border border-t-0 two-line">
					{capitalize(topic.display)}
				</h3>
			</div>
		);
	})
);
