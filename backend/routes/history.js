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

router.get("/title/:no", async function(req, res){
    let no = req.params.no
    let result = await sequelize.models.title.findByPk(no)
    res.json({
        title: result.title,
        score: result.score
    })
})

router.get("/contents/:no", async function(req, res){
    let no = req.params.no
    let history = await sequelize.models.content.findAll({
        where: {
            titleNo: no
        },
        order:[["no", "ASC"]]
    })
    res.json(history)
})

router.post("/interviewTitles", async function(req, res){
    let page = req.body.page || 1
    let offset = (page - 1) * 10
    let titles = await sequelize.models.title.findAll({
        limit: 10,
        offset: offset,
        order:[["writeDate", "DESC"], ["no", "DESC"]]
    })
    let totalCount = await sequelize.models.title.count({
    })
    let totalPage = Math.ceil(totalCount/10)
    res.json({
        titles: titles,
        totalPage: totalPage
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

router.post("/deleteHistory", async function(req, res){
    console.log("삭제 실행됨")
    await sequelize.models.title.destroy({
        where: {
            no: req.body.no
        }
    })
    await sequelize.models.content.destroy({
        where: {
            titleNo: req.body.no
        }
    })
    res.json({
        result: "success"
    })
})
module.exports = router;