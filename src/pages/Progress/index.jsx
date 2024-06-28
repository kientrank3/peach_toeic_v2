import React, { useContext, useEffect, useRef, useState } from "react";
import { useSound } from "use-sound";
import circleProgress from "./circleProgress.module.css";
import { formatDate } from "../../assets/utilities/transform_date";
import useLocalData from "../../hooks/useLocalData";
import Button from "../../components/Button";
import confirmSFX from "../../assets/sfx/tuntun.mp3";
import { NotificationContext } from "../../App";

export default function Progress() {
	// Get local data
	const [getLocalData] = useLocalData();
	const localData = getLocalData();
	const {
		name,
		dayStart,
		dayLearned,
		dayStreak,
		highScore,
		learned,
		topicComplete,
	} = localData;

	// Progress bar
	const progressBarElement = useRef();
	const percentElement = useRef();
	const quantityLearnedElement = useRef();

	// Progress bar animate
	useEffect(() => {
		let speed = 5;
		let quantityRun = 0;

		const progressAnimate = setInterval(() => {
			quantityRun++;

			quantityLearnedElement.current.textContent = `${quantityRun}/600`;

			const completePercent = Math.floor((quantityRun / 600) * 100);
			percentElement.current.textContent = `${completePercent}%`;

			const progressAngle = 3.6 * completePercent;
			progressBarElement.current.style.background = `conic-gradient(#7A9CC6 ${progressAngle}deg, #ededed 0deg)`;

			if (quantityRun >= learned.length) {
				clearInterval(progressAnimate);
			}
		}, speed);

		return () => clearInterval(progressAnimate);
	}, [learned.length]);

	// Value animate
	const dLearnElement = useRef();
	const tCompleteElement = useRef();
	const hScoreElement = useRef();
	const dStreakElement = useRef();

	useEffect(() => {
		// Running variables
		let dLearn = 0,
			tComplete = 0,
			hScore = 0,
			dStreak = 0;
		const speed = 80;

		// Day Learned
		const dLearnAnimate = setInterval(() => {
			dLearn++;

			dLearnElement.current.textContent = dLearn;

			if (dLearn >= dayLearned.length) {
				clearInterval(dLearnAnimate);
				dLearnElement.current.textContent = dayLearned.length;
			}
		}, speed);

		// Topic Complete
		const tCompleteAnimate = setInterval(() => {
			tComplete++;

			tCompleteElement.current.textContent = tComplete;

			if (tComplete >= topicComplete.length) {
				clearInterval(tCompleteAnimate);
				tCompleteElement.current.textContent = topicComplete.length;
			}
		}, speed);

		// High Score
		const hScoreAnimate = setInterval(() => {
			hScore += 10;

			hScoreElement.current.textContent = hScore;

			if (hScore >= highScore.score) {
				clearInterval(hScoreAnimate);
				hScoreElement.current.textContent = highScore.score;
			}
		}, speed / 15);

		// Day Streak
		const dStreakAnimate = setInterval(() => {
			dStreak++;

			dStreakElement.current.textContent = dStreak;

			if (dStreak >= dayStreak) {
				clearInterval(dStreakAnimate);
				dStreakElement.current.textContent = dayStreak;
			}
		}, speed);

		return () => {
			clearInterval(dLearnAnimate);
			clearInterval(tCompleteAnimate);
			clearInterval(hScoreAnimate);
			clearInterval(dStreakAnimate);
		};
	});

	const [confirm, setConfirm] = useState(false);
	const [confirmSound] = useSound(confirmSFX);
	const deleteData = () => {
		window.location.hash = "/";
		window.location.reload();
		window.localStorage.removeItem("PEACH_TOEIC");
	};

	// Notification
	const addNotification = useContext(NotificationContext);

	return (
		<section className="w-full px-4 pt-8">
			<header className="mb-8">
				<h3 className="text-center title">Your progress</h3>
			</header>
			<main>
				{/* Circle progress */}
				<div className={circleProgress.container + " mb-8"}>
					<div
						className={circleProgress.circularProgress}
						ref={progressBarElement}
					>
						<div className="relative flex flex-col gap-2">
							{/* Percent */}
							<span
								ref={percentElement}
								className={
									circleProgress.progressValue +
									" font-rowdies text-3xl text-primary"
								}
							></span>
							{/* Quantity */}
							<span
								ref={quantityLearnedElement}
								className="font-semibold text-primary"
							>
								{learned.length}/600
							</span>
						</div>
					</div>
				</div>
				<div className="font-medium text-18">
					<p className="mb-4 font-semibold text-center text-primary ">{name}</p>

					<div className="px-4">
						<p className="flex justify-between">
							Day start:
							<span className="value">{formatDate(dayStart)}</span>
						</p>
						<p className="flex justify-between">
							Day learned:
							<span className="value" ref={dLearnElement}></span>
						</p>
						<p className="flex justify-between">
							Topic complete:
							<span className="value" ref={tCompleteElement}></span>
						</p>
						<p className="flex justify-between">
							<span>
								High score
								<span className="text-12 text-primary">
									({highScore.time}s):
								</span>
							</span>
							<span className="value" ref={hScoreElement}></span>
						</p>
						<p className="flex justify-between">
							Day streak:
							<span className="value" ref={dStreakElement}></span>
						</p>
					</div>
				</div>
				<div className="mt-8">
					<Button
						isPrimary
						fullWidth
						onClick={
							confirm === true
								? deleteData
								: () => {
										confirmSound();
										setConfirm(true);
										addNotification(
											"warn",
											"Are you sure you want to delete your progress?"
										);
								  }
						}
					>
						{!confirm ? "Delete Data" : "Type again to confirm 💀"}
					</Button>
				</div>

				<p className="mt-2 font-semibold text-center text-primary">
					thanhcanhit x dinhkienk3
				</p>
			</main>
		</section>
	);
}
