const { GoogleGenerativeAI } = require('@google/generative-ai');
var express = require('express');
var router = express.Router();

router.post("/gemini/basic", async function (req, res) {
    const genAI = new GoogleGenerativeAI('AIzaSyBIpZ5MzBRZZmKRfIGiGGMB3vpZOHF8HdM');
    let message = genAI ? "연결 실패" : "연결 성공";
    res.json({
        result: message
    })
})

module.exports = router;