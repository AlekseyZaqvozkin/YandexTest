(() => {

  const caruselTwo = {};
  const caruselOne = {};

  caruselTwo.carusel = document.getElementById('target-carusel');
  caruselTwo.galerey = caruselTwo.carusel.querySelector('.galerey')
  caruselTwo.leftBtn = document.getElementById('prev-terget');
  caruselTwo.rightBtn = document.getElementById('next-target');
  caruselTwo.scrollPosition = document.getElementById('scroll-position-target');
  caruselTwo.elemQty = 5;


  caruselOne.carusel = document.getElementById('partner-carusel');
  caruselOne.galerey = caruselOne.carusel.querySelector('.galerey')
  caruselOne.leftBtn = document.getElementById('prev-partner');
  caruselOne.rightBtn = document.getElementById('next-partner');
  caruselOne.elemQty = caruselOne.carusel.querySelectorAll('.carusel__item').length;
  caruselOne.scrollPosition = document.getElementById('scroll-position-partner');

  window.onresize = checkCount;

  addListener();

  startCarusel()

  // start position
  function startCarusel() {
    caruselTwo.width = parseInt(getComputedStyle(caruselTwo.carusel.querySelector('.carusel__item')).width) + 20;
    caruselTwo.count = getCount(caruselTwo.carusel, caruselTwo.width);
    caruselTwo.position = 0;
    caruselTwo.countPosition = Math.ceil(caruselTwo.elemQty / caruselTwo.count);

    caruselOne.width = parseInt(getComputedStyle(caruselOne.carusel.querySelector('.carusel__item')).width) + 20;
    caruselOne.count = getCount(caruselOne.carusel, caruselOne.width);
    caruselOne.position = 0;
    caruselOne.countPosition = Math.ceil(caruselOne.elemQty / caruselOne.count);


    caruselOne.galerey.style.transform = `translateX(0px)`;
    caruselTwo.galerey.style.transform = `translateX(0px)`;

    renderScrollPositionDots(caruselTwo);
    renderScrollPositionNumber(caruselOne);
  }

  function addListener() {
    caruselTwo.leftBtn.addEventListener('click', () => {
      prevSlide(caruselTwo);
      renderScrollPositionDots(caruselTwo);
      renderSlide(caruselTwo);
    });

    caruselTwo.rightBtn.addEventListener('click', () => {
      nextSlide(caruselTwo);
      renderScrollPositionDots(caruselTwo);
      renderSlide(caruselTwo);
    });

    caruselOne.leftBtn.addEventListener('click', () => {
      prevSlide(caruselOne);
      renderScrollPositionNumber(caruselOne);
      renderSlide(caruselOne);
    });

    caruselOne.rightBtn.addEventListener('click', () => {
      nextSlide(caruselOne);
      renderScrollPositionNumber(caruselOne);
      renderSlide(caruselOne);
    });

  };

  function prevSlide(element) {
    --element.position;
    if (element.position < 0) {
      element.position = element.countPosition - 1;
    };
  };

  function nextSlide(element) {
    ++element.position;
    if (element.position >= element.countPosition) {
      element.position = 0
    };
  };

  function renderSlide(element) {
    const position = -getPosition(element);
    element.galerey.style.transform = `translateX(${position}px)`;
  };

  function checkCount() {
    let tempCountOne = getCount(caruselOne.carusel, caruselOne.width);
    let tempCountTwo = getCount(caruselTwo.carusel, caruselTwo.width);
    if ((tempCountOne != caruselOne.count) || (tempCountTwo != caruselTwo.count)) {
      startCarusel();
    };
  };

  function getCount(element, width) {
    let widthElem = parseInt(getComputedStyle(element).width);
    count = Math.round(widthElem / width);
    return count;
  };

  function renderScrollPositionDots(element) {
    element.scrollPosition.innerHTML = '';
    let countPosition = Math.ceil(element.elemQty / element.count);
    for (let i = 0; i < countPosition; i++) {
      const spanDot = document.createElement('span');
      spanDot.classList.add('scroll__dot');

      if (i == caruselTwo.position) {
        spanDot.classList.add('scroll__dot--active');
      };
      caruselTwo.scrollPosition.append(spanDot);
    };
  };

  function getPosition(element) {
    return position = element.width * element.count * element.position;
  };

  function renderScrollPositionNumber(element) {
    let countPosition = Math.ceil((element.position + 1) * element.count);
    element.scrollPosition.innerHTML = '';
    element.scrollPosition.innerHTML = countPosition + '/' + element.elemQty;
  };

  setInterval(()=>{
    nextSlide(caruselOne);
    renderScrollPositionNumber(caruselOne);
    renderSlide(caruselOne);
  }, 4000);

})();