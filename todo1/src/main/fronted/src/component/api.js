import { message } from 'antd';
import axios from 'axios';

const BASE_URL = 'http://localhost:18080/api';

// 할 일 월별 조회 API
export const fetchTodos = async (selectedDate) => {
    try {
        const response = await axios.get(`${BASE_URL}/todo/list?parameter=${selectedDate}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// 할 일 추가 API
export const addTodo = async (title, dueDate) => {
    try {
        const response = await axios.post(`${BASE_URL}/todo/add`, { title, due_date: dueDate });
        message.success("할 일이 성공적으로 추가 되었습니다!");  
        return response.data;
    } catch (error) {
        console.error(error);
        message.error("할 일 추가 중 오류 발생" + error); 
    }
};


// 메일 보내기 API
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
        if (response.data.includes('오류')) {
            message.error(response.data);  
        } else {
            message.success(response.data);  
        }
    } catch (error) {
        console.error(error);
        message.error("메일 전송 중 오류 발생"+ error); 
    }
};


// 할 일 삭제 API
export const deleteTodo = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/todo/date/del?parameter=${id}`);
        message.success("할 일이 성공적으로 삭제 되었습니다!");  
        return response.data;
    } catch (error) {
        console.error(error);
        message.error("할 일 삭제 중 오류 발생"+error); 
    }
};


// 할 일 내용 수정 API
export const updateTodo = async (id, title) => {
    try {
        const response = await axios.put(`${BASE_URL}/todo/update`, { id, title });
        message.success("할 일이 성공적으로 수정이 되었습니다!");  
        return response.data;
    } catch (error) {
        console.error(error);
        message.error("할 일 수정 중 오류 발생"+error); 
    }
};


// 상태 업데이트 API
export const updateStatus = async (id) => {
    try {
        const response = await axios.put(`${BASE_URL}/todo/update/status`, { id });
        message.success('상태가 성공적으로 변경 되었습니다! ');  
        return response.data;
    } catch (error) {
        console.error(error);
        message.error("할 일 상태 변경 중 오류 발생" + error); 
    }
};

