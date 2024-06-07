var express = require('express');
var router = express.Router();

router.post("/writetitle", async function(req, res){
    var title = req.body
    console.log("req.body 확인:" + title)
    var createTitle = await sequelize.models.title.create(title)
    console.log("생성된 no 확인:" + createTitle.no)
    res.json({
        no: createTitle.no
    })
})

router.post("/writecontent", async function(req, res){
    let history = req.body
    
})
module.exports = router;