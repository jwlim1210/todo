package com.fdx.todo.common.services;

import java.time.LocalDate;
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
        return _todoListMapper.getTodoList(parameter);
    }

    public void insertTodo(TodoListParameter parameter) {
        TodoListParameter todo = new TodoListParameter();
        todo.setTitle(parameter.getTitle());
        todo.setStatus(LocalDate.now().toString().equals(parameter.getDue_date()) ? 1 : 0);
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

    public void updateStatusTodo(TodoListParameter parameter){
        _todoListMapper.updateStatusTodo(parameter);
    }


    // 매일 자정에 실행되는 메서드
   
 // 테스트용 10초마다
    // @Scheduled(cron = "0 */10 * * * *")
    // @Scheduled(cron = "*/10 * * * * *") 
    @Scheduled(cron = "0 */10 * * * *")
    public void updateStatus() {
        int updatedCountToInProgress = _todoListMapper.updateStatusToInProgress();
        int updateCountToInSuccess = _todoListMapper.updateStatusToInSuccess();
        System.out.println("현재 날짜 기준으로 상태 변경 갯수: " + updatedCountToInProgress);
        System.out.println("현재 날짜 기준 이전으로 상태 변경 갯수"+updateCountToInSuccess);
    }

}
