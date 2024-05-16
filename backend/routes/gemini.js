const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyBIpZ5MzBRZZmKRfIGiGGMB3vpZOHF8HdM');
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

var express = require('express');
var router = express.Router();

router.post('/basic', async function (req, res) {
    let message = genAI ? "연결 성공" : "연결 실패";
    res.json({
        result: message
    })
})

router.post('/quiz', async function (req, res) {
    let chat = await model.startChat({
        history: [{
            role: "user",
            parts: [{text: "안녕"}]
        },{
            role: "model",
            parts: [{text: "안녕"}]
        }],
        generationConfig: {
            maxOutputTokens: 100,
        }
    })
    const result = await chat.sendMessage("자바 대표 특성 1개 알려줘")
    .then((result) => {
        const response = result.response
        const text = response.text();
        console.log(text)
        res.json({
            result: text
        })
    })

    
    
})

module.exports = router;