class DesktopProjects {

  slides = [0, 1]; // two slides shown at all times
  moving = false;  // Set moving to false so that the carousel becomes interactive

  constructor(class_name) {
    this.itemClassName = class_name;
    this.items = document.querySelectorAll("." + class_name);
    this.totalItems = this.items.length;

    if (this.totalItems < 4) {
      console.warn("Carousel needs at least 4 items.");
      return;
    }

    this.setInitialClasses();
    this.setEventListeners();
  }

  // Set classes
  setInitialClasses() {
    // Targets the previous, current, and next items
    // This assumes there are at least three items.
    this.items[this.wrap(this.slides[0] - 1)].classList.add("prev");
    this.items[this.slides[0]].classList.add("active");
    this.items[this.slides[1]].classList.add("active");
    this.items[this.wrap(this.slides[1] + 1)].classList.add("next");
  }

  // Set event listeners
  setEventListeners() {
    const next = document.getElementsByClassName('folder_button_next')[0],
          prev = document.getElementsByClassName('folder_button_prev')[0];
    next.addEventListener('click', () => this.moveNext());
    prev.addEventListener('click', () => this.movePrev());
  }

  // Next navigation handler
  moveNext() {
    if (!this.moving) {
      this.slides = [this.wrap(this.slides[0] + 1), this.wrap(this.slides[1] + 1)];
      this.moveCarouselTo(this.slides);
    }
  }

  // Previous navigation handler
  movePrev() {
    if (!this.moving) {
      this.slides = [this.wrap(this.slides[0] - 1), this.wrap(this.slides[1] - 1)];
      this.moveCarouselTo(this.slides);
    }
  }

  disableInteraction() {
    // Set 'moving' to true for the same duration as our transition.
    // (0.5s = 500ms)
    
    this.moving = true;
    // setTimeout runs its function once after the given time
    setTimeout(() => {
        this.moving = false;
    }, 900);
  }

  moveCarouselTo([left, right]) {
    if (!this.moving) {
      this.disableInteraction();

      // Wrap-around helpers
      const newPrevious = [this.wrap(left - 1), left],
            newNext = [right, this.wrap(right + 1)],

            // Create a deduplicated list of all involved indices
            activeSlides = Array.from(new Set([...newPrevious, ...newNext]));

      // Reset all items except those in activeSlides
      for (let i = 0; i < this.totalItems; i++) {
        if (!activeSlides.includes(i)) {
          this.items[i].className = this.itemClassName;
        }
      }

      // Apply classes
      this.items[newPrevious[0]].className = this.itemClassName + " prev";
      this.items[newPrevious[1]].className = this.itemClassName + " active left_item";
      this.items[newNext[0]].className = this.itemClassName + " active right_item";
      this.items[newNext[1]].className = this.itemClassName + " next";
    }
  }

  wrap(i) {
    return (i + this.totalItems) % this.totalItems;
  }
}

/*
class MobileProjects {
  slide = 0;
  moving = false;

  constructor(class_name) {
    this.itemClassName = class_name;
    this.items = document.querySelectorAll("." + class_name);
    this.totalItems = this.items.length;

    if (this.totalItems < 2) {
      console.warn("Carousel needs at least 2 items.");
      return;
    }

    this.setInitialClasses();
    this.setEventListeners();
  }

  // Set classes
  setInitialClasses() {
    // Targets the previous, current, and next items
    // This assumes there are at least three items.
    this.items[this.wrap(this.slides[0] - 1)].classList.add("prev");
    this.items[this.slides[0]].classList.add("active");
    this.items[this.slides[1]].classList.add("active");
    this.items[this.wrap(this.slides[1] + 1)].classList.add("next");
  }

  // Set event listeners
  setEventListeners() {
    const next = document.getElementsByClassName('folder_button_next')[0],
          prev = document.getElementsByClassName('folder_button_prev')[0];
    next.addEventListener('click', this.moveNext.bind(this));
    prev.addEventListener('click', this.movePrev.bind(this));
  }
}
*/

const desktop_carousel = new DesktopProjects("project_file")