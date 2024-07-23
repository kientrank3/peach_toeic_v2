
function speak(message) {
	if('speechSynthesis' in window) {
		var msg = new SpeechSynthesisUtterance();
		msg.text = message;
		msg.lang = 'en-US';
		msg.rate = 0.8;
		msg.pitch = 1;
		speechSynthesis.speak(msg);
	} else {
		console.log('Speech synthesis not supported.');
	}
	
	
}

export default speak;
