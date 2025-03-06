// api.js
import { message } from 'antd';
import axios from 'axios';

const BASE_URL = 'http://localhost:18080/api';

export const fetchTodos = async (selectedDate) => {
    try {
        const response = await axios.get(`${BASE_URL}/todo/list?parameter=${selectedDate}`);
        return response.data;
    } catch (error) {
        console.error("할 일 목록을 가져오는 중 오류 발생:", error);
        throw error;
    }
};

export const addTodo = async (title, dueDate) => {
    try {
        const response = await axios.post(`${BASE_URL}/todo/add`, { title, due_date: dueDate });
        message.success(response.data);  
        return response.data;
    } catch (error) {
        console.error("메일 보내기 오류 발생:", error);
        message.error("메일 전송 실패"); // 실패 메시지
    }
};


export const sendMail = async (mailId, mailPassword, todosList) => {
    try {
        const response = await axios.post(`${BASE_URL}/email/send`, {
            host: "smtp.naver.com",
            port: 587,
            username: mailId,
            password: mailPassword,
            subject: "To-Do List Total History",
            text: todosList
        })
        // API 응답 메시지를 받아서 표시
        if (response.data.includes('오류')) {
            message.error(response.data);  
        } else {
            message.success(response.data);  
        }
    } catch (error) {
        console.error("메일 보내기 오류 발생:", error);
        message.error("메일 전송 실패"); 
    }
};
export const updateTodo = async (id, title) => {
    try {
        const response = await axios.put(`${BASE_URL}/todo/update`, { id, title });
        message.success(response.data);  
        return response.data;
    } catch (error) {
        console.error("할 일 수정 중 오류 발생:", error);
        throw error;
    }
};



export const deleteTodo = async (id) => {
    try {
        message.info('상태가 변경 되었습니다. ');
        const response = await axios.delete(`${BASE_URL}/todo/date/del?parameter=${id}`);
        message.success(response.data);  
        return response.data;
    } catch (error) {
        console.error("할 일 삭제 중 오류 발생:", error);
        throw error;
    }
};

export const updateStatus = async (id) => {
    try {
        message.info('상태가 변경 되었습니다. ');
        const response = await axios.put(`${BASE_URL}/todo/update/status`, { id });
        message.success(response.data);  
        return response.data;
    } catch (error) {
        console.error("할 일 상태 수정 중 오류 발생:", error);
        throw error;
    }
};

