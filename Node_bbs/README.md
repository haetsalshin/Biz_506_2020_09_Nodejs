# nodejs + mongoDB + mongoose 연동 BBS 프로젝트
* mongoDB를 사용하여 BBS 프로젝트 수행

## mongoDB는 NoSQL
* NoSQL : SQL이 아니다 라는 뜻이 아니다. Not Only SQL이라는 뜻으로 SQL뿐만 아니라 SQL을 사용하지 않는 방법으로 대량의 데이터를 CRUD 수행하는데 사용하는 DBMS
* Schema라는 것이 자체가 없어도 되는 환경, Document라는 개념으로 JSON형태의 데이터를 관리한다. 대량의 데이터를 insert할 때 데이터 구조가 정해지지 않았어도 데이터를 취급할 수가 있는 DBMS
* RDBMS : 관계형 데이터 베이스, 데이터를 insert 하기 전에 반드시 DB, TableSpace, Table과 같은 Schema들을 먼저 생성되어 있어야 한다. 만약 원래 구성된 Schema와 다른 형식에 데이터를 저장하려고 하면 데이터 구조를 먼저 변경해야 하기 때문에 유연한 환경애 대처하기가 어렵다.

* BigData : 데이터가 굉장히 크다. 대량의 데이터, 취급이 쉽지 않은 형태의 Data.
* 취급이 쉽지 않다 = RDBMS(SQL을 사용하는)로 관리하기 어려울만큼 매우 많은 데이터가 실시간으로 생성되는 데이터를 말한다. BigData를 취급할 때는 RDMBS보다는 NoSQL 형태의 DBMS를 많이 사용한다.
* mongoDB, 하둡DB을 많이 사용한다.

## Nodejs에서 mongoDB를 연동할 때는 Native방식보다는 Schema를 임의로 생성하여 취급을 한다.
- mongoDB의 Schema를 만들어서 쉽게 연동할 수 있도록 해주는 도구가 mongoose이다.
- mongoose를 사용하여 mongoDB를 마치 RDBMS처럼 취급하여 nodejs와 연동