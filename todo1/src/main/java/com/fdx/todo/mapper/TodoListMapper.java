package com.fdx.todo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.fdx.todo.common.vo.TodoListParameter;

@Mapper
public interface TodoListMapper {
    List<TodoListParameter> getTodoList(String due_date);
}
