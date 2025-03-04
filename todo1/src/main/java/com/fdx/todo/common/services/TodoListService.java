package com.fdx.todo.common.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fdx.todo.common.vo.TodoListParameter;
import com.fdx.todo.mapper.TodoListMapper;

@Service
public class TodoListService {
    private final TodoListMapper _todoListMapper;

    public TodoListService(TodoListMapper todoListMapper) {
        this._todoListMapper = todoListMapper;
    }

    public List<TodoListParameter> getTodoList(String due_month) {
        return _todoListMapper.getTodoList(due_month);
    }

   public void deleteAllDay(String due_date) {
     _todoListMapper.deleteAllDay(due_date);
   }

}
