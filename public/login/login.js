document.addEventListener("DOMContentLoaded", function () {
    window.queryUser = async function (username) {
        /// http://localhost:3000/user/query?username=username

        try {
            const response = await fetch(
                "http://localhost:3000/user/userInfo?username=" + username
            );

            if (!response.ok) {
                throw new Error(
                    "网络错误：" + response.status + " " + response.statusText
                );
            }

            const data = await response.json();
            alert("查询用户成功：" + JSON.stringify(data));
        } catch (err) {
            alert("查询用户失败：" + err.message);
        }
    };

    window.registerUser = async function (username, password) {
        const url = "http://localhost:3000/user/register";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((errData) => {
                    throw new Error(errData.error);
                });
            }
            return response.json();
        })
        .catch((error) => {
            console.error("错误信息:", error.message);
        });
    };

    window.loginUser = function (username, password) {
        alert("登录用户：" + username + "，密码：" + password);
    };
});
