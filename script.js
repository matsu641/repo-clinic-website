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
            contents.forEach(content => {
                content.classList.remove("active");
                // フェードアウト効果のためのクラスを追加
                content.classList.add("fade-out");
            });

            // data-tab の値に対応する要素を取得
            const targetContent = document.getElementById(tab.dataset.tab);
            if (targetContent) {
                // 少し遅延してからフェードイン効果を適用
                setTimeout(() => {
                    // フェードアウトクラスを削除
                    contents.forEach(content => content.classList.remove("fade-out"));
                    // ターゲットコンテンツにactiveクラスを追加
                    targetContent.classList.add("active");
                    // フェードイン効果を確実に適用
                    targetContent.classList.add("fade-in-active");
                    
                    // フェードイン完了後にクラスをリセット
                    setTimeout(() => {
                        targetContent.classList.remove("fade-in-active");
                    }, 300);
                }, 50);
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

    // FAQ の開閉機能
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // 他のFAQを閉じる
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // 現在のFAQの開閉を切り替え
            item.classList.toggle('active');
        });
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
