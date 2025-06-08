function loadPage(page) {
    fetch(page)
        .then((response) => response.text())
        .then((html) => {
            document.getElementById("content-area").innerHTML = html;
        });
}

// 默认加载登录页
window.onload = () => loadPage("/login/login.html");
