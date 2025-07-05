!(function(d){
  
const itemClassName = "carousel__photo";
let items = d.getElementsByClassName(itemClassName),
    totalItems = items.length,
    slides = [0, 1],
    moving = true;

// Set classes
function setInitialClasses() {
  // Targets the previous, current, and next items
  // This assumes there are at least three items.
  items[wrap(slides[0] - 1)].classList.add("prev");
  items[slides[0]].classList.add("active");
  items[slides[1]].classList.add("active");
  items[wrap(slides[1] + 1)].classList.add("next");
}

// Set event listeners
function setEventListeners() {
  var next = d.getElementsByClassName('carousel__button--next')[0],
      prev = d.getElementsByClassName('carousel__button--prev')[0];
  next.addEventListener('click', moveNext);
  prev.addEventListener('click', movePrev);
}

// Next navigation handler

function moveNext() {
  if (!moving) {
    slides = [wrap(slides[0] + 1), wrap(slides[1] + 1)];
    moveCarouselTo(slides);
  }
}

// Previous navigation handler
function movePrev() {
  if (!moving) {
    slides = [wrap(slides[0] - 1), wrap(slides[1] - 1)];
    moveCarouselTo(slides);
  }
}

function disableInteraction() {
  // Set 'moving' to true for the same duration as our transition.
  // (0.5s = 500ms)
  
  moving = true;
  // setTimeout runs its function once after the given time
  setTimeout(function(){
    moving = false
  }, 900);
}

function moveCarouselTo([left, right]) {
  if (!moving) {
    disableInteraction();

    const total = totalItems;

    // Wrap-around helpers

    const newPrevious = [wrap(left - 1), left];
    const newNext = [right, wrap(right + 1)];

    // Create a deduplicated list of all involved indices
    const activeSlides = Array.from(new Set([...newPrevious, ...newNext]));

    // Reset all items except those in activeSlides
    for (let i = 0; i < total; i++) {
      if (!activeSlides.includes(i)) {
        items[i].className = itemClassName;
      }
    }

    // Apply classes
    items[newPrevious[0]].className = itemClassName + " prev";
    items[newPrevious[1]].className = itemClassName + " active left_item";
    items[newNext[0]].className = itemClassName + " active right_item";
    items[newNext[1]].className = itemClassName + " next";
  }
}

function initCarousel() {

  if (totalItems < 4) {
    console.warn("Carousel needs at least 4 items.");
    return;
  }

  setInitialClasses();
  setEventListeners();
  // Set moving to false so that the carousel becomes interactive
  moving = false;
}

function wrap(i) {
  return (i + totalItems) % totalItems;
}

// make it rain
initCarousel();
}(document));
