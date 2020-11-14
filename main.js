let slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 2000);
let playing = true;
let pauseButton = document.querySelector('#pause');
let next = document.querySelector('#next');
let previous = document.querySelector('#previous');
let controls = document.querySelectorAll('.controls');
let indicators = document.querySelectorAll('.indicator');
let indicatorsContainer = document.querySelectorAll('#indicators-container');

function nextSlide() {
goToSlide(currentSlide + 1);
}

function prevSlide() {
goToSlide(currentSlide - 1);
}

function goToSlide(n) {
slides[currentSlide].className = 'slide';
currentSlide = (n + slides.length) % slides.length;
slides[currentSlide].className = 'slide active';
indicators[currentSlide].className = 'indicator';
indicators[currentSlide].className = 'indicator active';
}

function pauseSlide() {
    pauseButton.innerHTML = '<i class="far fa-play-circle"></i>';
    playing = false;
    clearInterval(slideInterval);
}

function playSlide() {
    pauseButton.innerHTML = '<i class="far fa-pause-circle"></i>';
    playing = true;
    slideInterval = setInterval(nextSlide, 2000);
}
function indicate(e){
    let target = e.target;
    if (target.classList.contains('indicator')){
    pauseSlide();
    goToSlide(target.getAttribute('data-slide-to'));

    }
}
function pressKey(e){
    //e.code
    //ArrowLeft
    //ArrowRight
    //Space
    if(e.code === "ArrowLeft") prevSlide();
    if(e.code === "ArrowRight") nextSlide();
    if(e.code === "Space") pauseSlide() ;
}

pauseButton.onclick = function() {
    if (playing) {
  	    pauseSlide();
    } else {
  	    playSlide();
	  }
};

next.onclick = function () {
pauseSlide();
nextSlide();
};

previous.onclick = function () {
pauseSlide();
prevSlide();
};


document.addEventListener('keydown', pressKey);

for (let i = 0; i < controls.length; i++){
controls[i].style.display = 'inline-block';
}
for (let i = 0; i < indicators.length; i++){
indicators[i].addEventListener('click', indicate);
}





