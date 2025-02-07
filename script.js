document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // アクティブなタブを切り替え
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            // 表示するセクションを切り替え
            contents.forEach(content => content.classList.remove("active"));
            document.getElementById(tab.dataset.tab).classList.add("active");
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

const categoryList = document.getElementById("category-list");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const chatBody = document.getElementById("chat-body");

let selectedCategory = "";

// カテゴリーがクリックされたときの動作
categoryList.addEventListener("click", (event) => {
    if (event.target.classList.contains("category-option")) {
        selectedCategory = event.target.innerText;

        // カテゴリー選択のメッセージを表示
        chatBody.innerHTML += `<p><strong>AI:</strong> 「${selectedCategory}」に関する質問ですね。具体的な質問を入力してください。</p>`;

        // 入力フォームと送信ボタンを有効化
        userInput.disabled = false;
        sendButton.disabled = false;
    }
});

// 送信ボタンがクリックされたときの動作
sendButton.addEventListener("click", async () => {
    const userQuestion = userInput.value.trim();
    if (!userQuestion) return;

    // 質問をチャット画面に表示
    chatBody.innerHTML += `<p><strong>あなた:</strong> ${userQuestion}</p>`;
    userInput.value = "";

    // JSONファイルからFAQデータを読み込む
    const response = await fetch("faq.json");
    const faqData = await response.json();

    // 質問と類似するものを検索
    let answer = "すみません、その質問にはまだ対応していません。";  // 初期メッセージ
    
    //カテゴリーに応じて絞り込み検索する
    faqData.forEach(faq => {
        if (faq.category === selectedCategory && userQuestion.includes(faq.question)) {
            answer = faq.answer;
        }
    });
    

    // 回答をチャット画面に表示
    chatBody.innerHTML += `<p><strong>AI:</strong> ${answer}</p>`;

    // チャット画面を自動でスクロール
    chatBody.scrollTop = chatBody.scrollHeight;
});
