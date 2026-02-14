document.addEventListener('DOMContentLoaded', () => {
    // 1. 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. 简单的进入视口动画 (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // 动画只播放一次
            }
        });
    }, observerOptions);

    // 选择所有卡片和部分标题进行观察
    const animatedElements = document.querySelectorAll('.card, .section-title, .hero-content, .hero-image');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // 3. 主题切换 (Light/Dark Mode)
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('.icon');

    // 检查本地存储的主题偏好
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // 如果系统偏好是深色
        body.setAttribute('data-theme', 'dark');
        updateIcon('dark');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === 'dark') {
            icon.textContent = '☀️';
        } else {
            icon.textContent = '🌓';
        }
    }

    // 4. 简单的音乐可视化条随机动画 (让它们看起来更自然)
    const bars = document.querySelectorAll('.music-visualizer .bar');
    
    function randomizeBars() {
        bars.forEach(bar => {
            // 随机改变高度，模拟音乐跳动
            const randomHeight = Math.floor(Math.random() * 60) + 40; // 40% - 100%
            bar.style.height = `${randomHeight}%`;
        });
    }

    // 每200ms更新一次，如果不想用CSS动画，可以用这个
    // setInterval(randomizeBars, 200); 
    // 但我们在CSS中已经定义了 keyframes 动画，这里就不重复了。
    // 如果想要更随机的效果，可以动态修改 animation-duration
    
    bars.forEach(bar => {
        const randomDuration = Math.random() * 0.5 + 0.5; // 0.5s - 1.0s
        bar.style.animationDuration = `${randomDuration}s`;
    });
});
