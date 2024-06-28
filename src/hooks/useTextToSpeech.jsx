import { useState, useEffect } from "react";
const synth = window.speechSynthesis;
const speak = (state, voice) => {
	const utterance = new SpeechSynthesisUtterance();
	utterance.voice = voice;
	utterance.text = state.text;
	synth.speak(utterance);
};

const useTextToSpeech = () => {
	const [voices, setVoices] = useState([]);
	useEffect(() => {
		const list = synth.getVoices();
		setVoices(list);
	}, []);
	return {
		voices,
		speak: speak,
		pause: () => synth.pause(),
		resume: () => synth.resume(),
		cancel: () => synth.cancel(),
	};
};

export default useTextToSpeech;
