class ResponsiveVideoBanner extends HTMLElement {
    constructor() {
        super();
        this.resizeTimer = null;
        this.splideInstance = null;
    }

    connectedCallback() {
        this.init();
        this.initSplide();
    }

    init() {
        // 初始化视频源切换
        this.switchVideoSource();

        // 绑定窗口大小变化事件
        this.bindResizeEvent();
    }

    initSplide() {
        const splideElement = this.querySelector('.js-splide-ib');
        if (splideElement && typeof Splide !== 'undefined') {
            this.splideInstance = new Splide(splideElement).mount();
        }
    }

    // 检测是否为移动设备
    isMobileDevice() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // 切换视频源
    switchVideoSource() {
        const videos = this.querySelectorAll('video[data-pc-src], video[data-phone-src]');

        videos.forEach(video => {
            const pcSrc = video.getAttribute('data-pc-src');
            const phoneSrc = video.getAttribute('data-phone-src');

            if (this.isMobileDevice() && phoneSrc) {
                // 切换到手机端视频
                if (video.src !== phoneSrc) {
                    video.src = phoneSrc;
                    video.load(); // 重新加载视频
                }
            } else if (!this.isMobileDevice() && pcSrc) {
                // 切换到桌面端视频
                if (video.src !== pcSrc) {
                    video.src = pcSrc;
                    video.load(); // 重新加载视频
                }
            }
        });
    }

    // 绑定窗口大小变化事件
    bindResizeEvent() {
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => this.switchVideoSource(), 250);
        });
    }

    disconnectedCallback() {
        if (this.resizeTimer) {
          clearTimeout(this.resizeTimer);
        }
        // 销毁Splide实例
        if (this.splideInstance) {
          this.splideInstance.destroy();
        }
      }

    // 公共方法：手动刷新视频源
    refreshVideoSource() {
        this.switchVideoSource();
    }

    // 公共方法：获取当前设备类型
    getDeviceType() {
        return this.isMobileDevice() ? 'mobile' : 'desktop';
    }
}

// 注册自定义元素
customElements.define('responsive-video-banner', ResponsiveVideoBanner);