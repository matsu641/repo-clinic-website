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
    });
});
