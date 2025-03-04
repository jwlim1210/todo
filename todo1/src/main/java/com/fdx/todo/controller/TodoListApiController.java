package com.fdx.todo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fdx.todo.common.services.TodoListService;
import com.fdx.todo.common.vo.TodoListParameter;


import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/todo")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoListApiController {

    private final TodoListService _todoListService;

    public TodoListApiController(TodoListService todoListService) {
        this._todoListService = todoListService;
    }

    @GetMapping("/list")
    public List<TodoListParameter> getMethodName(@RequestParam String due_month) {
        var result = _todoListService.getTodoList(due_month);
        return result;
    }


    @DeleteMapping("/date/del")
    public void deleteAllDay(@RequestParam String due_date) {
        _todoListService.deleteAllDay(due_date);
    }

}
