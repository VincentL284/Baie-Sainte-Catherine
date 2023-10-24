import Swiper from 'swiper/bundle';

export default class Carousel {
  constructor(element) {
    this.element = element;
    this.options = {
      slidesPerView: 1,
      spaceBetween: 10,
      direction: 'horizontal',
      effect: '',
      pagination: {
        el: this.element.querySelector('.swiper-pagination'),
        type: 'bullets',
      },
      navigation: {
        nextEl: this.element.querySelector('.swiper-button-next'),
        prevEl: this.element.querySelector('.swiper-button-prev'),
      },
    };
    this.init();
  }

  init() {
    this.setOptions();
    const swiper = new Swiper(this.element, this.options);
  }

  setOptions() {
    this.variant = this.element.dataset.variant;
    if (this.variant == 'split') {
      this.options.breakpoints = {
        768: {
          slidesPerView: 2,
        },
      };
    }

    if (this.variant == 'vertical') {
      this.options.direction = 'vertical';
      this.options.spaceBetween = 30;
    }

    if ('autoplay' in this.element.dataset) {
      this.options.autoplay = {
        delay: 3500,
      };
    }

    if ('loop' in this.element.dataset) {
      this.options.loop = true;
    }

    if ('gap' in this.element.dataset) {
      this.options.spaceBetween = parseInt(this.element.dataset.gap);
    }

    if ('fade' in this.element.dataset) {
      this.options.effect = 'fade';
    }
  }
}
