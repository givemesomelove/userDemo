// 当前表单状态（登录/注册）
let isLoginForm = true;

// DOM元素引用
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const switchLink = document.getElementById('switch-link');
const authForm = document.getElementById('auth-form');

// 切换登录/注册表单
function toggleForm() {
    isLoginForm = !isLoginForm;
    formTitle.textContent = isLoginForm ? '登录' : '注册';
    submitBtn.textContent = isLoginForm ? '登录' : '注册';
    switchLink.textContent = isLoginForm ? '没有账号？立即注册' : '已有账号？立即登录';
}

// 表单提交处理
function handleSubmit(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if(isLoginForm) {
        login(username, password);
    } else {
        register(username, password);
    }
}

// 登录功能（需实现）
function login(username, password) {
    console.log('调用登录方法:', username, password);
    // 实际业务逻辑实现位置
}

// 注册功能（需实现）
function register(username, password) {
    console.log('调用注册方法:', username, password);
    // 实际业务逻辑实现位置
}

// 事件监听
switchLink.addEventListener('click', toggleForm);
authForm.addEventListener('submit', handleSubmit);
