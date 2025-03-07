USE todo;

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY, -- id
    title VARCHAR(255) NOT NULL,  -- 일정 내용
     status INT DEFAULT 0,  -- 상태 (대기 : 0, 진행중 : 1, 완료 : 2)
    due_month VARCHAR(255) NOT NULL,  -- 월 (YYYY-MM)
    due_date VARCHAR(255) NOT NULL,   -- 일자(YYYY-MM-DD)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 생성 일자
);
