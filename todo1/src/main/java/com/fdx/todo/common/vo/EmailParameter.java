package com.fdx.todo.common.vo;


import lombok.Getter;
import lombok.Setter;
import java.util.List;


@Getter @Setter
public class EmailParameter {
    private String host;
    private int port;
    private String username;
    private String password;
    private String to;
    private String subject;
    private List<String> text;
}
