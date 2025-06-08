const username = ' ';
/// 判断username是否为空字符串，或者只有空格回车
function isEmptyOrWhitespace(str) {
    return !str || !str.trim();
}

if (isEmptyOrWhitespace(username)) {
    console.log('Username is empty or whitespace');
} else {
    console.log('Username is valid:', username);
}