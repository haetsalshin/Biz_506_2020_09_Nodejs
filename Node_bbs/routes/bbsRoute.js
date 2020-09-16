var express = require("express");
var router = express.Router();
/**
 * 현재까지 사용 중인 프로그래밍 언어에서 날짜, 시간과 관련하여
 * 수없이 많은 issue들이 있다.
 * JS(node) Date라는 내장 클래스가 있다.
 * 이 내장 클래스도 이슈가 있어서 실제로 DB와 연동하여 사용할 때
 * 문제들을 일으킨다
 * 그래서 내장 Date 클래스가 있음에도 불구하고
 * nodejs에서는 momoent외부 모듈을 거의 표준적으로 사용하여
 * 날짜와 시간을 관리한다
 * Date 클래스를 날짜와 숫자 형태의 문자열로 변환하는 일을 수행하고
 * 날짜와 관련된 여러가지 연산을 수행하는 기능이 내장되어 있다.
 */
const moment = require("moment");
const { Mongoose } = require("mongoose");

// bbsModel에 선언된 Schema를가져와서 bbsVO모델 생성
var bbsVO = require("../models/bbsModel");

// localholst:3000/bbs/list URL 접근했을 떄
router.get("/list", function (req, res) {
  // bbsVO Model을 통해서 데이터를 모두 읽어오고(find(조건없이))
  // find()가 정상적으로 수행되면 .then(function(bbsList){})
  // 값을 함수로 넘기고
  bbsVO.find().then(function (bbsList) {
    // bbsList.pug을 읽ㅇ서 rendering을 수행하도록 설정
    // rendering을 수행할 때 bbsList 파일을 ModelAttribute형식으로 담아서
    // 전송을 한다.
    // 현재버전인 14.x버전에서는 {bbsList}라고 표현하면
    // 실제로 전달되는 방식은 {bbsList: bbsList}
    res.render("bbsList", { bbsList }); // {bbsList:bbsList}
  });
});
// localhost:3000/bbs/write URL 요청
router.get("/write", function (req, res) {
  // bbsWrite.pug파일을rendering하여 요청 전송
  // insert와 update를write.png 파일로 공통으로 사용하기 위해서
  // insert를수행할 때 비어있는 vo를 만들어서 bbsWrite에 전달해줘야 한다.
  let data = new bbsVO();
  res.render("bbsWrite", { bbsVO: data });
});

// 화면에 어떻게 보이는지 보여주는 코드(DB에 전달하는 코드는 아님)
// form에 데이터를 입력하고 전송버튼을 클릭했을 때 호출되는 URL
// form, input에 입력된 데이터를 담아서 보내면 그 데이터를
// 수신하는 함수
router.post("/write", function (req, res) {
  // req.body 객체에 input의 name속성에 설정된 변수이름으로
  // 자동으로 담아서 전송이 된다.

  // let b_title = req.body.b_title;
  // let b_write = req.body.b_write;
  // let b_text = req.body.b_text;

  // req.body 객체에 b_date, b_time, b_write, b_count 변수를 생성하고
  // 각각의 변수에 값을 세팅하라
  // new Date() 객체를 만들어서 년월일, 시분으로 형태를 바꿔준다
  req.body.b_date = moment(new Date()).format("YYYY-MM-DD");
  req.body.b_time = moment(new Date()).format("HH:mm:ss");
  //req.body.b_write = "신햇살";
  req.body.b_count = 0;

  // form에 전송받은 데이터를 통째로 bbsVO(data)객체로 생성하라
  // data에는 form에서 입력하여 전송한 데이터(작성자, 제목, 내용)와
  // 서버에서 임의로 추가한 데이터(날자, 시간, 카운트)를 모두 모아서
  // 하나의 vo객체로 생성을 하고
  // 거기에 DB CRUD와 관련된 함수들을 함께 추가하여 객체 생성을 한다
  let data = new bbsVO(req.body);
  data
    .save() // 방금 생성한 bbsVO(data)에 저장된 데이터를 mongoDB의 table에 insert하라
    .then(function (bbsVO) {
      // insert가 성공하면
      // res.json(bbsVO); // Client에게 다시 데이터를 보여라

      // 완료가 되면 리스트 화면으로 점프
      res.redirect("/bbs/list");
    })
    .catch(function (error) {
      // insert가 실패하면
      console.error(error); // 오류메시지를 콘솔에 보여라
      // 웹화면에 데이터 추가가 잘못되었다는
      // 메시지를 보여주는 코드를 수행해야 한다.
      // 여기서는 아직 생략함..(오류가 없다 가정하고 코드 진행)
    });

  // res.write(b_title);
  // res.write(b_write);
  // res.end(b_text);

  // res.json(req.body);
});

// localhost:3000/bbs/view/id값 URL 요청
// id값 : bbs의 각 라인(item)의 PK값
// PK값을 가지고 tbl_bbs에서 1개의 item값을 추출하여
// detail view에 보여주기
router.get("/view/:id", function (req, res) {
  let id = req.params.id;

  // table의 아이디값이 리스트에서 전달받은 id값과 일치하는 아이템이 있는지
  // 검사하는 코드

  bbsVO
    // pk(_id)값이 id와 일치하는 데이터가 있는지 찾아라
    // 그 데이터가 있으면 그 값을 result에 담아
    // bbsview.pug를 렌더링할때 bbsVO이름으로 전달하여 넣어라
    .findOne({ _id: id })
    .then(function (result) {
      //pk값과 일치하는 item이 있으면 그 결과를 result에 담음
      //res.json(result);
      res.render("bbsView", { bbsVO: result });
    })
    .catch(function (error) {
      console.error(error);
    });

  //res.send(id);
});

/**
 * 데이터를 삭제할 때
 * mongoDB 3.x 이하에서는 remove() 함수를 사용했다
 * 조건문 없이 remove()를 실행하면 테이블의 모든데이터를 삭제해버린다
 * mongoDB 4.x 이상에서는 이러한 문제를 방지하기 위해서
 * deleteOne() deleteMany()라는 함수를만들어 두었다.
 * deleteOne(조건문)은 조건에 일치하는 데이터 중 첫번째 한개만 삭제를 수행
 * deleteMany(조건문) 조건에 일치하는 데이터를 모두 삭제
 */
router.get("/delete/:id", function (req, res) {
  let id = req.params.id;
  bbsVO
    /*
  mongoDB의 item (1개의 데이터를 )삭제하기
  deleteOne(조건문) : 삭제한 후 삭제 되었다는 메시지만 알고 싶을 때
  과
  findOneAndDelete(조건문) : 삭제를 수행한 후 실제 삭제된 데이터를
    다시 확인하고 싶을 때 
  두가지 함수를 사용할 수 있다.
  */
    // .deleteOne({ _id: id })
    .findOneAndDelete({ _id: id })
    .then(function (result) {
      // 일반적인 CRUD 프로젝트에서는
      // 삭제 동작이 완료 되면 list보기로 redirect를 수행한다
      res.redirect("/bbs/list");
    })
    .catch(function (error) {
      console.error(error);
    });
});

// 전달받은 PK값으로 한개의 item을 조회하고
// write form에 보여주고
// 데이터를 입력한 다음 저장을 하면
// post("/update")로 보내서 데이터를 수정하도록 수행
router.get("/update/:id", function (req, res) {
  let id = req.params.id;
  //_id : bbsVO에 담긴 id값
  // 뒤에 id값은 위에서 만든 let id
  // 실제로 웹에서 만든 값
  bbsVO.findOne({ _id: id }).then(function (result) {
    res.render("bbsWrite", { bbsVO: result });
  });
});
/*
    한개의 item을 조회하여 write form으로 보낸 후 데이터를 다시 받았을 때
    req.body에는 id값이 사라진 상태로 전달된다.
    하지만 update를 수행할 때 id값을 URL에 전달하여 보냈기 때문에
    for(method="POST",action="/bbs/update/id값") 형태의 URL이 자동으로 만들어지
    post Method는 params에 id값을받아서 수신하는 결과가 된다.

    params로부터 id를 추출하여 강제로 req.body에 추가를 해준다.
*/
router.post("/update/:id", function (req, res) {
  let id = req.params.id;
  req.body._id = id;

  bbsVO
    .updateOne(
      { _id: id }, // where조건문
      // input box에 입력한 데이터만 변경하도록 수행하는 코드
      // SET에 해당하는방법
      // 주의해야 할 코드
      // $set {req.body}
      // update를 수행하는데 실제로 form에서 전달된 데이터외에
      // 나머지 데이터는모두 삭제해버리는문제가 있다.
      {
        b_title: req.body.b_title,
        b_wirte: req.body.b_write,
        b_text: req.body.b_text,
      }
    )
    .then(function (result) {
      //res.json(result);
      res.redirect("/bbs/list");
    });
});

module.exports = router;
