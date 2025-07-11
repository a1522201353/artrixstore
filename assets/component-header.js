class StickyHeader extends HTMLElement {
    constructor() {
        super();
        this.lastScrollTop = 0;
        this.header = null;
        this.headerHeight = 0;
    }

    connectedCallback() {
        // 组件挂载后初始化
        this.init();
    }

    init() {
        // 获取header元素
        this.header = document.querySelector('.header') || this.querySelector('.header');
        
        if (!this.header) {
            console.warn('Header element not found');
            return;
        }

        this.headerHeight = this.header.offsetHeight;
        
        // 绑定滚动事件
        this.bindScrollEvent();
        
        // 初始化下拉菜单交互
        this.initDropdownMenu();
    }

    // 处理滚动的函数
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 如果在页面顶部，始终显示导航栏并移除背景颜色
        // if (scrollTop <= 0) {
        //     this.header.style.transform = 'translateY(0)';
        //     this.header.classList.remove('scrolled');
        // } else {
        //     // 不在顶部时添加背景颜色
        //     this.header.classList.add('scrolled');
        // }
        
        // 向下滚动 - 隐藏导航栏
        if (scrollTop > this.lastScrollTop && scrollTop > this.headerHeight) {
            this.header.style.transform = 'translateY(-100%)';
            this.header.style.transition = 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out';
        } 
        // 向上滚动 - 显示导航栏
        else if (scrollTop < this.lastScrollTop) {
            this.header.style.transform = 'translateY(0)';
            this.header.style.transition = 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out';
        }
        
        this.lastScrollTop = scrollTop;
    }

    // 绑定滚动事件
    bindScrollEvent() {
        // 使用箭头函数保持this上下文
        window.addEventListener('scroll', () => this.handleScroll());
    }

    // 初始化下拉菜单交互
    initDropdownMenu() {
        const menuItems = document.querySelectorAll('.hm-li');
        
        menuItems.forEach(item => {
            // 鼠标悬停事件
            item.addEventListener('mouseenter', () => {
                // 移除兄弟元素的active类
                menuItems.forEach(sibling => {
                    if (sibling !== item) {
                        sibling.classList.remove('active');
                    }
                });
                // 添加active类到当前元素
                item.classList.add('active');
            });

            // 鼠标离开事件
            item.addEventListener('mouseleave', () => {
                item.classList.remove('active');
            });
        });
    }

    // 组件卸载时清理事件监听器
    disconnectedCallback() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    // 公共方法：手动显示/隐藏header
    showHeader() {
        if (this.header) {
            this.header.style.transform = 'translateY(0)';
        }
    }

    hideHeader() {
        if (this.header) {
            this.header.style.transform = 'translateY(-100%)';
        }
    }

    // 公共方法：切换背景颜色
    
}

// 注册自定义元素
customElements.define('sticky-header', StickyHeader);