// KEYBOARD DRUM

//CONSTRUCTOR FUNCTION
function Drum(target) {
  this.keys = document.querySelectorAll('.drum-machine__key');
  this.key = document.querySelector(`.drum-machine__key[data-key="${target.keyCode}"]`);
  this.audio = document.querySelector(`audio[data-key="${target.keyCode}"]`);
}

// PROTOTYPES

Drum.prototype.playSound = function() {
  // Stop the function from running
  if(!this.audio) return;

  if(this.key.classList.contains('drum-machine__key--top')) {
    this.key.classList.add('playing-top');
  } else if (this.key.classList.contains('drum-machine__key--middle')) {
    this.key.classList.add('playing-middle');
  } else if (this.key.classList.contains('drum-machine__key--bottom')) {
    this.key.classList.add('playing-bottom');
  }
  // Rewind to the start
  this.audio.currentTime = 0;
  this.audio.play();
}

Drum.prototype.removeTransition = function(target) {
  //Skip it if it's not transform
  if(target.propertyName !== 'transform') return;
  // Is there a DRYer way to write this?
    this.classList.remove('playing-top');
    this.classList.remove('playing-middle');
    this.classList.remove('playing-bottom');
}

// EVENT LISTENERS

window.addEventListener('keydown', (e) => {
  // INIT NEW DRUM
  const drum = new Drum(e);
  // CALL FUNCTION TO PLAY SOUND
  drum.playSound();
  // LOOP THROUGH KEY BEING PRESSED AND REMOVE CLASS WHEN TRANSITION
  drum.keys.forEach(key => key.addEventListener('transitionend', drum.removeTransition));
});
