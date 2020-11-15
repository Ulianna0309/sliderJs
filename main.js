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
    pauseBtn.innerHTML = '<i class="far fa-pause-circle"></i>'; 
    isPlaying = true;
}

function pause(){
    if(isPlaying){
    clearInterval(intervalID);
    pauseBtn.innerHTML = '<i class="far fa-play-circle"></i>'; 
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
    if(e.code ==='ArrowLeft') prevSlide();
    if(e.code ==='ArrowRight') nextSlide();
    if(e.code === 'Space') pausePlay();
}



pauseBtn.addEventListener('click', pausePlay);
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
indicatorsContainer.addEventListener('click', indicate);
document.addEventListener('keydown', pressKey);

intervalID = setInterval(goToNext, interval);

