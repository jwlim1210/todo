package com.fdx.todo.common.services;

import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fdx.todo.common.vo.TodoListParameter;
import com.fdx.todo.mapper.TodoListMapper;

@Service
@Transactional
public class TodoListService {
    private final TodoListMapper _todoListMapper;

    public TodoListService(TodoListMapper todoListMapper) {

        this._todoListMapper = todoListMapper;
    }

    public List<TodoListParameter> getTodoList(String parameter) {
        if (parameter != null && !parameter.isEmpty()) {  
            parameter = parameter.substring(0, 7);
        }
        System.out.println(parameter);
        return _todoListMapper.getTodoList(parameter);
    }

    public void insertTodo(TodoListParameter parameter) {
        TodoListParameter todo = new TodoListParameter();
        todo.setTitle(parameter.getTitle());
        todo.setStatus(0);
        todo.setDue_month(parameter.getDue_date().substring(0, 7));
        todo.setDue_date(parameter.getDue_date());

        _todoListMapper.insertTodo(todo);
    }

    public void deleteAllDay(String parameter) {
        _todoListMapper.deleteAllDay(parameter);
    }

    public void updateTodo(TodoListParameter parameter) {
        _todoListMapper.updateTodo(parameter);
    }

    // 매일 자정에 실행되는 메서드
   
    @Scheduled(cron = "*/10 * * * * *")  // 테스트용 10초마다
    // @Scheduled(cron = "0 */10 * * * *")
    public void updateStatusToInProgress() {
        int updatedCount = _todoListMapper.updateStatusToInProgress();
        System.out.println("오늘 날짜가 지난 할 일의 상태가 변경된 갯수: " + updatedCount);
    }

}
