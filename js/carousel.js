function Carousel() {
	this.carousel = document.querySelector('#carousel');
	this.slides = document.querySelectorAll('.slide');
	this.indicatorsContainer = document.querySelector('.indicators-container');
	this.indicators = document.querySelectorAll('.indicator');
	this.pauseBtn = document.querySelector('#pause');
	this.prevBtn = document.querySelector('#previous');
	this.nextBtn = document.querySelector('#next');


	this.currentSlide = 0;
	this.interval = 2000;
	this.slidesCount = this.slides.length;
	this.intervalID = null;
	this.isPlaying = true;
	this.swipeStartX = null;
	this.swipeEndX = null;

	this.LEFT_ARROW = 'ArrowLeft';
	this.RIGHT_ARROW = 'ArrowRight';
	this.SPACE = 'Space';
	this.FA_PAUSE ='<i class="far fa-pause-circle"></i>';
	this.FA_PLAY = '<i class="far fa-play-circle"></i>';
}


Carousel.prototype = {

_initListeners(){
	this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
	this.prevBtn.addEventListener('click', this.prevSlide.bind(this));
	this.nextBtn.addEventListener('click', this.nextSlide.bind(this));
	this.indicatorsContainer.addEventListener('click', this.indicate.bind(this));
	document.addEventListener('keydown', this.pressKey.bind(this));
	this.carousel.addEventListener('touchstart', this.swipeStart.bind(this));
	this.carousel.addEventListener('touchend', this.swipeEnd.bind(this));
},

_goToSlide(n){
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.slidesCount) % this.slidesCount;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
},
_goToPrev(){
  this._goToSlide(this.currentSlide - 1);
},

_goToNext(){
  this._goToSlide(this.currentSlide + 1);   
},

prevSlide(){
  this._pause();
  this._goToPrev();
},

nextSlide(){  
  this._pause();
  this._goToNext();
},

_play: function(){
    this.intervalID = setInterval(() => this._goToNext(), this.interval);
    this.pauseBtn.innerHTML = this.FA_PAUSE; 
    this.isPlaying = true;
},

_pause: function(){
    if(this.isPlaying){
    clearInterval(this.intervalID);
    this.pauseBtn.innerHTML = this.FA_PLAY;
    this.isPlaying = false; 
  }
},

pausePlay(){
    this.isPlaying ? this._pause():this._play();
     
},

indicate(e){
    let target = e.target;
    if(target.classList.contains('indicator')){
     this._pause();
     this._goToSlide(+target.getAttribute('data-slide-to'));  
  }
},
pressKey(e){
    if(e.code === this.LEFT_ARROW) this.prevSlide();
    if(e.code === this.RIGHT_ARROW) this.nextSlide();
    if(e.code === this.SPACE) this.pausePlay();
},
swipeStart(e){
 this.swipeStartX = e.changedTouches[0].pageX;
},

swipeEnd(e){
 this.swipeEndX = e.changedTouches[0].pageX;
 if(this.swipeStartX - this.swipeEndX > 100) this.nextSlide();
 if(this.swipeStartX - this.swipeEndX < -100) this.prevSlide();
},

init(){
	this._initListeners();
	this.intervalID = setInterval(() => this._goToNext(), this.interval);
	}
}

