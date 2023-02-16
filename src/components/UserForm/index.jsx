import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSound } from "use-sound";
import Button from "../Button";
import useLocalData from "../../hooks/useLocalData";
import Cat from "../Cat.jsx";
import submitSFX from "../../assets/sfx/notice.mp3";
import bubbleSoundSrc from "../../assets/sfx/bubble-pop.mp3";

const welcome = [
	"Chào mừng bạn đến với 🍑 Peach Toeic!",
	"Ứng dụng bao gồm 600 từ vựng TOEIC thiết yếu nhất được chọn lọc từ các tài liệu uy tín.",
	"Ở ngoài kia có rất nhiều phần mềm khác nhưng: \"Phần mềm tốt thì không miễn phí, phần mềm miễn phí thường thì lại không tốt...\"",
	"Hy vọng phần mềm của mình có thể giúp bạn học các từ vựng TOEIC hiệu quả hơn 🥰",
	"Chúc bạn thành công! 🍀",
];

export default function UserForm({ message, title }) {
	const [name, setName] = useState({ value: "", isValid: null });
	const [step, setStep] = useState(0);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const nameExpress = new RegExp("^[A-Za-z0-9_ -]{2,15}$");

	const [bubbleSound] = useSound(bubbleSoundSrc);

	// Focused element
	const nameInput = useRef();
	useEffect(() => {
		if (step === welcome.length) nameInput.current.focus();
	}, [step]);

	const nextStep = () => {
		if (step !== welcome.length) setStep((prev) => prev + 1);
		bubbleSound();
	};

	// Handle submit
	const [getLocalData, setLocalData] = useLocalData();
	const [submitSound] = useSound(submitSFX);
	const thisElement = useRef();

	const submit = useCallback(() => {
		submitSound();
		if (name.isValid) {
			thisElement.current.remove();

			const localData = getLocalData();
			localData.dayStart = Date.now();
			localData.name = name.value;
			setLocalData(localData);
		}
	}, [getLocalData, name.isValid, name.value, setLocalData, submitSound]);

	useEffect(() => {
		const keyboardSubmit = (e) => {
			if (e.keyCode === 13) {
				submit();
			}
		};
		window.addEventListener("keydown", keyboardSubmit);

		return () => window.removeEventListener("keydown", keyboardSubmit);
	}, [submit]);

	return (
		<div
			className="fixed lg:absolute lg:max-w-sm mx-auto inset-0 z-[99]"
			ref={thisElement}
			onClick={nextStep}
		>
			<div className="absolute inset-0 bg-black opacity-95"></div>
			<section className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white rounded-md w-[80%] overflow-hidden">
				{step < welcome.length && (
					<article className="cursor-pointer">
						<header className="p-4 text-xl font-semibold text-center bg-blue-200 border-b-2 text-dark-blue">
							<div>
								<h1>Chào mừng bạn 👋</h1>
							</div>
						</header>
						<main className="p-4 leading-6 bg-blue-50">
							<span>{welcome[step]}</span>
						</main>
						<footer className="py-1 text-center opacity-50 bg-blue-50 text-12">
							[{step + 1}/{welcome.length}]
						</footer>
					</article>
				)}
				{step === welcome.length && (
					<article>
						<header className="p-4 mb-2 text-center bg-blue-100 border-b rounded-t-md text-primary font-rowdies">
							<h1>{title}</h1>
						</header>
						<main className="p-4 pt-0">
							<div className="mb-2">
								<Cat
									message="When we first met, what is yu name?"
									time="unset"
								/>
							</div>
							<input
								ref={nameInput}
								type="text"
								placeholder="Enter your name"
								className="w-full p-2 mb-2 border rounded-md outline-primary"
								style={
									name.isValid === false
										? {
												outline: "1px solid #FF5252",
										  }
										: {}
								}
								value={name.value}
								onChange={(e) => {
									if (e.target.value.length <= 15)
										setName({
											value: e.target.value,
											isValid: nameExpress.test(
												e.target.value
											),
										});
								}}
							/>
							<Button
								fullWidth
								isPrimary
								onClick={submit}
								disabled={!name.isValid}
							>
								Submit
							</Button>
						</main>
					</article>
				)}
			</section>
		</div>
	);
}
