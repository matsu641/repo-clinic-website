document.addEventListener("DOMContentLoaded", () => {
    // タブ切り替え
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // すべてのタブから active クラスを外す
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            // すべてのコンテンツから active クラスを外す
            contents.forEach(content => content.classList.remove("active"));

            // data-tab の値に対応する要素を取得して active クラスを追加
            const targetContent = document.getElementById(tab.dataset.tab);
            if (targetContent) {
                targetContent.classList.add("active");
            } else {
                console.error(`Tab content with id "${tab.dataset.tab}" not found.`);
            }
        });
    });

    // Swiper.jsの初期化
    const swiper = new Swiper('.swiper-container', {
        loop: true, // スライドをループ
        autoplay: {
            delay: 5000, // 5秒ごとにスライド切り替え
            disableOnInteraction: false, // ユーザー操作後も自動再生を継続
        },
        pagination: {
            el: '.swiper-pagination', // ページネーションを有効
            clickable: true, // ページネーションのクリックを有効
        },
        navigation: {
            nextEl: '.swiper-button-next', // 次のスライドボタン
            prevEl: '.swiper-button-prev', // 前のスライドボタン
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
    });

    // スクロール時のパララックス効果
    function handleScroll() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // スクロール時のフェードイン効果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 各セクションにフェードイン効果を適用
    const animateElements = document.querySelectorAll('section, .card, .facility-item, .rehab-card');
    animateElements.forEach((el, index) => {
        // 遅延を追加して順次表示
        el.style.transitionDelay = `${index * 0.1}s`;
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // スムーズスクロールの強化
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // マウス追従効果
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // カスタムカーソル（オプション）
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(102, 205, 170, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);

    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // スクロールイベント
    window.addEventListener('scroll', handleScroll);
    
    // 初期実行
    handleScroll();

    // ローディングアニメーション
    const loader = document.createElement('div');
    loader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #66cdaa 0%, #5bb89a 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        ">
            <div style="
                width: 50px;
                height: 50px;
                border: 3px solid rgba(255,255,255,0.3);
                border-top: 3px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            "></div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    document.body.appendChild(loader);

    // 3秒後にローディングを非表示
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 2000);
});
