class SplideCarousel extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.initSplide();
    }
  
    initSplide() {
      const splideElement = this.querySelector('.js-splide-specilists');
      if (splideElement && window.Splide) {
        new Splide(splideElement).mount();
      }
    }
  }
  
  // 注册自定义元素
  customElements.define('splide-carousel', SplideCarousel);