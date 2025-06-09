const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");

const db = require("./db/db");
const { initRouters } = require("./routes/router");
const path = require("path");

/// 全局引入
require("./global");

const main = async () => {
    await db.connect();

    const app = express();
    app.use(compression());
    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.static("public"));
    app.use(express.json());

    initRouters(app);

    // 全局错误处理
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: "服务器错误" });
    });

    const port = 3000;
    app.listen(port, () => {
        console.log("服务器启动，开始监听端口:", port);
    });
};

main();
