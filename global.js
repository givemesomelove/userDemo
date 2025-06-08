const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/// 判断字符串是否为空
const isStrValid = (str) => {
    return typeof str === "string" && str.trim() !== "";
};
global.isStrValid = isStrValid;

/// 将字符串转换为ObjectId(mongodb相关)
const dbObjectStr2Id = (str) => {
    if (!ObjectId.isValid(str)) throw new Error("无效的ObjectId");

    return new ObjectId(str);
};
global.dbObjectStr2Id = dbObjectStr2Id;

/// 将ObjectId转换为字符串(mongodb相关)
const dbObjectId2Str = (objectId) => {
    if (!(objectId instanceof ObjectId)) throw new Error("无效的ObjectId");

    return objectId.toHexString();
};
global.dbObjectId2Str = dbObjectId2Str;

/// 密码加密
const hashPassword = async (password) => {
    if (!isStrValid(password)) throw new Error("密码不能为空");

    return await bcrypt.hash(password, 10);
};
global.hashPassword = hashPassword;

/// 生成token
const createToken = (userId) => {
    const token = jwt.sign({ userId, userId }, "mysecretkey", {
        expiresIn: "24h",
    });
    return token;
};
global.createToken = createToken;

/// 验证token
const jwtVerify = (token) => {
    return jwt.verify(token, "mysecretkey");
}
global.jwtVerify = jwtVerify;
