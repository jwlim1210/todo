## 1. 앱 설명
이 앱은 **To-Do 관리 및 캘린더 앱**으로, 사용자가 할 일 목록을 관리하고, 월별 일정 및 진행 상태를 확인할 수 있습니다. **TodoHistory**와 **Calendar** 페이지로 구성되어 있습니다. 추가 기능으로는 네이버 메일 전송 및 현재 날짜 기준으로 상태값 변경 스케줄러를 사용햇습니다.

## Calendar 페이지 설명
**월별 데이터 표시**: 캘린더에서 월별로 할 일의 상태(대기, 진행중, 완료)를 카운팅하여 일별로 표시합니다.
**날짜 선택 시 할 일 표시**: 캘린더에서 날짜를 선택하면 오른쪽 Todo Page의 리스트가 활성화되어 해당 날짜의 할 일들이 표시됩니다.
**today 버튼**: 캘린더에서 오늘 날짜를 선택하는 기능을 제공합니다.
**리스트 선택 및 수정**: 리스트의 항목을 선택하면 입력창에 해당 텍스트가 활성화되며, 수정 버튼으로 변경됩니다. 선택되지 않으면 추가 버튼이 활성화됩니다.
**상태 변경**: 리스트에서 항목을 선택하면 상태 변경 버튼이 활성화되어 상태를 변경할 수 있습니다. (진행중 <-> 대기)
**버튼 비활성화**: 
**추가 및 삭제 버튼**은 현재 날짜가 아닐 경우 비활성화됩니다.
**수정 버튼**은 리스트 항목을 선택했을 때 활성화되고, 추가 버튼으로 변경됩니다.

## TodoHistory 페이지 설명
**월별 일정 조회**: 월별로 전체 할 일을 리스트 형식으로 보여주며, 프론트엔드에서 전체, 진행중, 대기, 완료 상태로 필터링하여 볼 수 있습니다.
**이메일 전송 기능**: 설정 아이콘에서 네이버 메일 및 패스워드를 입력하고 메일 보내기 버튼을 누르면 전체 해당 월의 리스트 값들을 자신의 네이버 이메일을 통해 전송 받을 수 있습니다.

## 2. 소스 빌드 및 실행 방법
**기본 설치 프로그램 및 세팅**
1. VSCode 설치
2. NodeJS 설치
3. mySQL 서버 설치
4. 메일 전송을 위한 네이버 메일 계정의 POP3/SMTP 설정 '사용'으로 변경

***프론트엔드***
1. 프로젝트 폴더 이동 : cd src/main/fronted
2. 의존성 설치 및 npm을 사용에 필요한 패키지 설치(윈도우 프롬프트 창) : npm install , npm install react-router-dom, npm install axios
3. 프로젝트 실행(윈도우 프롬프트 창) : npm start

***백엔드***
1. mySQL 서버 실행
2. 스프링 부트 todo1 실행*
3. application.properties의 sql 세팅 갑 변경
4. 프로젝트의 schema.sql, data.sql의 테이블 실행 

## 3. 주력으로 사용한 컴포넌트 및 라이브러리에 대한 설명 및 사용 이유 기입
***프론트엔드***
1. Ant Design : 클러쉬 과제 요구 사항에 맞춰 사용
2. TodoView : 선택한 날짜의 할 일 목록을 관리하는 컴포넌트.
3. CalendarView : 캘린더에서 날짜를 선택하면 해당 날짜의 할 일이 조회되도록 함.
4. TodoHistory : 월별로 완료된/진행 중인 할 일을 조회하고, 메일로 전송하는 기능을 담당.
5. api : axios를 사용하여 백엔드 API와 데이터를 주고받는 함수들을 포함하고 있음
6. LayoutComponent : 애플리케이션의 전체적인 UI 레이아웃 구성

***백엔드***
1. Lombok  : getter/setter 메서드 작성을 생략할 수 있습니다. `@Getter`, `@Setter` 애노테이션을 통해 자동으로 getter와 setter 메서드를 생성하여 코드의 간결함을 유지할 수 있음
2. MySQL Connector : MySQL 데이터베이스와의 연결을 위해 사용됨
3. MyBatis Spring Boot Starter : SQL 매핑을 쉽게 할 수 있도록 지원하는 라이브러리. SQL 쿼리와 객체 모델을 매핑하는 데 도움을 주며, 데이터베이스와의 연동을 빠르게 설정할 수 있음
4. Spring Boot Starter Mail : 이메일을 전송하는 기능을 제공하는 라이브러리. 네이버 메일 전송을 위해 사용됨.
5. Angus Mail API :Java Mail API 구현체로, 메일 전송을 위한 라이브러리. Spring Boot와 통합되어 이메일 발송 기능을 제공됨
6. SpringDoc OpenAPI Starter WebMVC UI : Swagger UI를 통해 API 문서를 자동으로 생성하고 제공. 이를 통해 API 명세를 작성하기 위해 사용됨

## 4. API 명세서 작성
1. swagger로 대체 -> URL : http://localhost:18080/swagger-ui/index.html#/

## 5. 추가된 기능 설명
***프론트엔드***
1. 네이버 메일 전송 기능 추가 : 네이버 아이디, 비밀번호 입력 후 월 별 전체 일정 메일 보내기
2. To-Do 통계 화면 개발 : To-Do 일정의 월 별 전체 이력을 필터링하여 볼 수 있음

***백엔드***
1. 스케줄러 기능 추가 : 매일 오전 9시에 실행 되며, 현재 날짜 기준 으로 상태가 '대기' 일시 '진행중' 상태로 변경, 현재 날짜 이전으로 상태가 '진행중'인 것은 '완료'상태로 변경
2. SMTP 메일 전송 API 추가 : SMTP 서버를 사용하여 이메일 전송

## 6. 백엔드 테스트 케이스
## vscode의 RestClient 확장팩을 사용하여 테스트 진행

 ## 기능: 할일 조회 
| 항목             | 내용                                                |
|------------------|-----------------------------------------------------|
| **설명 (Description)** | 특정 날짜에 해당하는 할일 목록을 조회한다.      |
| **입력값 (Test Input)** | `GET http://localhost:18080/api/todo/list?parameter=` |
| **테스트 절차 (Test Steps)** | 1.data.sql에서 데이터를 insert한다.(due_date=2025-03-05 필수) <br> 2. `GET` 요청으로 해당 날짜의 할일 목록 조회<br> 3. 응답으로 받은 목록이 올바르게 표시되는지 확인 |
| **예상 결과 (Expected Result)** | 응답으로 해당 날짜의 할일 목록이 반환된다. |
| **실제 결과 (Actual Result)** |  할일 목록 조회 완료 |
| **테스트 상태 (Status)** | Pass |

---

## 기능: 할일 삭제 
| 항목             | 내용                                                |
|------------------|-----------------------------------------------------|
| **설명 (Description)** | 특정 날짜에 할일을 삭제한다.                        |
| **입력값 (Test Input)** | `DELETE http://localhost:18080/api/todo/date/del?due_date=2025-03-05` |
| **테스트 절차 (Test Steps)** | 1. `DELETE` 요청으로 특정 날짜의 할일 삭제 <br> 2. 삭제가 정상적으로 처리되었는지 확인 |
| **예상 결과 (Expected Result)** | 해당 날짜의 할일이 정상적으로 삭제된다. |
| **실제 결과 (Actual Result)** | 할일 삭제 완료 |
| **테스트 상태 (Status)** | Pass |

---

## 기능: 할일 추가 

| 항목             | 내용                                                |
|------------------|-----------------------------------------------------|
| **설명 (Description)** | 새로운 할일을 추가한다.                             |
| **입력값 (Test Input)** | `{ "title": "회의 준비", "status": "", "due_month": "", "due_date": "2025-03-15" }` |
| **테스트 절차 (Test Steps)** | 1. `POST` 요청으로 특정 날짜의 할일 추가 <br> 2. 추가가 정상적으로 처리되었는지 확인|
| **예상 결과 (Expected Result)** | 할일이 정상적으로 등록된다. |
| **실제 결과 (Actual Result)** | 할일 등록 완료 |
| **테스트 상태 (Status)** | Pass |

---

## 기능: 할일 수정 

| 항목             | 내용                                                |
|------------------|-----------------------------------------------------|
| **설명 (Description)** | 기존 할일의 내용을 수정한다.                      |
| **입력값 (Test Input)** | `{ "id": 1, "title": "React 학습" }` |
| **테스트 절차 (Test Steps)** | 1. `UPDATE` 요청으로 특정 id의 할일 수정 <br> 2. 수정이 정상적으로 처리되었는지 확인|
| **예상 결과 (Expected Result)** | 해당 할일의 제목이 수정된다. |
| **실제 결과 (Actual Result)** | 할일 제목 수정 완료 |
| **테스트 상태 (Status)** | Pass |

---

## 기능: 상태 수정 

| 항목             | 내용                                                |
|------------------|-----------------------------------------------------|
| **설명 (Description)** | 할일의 상태를 수정한다.                            |
| **입력값 (Test Input)** | `{ "id": 1 }` |
| **테스트 절차 (Test Steps)** | 1. `UPDATE` 요청으로 상태를 변경 시킬 `id`를 입력<br> 2. 상태가 정상적으로 변경되었는지 확인 |
| **예상 결과 (Expected Result)** | 해당 할일의 상태가 변경된다. |
| **실제 결과 (Actual Result)** |  할일 상태 변경 완료 |
| **테스트 상태 (Status)** | Pass |

---

## 기능: 스케줄 강제 실행 

| 항목             | 내용                                                |
|------------------|-----------------------------------------------------|
| **설명 (Description)** | 스케줄을 강제로 실행하여 할일을 처리한다.             |
| **입력값 (Test Input)** | `GET http://localhost:18080/api/todo/scheduled` |
| **테스트 절차 (Test Steps)** | 1.data.sql에서 오늘 날짜 기준의 상태가 0인 값을 insert한다. <br> 2. `GET` 요청으로 스케줄 강제 실행<br> 3. 실행이 완료되었는지 확인 |
| **예상 결과 (Expected Result)** | 스케줄 강제 실행이 되며 오늘 날짜를 기준으로 대기 중인 상태가 진행으로 변경 된다|
| **실제 결과 (Actual Result)** | 스케줄 실행 완료 |
| **테스트 상태 (Status)** | Pass |

---

## 기능: 이메일 전송 

| 항목             | 내용                                                |
|------------------|-----------------------------------------------------|
| **기능 (Feature)** | 이메일 전송                                          |
| **설명 (Description)** | 이메일을 전송한다.                                  |
| **입력값 (Test Input)** | `{ "host": "smtp.naver.com", "port": 587, "username": userEmail, "password": userPassword, "to": userEmail, "subject": "Test Email", "text": ["This is a test email body"] }` |
| **테스트 절차 (Test Steps)** | 1. 네이버 메일 SMTP 설정 허용 <br> 2. 네이버 SMTP 정보 입력 및 이메일 정보 입력<br> 2. `POST` 요청으로 이메일 전송 <br> 3. 이메일 전송 확인 |
| **예상 결과 (Expected Result)** | 이메일이 정상적으로 전송된다. |
| **실제 결과 (Actual Result)** | 이메일 전송 완료 |
| **테스트 상태 (Status)** | Pass |
