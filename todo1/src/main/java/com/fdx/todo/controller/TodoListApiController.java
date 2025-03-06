package com.fdx.todo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fdx.todo.common.services.TodoListService;
import com.fdx.todo.common.vo.TodoListParameter;


import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/api/todo")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoListApiController {

    private final TodoListService _todoListService;

    public TodoListApiController(TodoListService todoListService) {
        this._todoListService = todoListService;
    }

    @GetMapping("/list")
    public List<TodoListParameter> getTodoList(@RequestParam String parameter) {
        var result = _todoListService.getTodoList(parameter);
        return result;
    }



    @PostMapping("/add")
    public void insertTodo(@RequestBody TodoListParameter parameter) {
        _todoListService.insertTodo(parameter);
    }

   @PutMapping("/update")
    public void updateTodo(@RequestBody TodoListParameter parameter) {
        _todoListService.updateTodo(parameter);
    }

    @PutMapping("/update/status")
    public void updateStatusTodo(@RequestBody TodoListParameter parameter) {
        _todoListService.updateStatusTodo(parameter);
    }

    @DeleteMapping("/date/del")
    public void deleteAllDay(@RequestParam String parameter) {
        _todoListService.deleteAllDay(parameter);
    }

    @GetMapping("/scheduled")
    public String triggerScheduledTask() {
        _todoListService.updateStatus();
        return "스케줄 작업이 트리거되었습니다!";
    }

}
