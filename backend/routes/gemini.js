const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI('AIzaSyBIpZ5MzBRZZmKRfIGiGGMB3vpZOHF8HdM');
var express = require('express');
var router = express.Router();

router.post('/basic', async function (req, res) {
    let message = genAI ? "연결 성공" : "연결 실패";
    res.json({
        result: message
    })
})

module.exports = router;