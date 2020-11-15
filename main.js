const carousel = document.querySelector('#carousel');
const slides = document.querySelectorAll('.slide');
const indicatorsContainer = document.querySelector('.indicators-container');
const indicators = document.querySelectorAll('.indicator');
const pauseBtn = document.querySelector('#pause');
const prevBtn = document.querySelector('#previous');
const nextBtn = document.querySelector('#next');


let currentSlide = 0;
let interval = 2000;
let slidesCount = slides.length;
let intervalID = null;
let isPlaying = true;
let swipeStartX = null;
let swipeEndX = null;

const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';
const SPACE = 'Space';
const FA_PAUSE ='<i class="far fa-pause-circle"></i>';
const FA_PLAY = '<i class="far fa-play-circle"></i>';


function goToSlide(n){
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + slidesCount) % slidesCount;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
}

function goToPrev(){
  goToSlide(currentSlide - 1);
}

function goToNext(){
  goToSlide(currentSlide + 1);   
}

function prevSlide(){
  goToPrev();
  pause();
}

function nextSlide(){  
  goToNext();
  pause();
}

function play(){
    intervalID = setInterval(goToNext, interval);
    pauseBtn.innerHTML = FA_PAUSE; 
    isPlaying = true;
}

function pause(){
    if(isPlaying){
    clearInterval(intervalID);
    pauseBtn.innerHTML = FA_PLAY;
    isPlaying = false; 
  }
}

function pausePlay(){
    if (isPlaying) pause();
    else play(); 
}


function indicate(e){
    let target = e.target;
    if(target.classList.contains('indicator')){
     pause();
     goToSlide(+target.getAttribute('data-slide-to'));  
  }
}

function pressKey(e){
    if(e.code === LEFT_ARROW) prevSlide();
    if(e.code === RIGHT_ARROW) nextSlide();
    if(e.code === SPACE) pausePlay();
}
function swipeStart(e){
 swipeStartX = e.changedTouches[0].pageX;
}
function swipeEnd(e){
 swipeEndX = e.changedTouches[0].pageX;
 if(swipeStartX - swipeEndX > 100) nextSlide();
 if(swipeStartX - swipeEndX < -100) prevSlide();
 }


pauseBtn.addEventListener('click', pausePlay);
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
indicatorsContainer.addEventListener('click', indicate);
document.addEventListener('keydown', pressKey);
carousel.addEventListener('touchstart', swipeStart);
carousel.addEventListener('touchend', swipeEnd);
intervalID = setInterval(goToNext, interval);

