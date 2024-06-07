var express = require('express');
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
module.exports = router;