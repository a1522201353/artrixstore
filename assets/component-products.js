// component-products.js

class ProductGalleryH extends HTMLElement {
    constructor() {
        super();
        
        this.mainSplide = this.querySelector('.js-main-splide');
        this.thumbnailSplide = this.querySelector('.js-splide-thumbnail');
        this.thumbnailItems = this.querySelectorAll('.thumbnail-item');
        this.mainItems = this.querySelectorAll('.main-item');
        
        this.currentIndex = 0;
        this.bindEvents();
        this.initSplides();
    }

    bindEvents() {
        // 缩略图点击事件
        this.thumbnailItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
    }

    initSplides() {
        this.initMainSplide();
        this.initThumbnailSplide();
    }

    initMainSplide() {
        if (this.mainSplide && window.Splide) {
            this.mainSplideInstance = new Splide(this.mainSplide, {
                type: 'loop',
                perPage: 1,
                arrows: true,
                pagination: false,
            });

            this.mainSplideInstance.on('moved', (newIndex) => {
                this.currentIndex = newIndex;
                this.updateThumbnailActive(newIndex);
            });

            this.mainSplideInstance.mount();
        }
    }

    initThumbnailSplide() {
        if (this.thumbnailSplide && window.Splide) {
            this.thumbnailSplideInstance = new Splide(this.thumbnailSplide, {
                direction: 'ttb',
                height: '400px',
                perPage: 4,
                arrows: false,
                pagination: false,
                gap: '8px',
            });

            this.thumbnailSplideInstance.mount();
        }
    }

    goToSlide(index) {
        if (this.mainSplideInstance) {
            this.mainSplideInstance.go(index);
        }
        this.updateThumbnailActive(index);
    }

    updateThumbnailActive(index) {
        this.thumbnailItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
}

// 注册组件
customElements.define('product-gallery-h', ProductGalleryH);