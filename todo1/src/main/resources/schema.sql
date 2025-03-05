USE todo;

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status INT DEFAULT 0,  -- 상태를 0, 1, 2로 처리
    due_month VARCHAR(255) NOT NULL,  -- 추가된 월 컬럼
    due_date VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
