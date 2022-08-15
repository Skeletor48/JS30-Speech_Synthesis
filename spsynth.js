const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const voiceOption = document.querySelector('[name="voiceoption"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const randomButton = document.querySelector('#random');
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .sort((a, b) => {
      if (a.lang > b.lang) {
        return 1;
      }
      if (a.lang < b.lang) {
        return -1;
      }
        return 0;
      })
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');

    voicesDropdown.value = 'Daniel'
}

function setVoice(voiceName) {
  msg.voice = voices.find(voice => voice.name === this.value);
}

function speakUp(isRandom) {
  if (isRandom) {
    msg.voice = voices[voices.length * Math.random() | 0];
    msg.pitch = getRandomFloat(0,2);
    msg.rate = getRandomFloat(0,3);
    options[1].value = msg.pitch;
    options[2].value = msg.rate;
    voicesDropdown.value = msg.voice.name;
  }
  speechSynthesis.speak(msg);
}

function setOption() {
  msg[this.name] = this.value;
}

function getRandomFloat(min, max) {
  const str = (Math.random() * (max - min) + min).toFixed(1);
  return parseFloat(str);
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', () => speakUp(false));
randomButton.addEventListener('click', () => speakUp(true));
