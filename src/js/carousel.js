class DesktopProjects {

  slides = [0, 1]; // two slides shown at all times
  moving = false;  // Set moving to false so that the carousel becomes interactive
  prev = document.getElementsByClassName('folder_button_prev')[0];
  next = document.getElementsByClassName('folder_button_next')[0];

  constructor(class_name) {
    this.itemClassName = class_name;
    this.items = document.querySelectorAll("." + class_name);
    this.totalItems = this.items.length;

    if (this.totalItems < 2) {
      console.warn("Carousel needs at least 2 items.");
      return;
    }

    if (this.totalItems == 2) {
      this.next.classList.add("folder_button_next_off");
    }

    this.setInitialClasses();
    this.setEventListeners();
  }

  // Set classes
  setInitialClasses() {
    // Targets the previous, current, and next items
    // This assumes there are at least three items
    if (this.totalItems > 2) {
      this.items[this.slides[1] + 1].classList.add("next");
    }
  }

  // Set event listeners
  setEventListeners() {
    this.next.addEventListener('click', () => this.moveNext());
    this.prev.addEventListener('click', () => this.movePrev());
  }

  disableInteraction() {
    this.moving = true;
    // setTimeout runs its function once after the given time
    setTimeout(() => {
        this.moving = false;
    }, 700);
  }

  // Check if at either end of the carousel
  check_end() {
    if(this.slides[0] == 0) {
      this.prev.classList.add("folder_button_prev_off");
    } else {
      if (this.prev.classList.contains("folder_button_prev_off")){
        this.prev.classList.remove("folder_button_prev_off");
      }
    }

    if(this.slides[1] == this.totalItems - 1) {
      this.next.classList.add("folder_button_next_off");
    } else {
      if (this.next.classList.contains("folder_button_next_off")){
        this.next.classList.remove("folder_button_next_off");
      }
    }
  }

  // Next navigation handler
  moveNext() {
    if (!this.moving) {
      this.slides = [this.slides[0] + 1, this.slides[1] + 1];
      this.moveCarouselTo(this.slides);
    }
  }

  // Previous navigation handler
  movePrev() {
    if (!this.moving) {
      this.slides = [this.slides[0] - 1, this.slides[1] - 1];
      this.moveCarouselTo(this.slides);
    }
  }

  moveCarouselTo([left, right]) {
    if (!this.moving) {
      this.disableInteraction();

      // Wrap-around helpers
      const newPrevious = [left - 1, left],
            newNext = [right, right + 1],

            // Create a deduplicated list of all involved indices
            activeSlides = Array.from(new Set([...newPrevious, ...newNext]));

      // Reset all items except those in activeSlides
      for (let i = 0; i < this.totalItems; i++) {
        if (!activeSlides.includes(i)) {
          this.items[i].className = this.itemClassName;
        }
      }

      // Apply classes
      if(newPrevious[0] != -1) {
        this.items[newPrevious[0]].className = this.itemClassName + " prev";
      }
      this.items[newPrevious[1]].className = this.itemClassName + " left_item";
      this.items[newNext[0]].className = this.itemClassName + " right_item";
      if(newNext[1] != this.totalItems) {
        this.items[newNext[1]].className = this.itemClassName + " next";
      }

      this.check_end();
    }
  }
}

const desktop_carousel = new DesktopProjects("project_file");
const carousel = document.querySelector("#mobile-carousel");
const slides = carousel.querySelectorAll(".floppy_link");
const dots = document.querySelectorAll(".dot");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = [...slides].indexOf(entry.target);

                dots.forEach(dot => dot.classList.remove("active"));
                dots[index].classList.add("active");
            }
        });
    },
    {
        root: carousel,
        threshold: 0.6
    }
);

slides.forEach(slide => observer.observe(slide));
