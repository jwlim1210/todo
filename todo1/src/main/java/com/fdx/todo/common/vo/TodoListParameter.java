package com.fdx.todo.common.vo;


import lombok.Getter;
import lombok.Setter;


@Getter @Setter
public class TodoListParameter {
    private int id;
    private String user_id;
    private String title;
    private String description;
    private String status;
    private String due_date;
    private String created_at;

}
