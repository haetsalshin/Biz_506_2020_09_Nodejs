const express = require("express");
const router = express.Router();

const moment = require("moment");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/*
  Client에서 데이터를 보내는 3가지 방법
  1. query String방식
    http://localhost:3000/?변수1=변수값&변수2=변수값
    let 변수1 = req.query.변수1
    let 변수2 = req.query.변수2

  2. Path Varriable 방식 : URL 처럼 값을 보내는 방법
    http://localhost:3000//값1/값2
    router.get("/:변수1/:변수2")
    let 변수1 = req.params.변수1
    let 변수2 = req.params.변수2

  3. form에 input에 값을 담아서 post로 보내는 방법
    let 변수1 = req.body.변수1
    let 변수2 = req.body.변수2

    form(method="POST")
      input(name="변수1")
      input(name="변수2")
*/
router.post("/", function (req, res) {
  // input으로 넘어온 데이터
  let todo = req.body.todo;
  let to_date = moment().format("YYYY-MM-DD");
  let to_time = moment().format("HH:mm:ss");

  //임의로 우리가 생성한 데이터
  req.body.to_date = to_date;
  req.body.to_time = to_time;

  // 받은 값을 다시 server로 보내주기
  // res.send(todo);

  // json 형태로 client에게 보여주기
  res.json(req.body);
});

module.exports = router;
