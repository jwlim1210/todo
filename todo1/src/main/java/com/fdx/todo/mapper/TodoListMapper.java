package com.fdx.todo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.fdx.todo.common.vo.TodoListParameter;

@Mapper
public interface TodoListMapper {
    // 캘린더 조회
    List<TodoListParameter> getTodoList(String parameter);


    // 전체 삭제
    void deleteAllDay(String parameter);

    // 캘린더 값 추가
    void insertTodo(TodoListParameter parameter);
    
    // 업데이트
    void updateTodo(TodoListParameter parameter);

    void updateStatusTodo(TodoListParameter parameter);

    int updateStatusToInProgress();
    int updateStatusToInSuccess();
}
