console.log("===============================================");
console.log("JS에서 eq 비교 연산자");
/*
js에서 같은값을 비교할 때 사용하는 연산자가 2가지가 있다.
    동등연산자 : ==
    평등연산자 : ===

*/

let b = 0 == "";
// false 와  false가 같냐? > true
console.log("0 == '' :", b);
b = 0 === "";
// 0과 false가 같냐 > false
console.log(" === '' :", b);
// js에서는 false인 경우가 몇가지 있는데
// 비교연산자, 관계연산자와 연결했을 때 false값을 갖는 친구들
b = "" || null || undefined || NaN || 0 || "없음";
console.log(b);

// 어떤(변수에 저장된) 값을 비교하여 정확히 일치하는지 알고싶을 때는
// 동등이 아닌 평등연산자를 사용하는 것이 정확한 결과를 낼 수 있다
// 문자열 "1"을 숫자형으로 또는 숫자1을 문자열형 "1"로 자동형변환을 하여 비교해버린다.
// 어떤 값을 DB등에서 읽어왔을 때 순수하게 내용으로만 비교하고자 할 때는 필요
// 하지만 정확한 값을 비교하고자 할때는 원하지 않는 결과를 내기도 한다
b = "1" == 1;
console.log(b);
// 문자열과 숫자형이기 때문에 내용에 관게없이 둘은 다르다 > false
// ㅆ) 문자열 "1" 와 숫자 1은 다르다!!!
b = "1" === 1;
console.log(b);

// true, false이냐의 여부만 판단
b = null == undefined;
console.log(b);
// 정확히 자료형까지 일치하는지를 비교한다
b = null === undefined;
console.log(b);

/*
(==) 동등연산자는 값을 자동형변환하거나 하여 내용물이 같은지만 비교하는 연산자
(===) 평등연산자는 먼저 형(type)을 비교하고 다르면 false 같으면 내용물 비교
*/

console.log(0 == false);
console.log(0 === false);

let num = 0;
// And Also
if (num && ++num) {
}

console.log("num && ++ num :", num);
// or Else
if (num || ++num) {
}

console.log("num || ++ num :", num);
