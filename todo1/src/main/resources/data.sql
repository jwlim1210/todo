INSERT INTO tasks (title, status, due_month, due_date) 
VALUES 
    ( 'MySQL 공부하기', '0', '2025-03', '2025-03-01'),
   ( 'Spring Boot 프로젝트 시작','0', '2025-03', '2025-03-05'),
    ( 'React 학습', '0', '2025-03','2025-03-10'),
    ( '운동하기', '0', '2025-02','2025-02-25'),
    ( 'Spring Boot 프로젝트 시작','0', '2025-03', '2025-03-05'),
    ( 'React 학습','0', '2025-03','2025-03-10'),
    ( '운동하기', '0', '2025-02','2025-02-25');

DELETE FROM tasks;

-- 스케줄러 테스트용 / 현재 날짜를 기준으로 
INSERT INTO tasks (title, status, due_month, due_date) 
VALUES 
    ( 'MySQL 공부하기', '0', '2025-03', '2025-03-07');                        