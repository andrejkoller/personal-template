function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function scrollOnIntroClick() {
  const element = document.getElementById("introduction-section");
  element.scrollIntoView({ behavior: "smooth" });
}

class AnimationController {
  constructor(options = {}) {
    this.threshold = options.threshold || 0.1;
    this.rootMargin = options.rootMargin || "0px 0px -100px 0px";
    this.animateOnce = options.animateOnce !== false;
    this.observer = this.createObserver();
  }

  createObserver() {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target);
            if (this.animateOnce) {
              this.observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: this.threshold,
        rootMargin: this.rootMargin,
      }
    );
  }

  animateElement(element) {
    const targetClass = element.dataset.animateTarget;
    const transitionClass = element.dataset.transitionClass;

    if (targetClass && transitionClass) {
      const targetElement = element.querySelector(`.${targetClass}`) || element;
      targetElement.classList.add(transitionClass);
    }
  }

  observe(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => this.observer.observe(el));
    return this;
  }

  disconnect() {
    this.observer.disconnect();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const animationController = new AnimationController({
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
    animateOnce: true,
  });

  animationController.observe("[data-animate]");
});
