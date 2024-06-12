var express = require('express');
const { where } = require('sequelize');
var router = express.Router();

router.post("/writetitle", async function(req, res){
    var title = req.body
    var createTitle = await sequelize.models.title.create(title)
    res.json({
        no: createTitle.no
    })
})

router.post("/writecontent", async function(req, res){
    let content = req.body
    console.log("콘텐츠 작성 호출됨")
    await sequelize.models.content.create(content)
})

router.post("/updateTitle", async function(req, res){
    console.log("업데이트 아이디:" + req.body.no)
    console.log("업데이트 타이틀:" + req.body.title)
    console.log("업데이트 점수:" + req.body.score)
    await sequelize.models.title.update({
        title:req.body.title,
        score:req.body.score
    },
    {
        where: {
            no: req.body.no
        }
    })
    res.json({
        result: "success"
    })
})
module.exports = router;