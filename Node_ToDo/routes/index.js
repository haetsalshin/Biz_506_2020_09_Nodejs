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

  // ... : 전개연산자, spread op
  // req.body에 저장된 json데이터를
  //    {todo:"데이터", to_date:"날짜","to_time":"시간"}
  // 이 데이터를 통째로 구조까지 똑같이 todo_data로 복제하라
  let todo_data = { ...req.body };

  console.log(todo_data);

  // 받은 값을 다시 server로 보내주기
  // res.send(todo);

  // json 형태로 client에게 보여주기
  //res.json(req.body);
  // 받아온 데이터를(req.body)를 todo_data로 바꿔서
  // index로 보내라

  // JSON.strinify(jsonObject) : jsonObject(JSON객체) 데이터를
  //    네트워크를통해서 전송하기 위하여 문자열로 변환시키기
  //    string
  res.render("index", { todo_data: JSON.stringify(todo_data) });
});
// get("/insert") : 입력을 받기 위해서
// 사용자(Client)에게 입력 form을 보여주는 용도의 URL
router.get("/insert", function (req, res) {
  res.render("write");
});

// post("/insert") : form에서 입력받은 내용을 서버로 전송했을 때
//    데이터를 수신하여 처리할 용도의 URL
// write.pug의 form에 action을 지정하지 않아도 된다.
router.post("/insert", function (req, res) {
  // 데이터 저장 하는 등의 코드
  res.redirect("/");
});

router.get("/update", function (req, res) {
  res.render("write");
});

router.post("/update", function (req, res) {
  // 데이터를 수정하는 등의 코드
  res.redirect("/");
});

module.exports = router;
