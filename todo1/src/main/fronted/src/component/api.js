// api.js

import axios from 'axios';

const BASE_URL = 'http://localhost:18080/api/todo';

export const fetchTodos = async (selectedDate) => {
    try {
        const response = await axios.get(`${BASE_URL}/list?parameter=${selectedDate}`);
        return response.data;
    } catch (error) {
        console.error("할 일 목록을 가져오는 중 오류 발생:", error);
        throw error;
    }
};

export const addTodo = async (title, dueDate) => {
    try {
        const response = await axios.post(`${BASE_URL}/add`, { title, due_date: dueDate });
        return response.data;
    } catch (error) {
        console.error("할 일 추가 중 오류 발생:", error);
        throw error;
    }
};

export const updateTodo = async (id, title) => {
    try {
        const response = await axios.put(`${BASE_URL}/update`, { id, title });
        return response.data;
    } catch (error) {
        console.error("할 일 수정 중 오류 발생:", error);
        throw error;
    }
};

export const deleteTodo = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/date/del?parameter=${id}`);
        return response.data;
    } catch (error) {
        console.error("할 일 삭제 중 오류 발생:", error);
        throw error;
    }
};
