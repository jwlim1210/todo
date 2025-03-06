package com.fdx.todo.controller;

import com.fdx.todo.common.vo.EmailParameter;

import io.swagger.v3.oas.annotations.tags.Tag;

import com.fdx.todo.common.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "이메일 API", description = "이메일 전송 관련 API")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public String sendEmail(@RequestBody EmailParameter emailParameter) {
        try {
            emailService.sendEmail(emailParameter);
            return "이메일이 성공적으로 전송되었습니다.";
        } catch (IllegalArgumentException e) {
            return "오류: " + e.getMessage();  // IllegalArgumentException 발생 시 해당 메시지 반환
        } catch (MessagingException e) {
            return "이메일 전송 오류: " + e.getMessage();  // MessagingException 발생 시 해당 메시지 반환
        } catch (Exception e) {
            return "예상치 못한 오류: " + e.getMessage();  // 그 외 다른 예외 처리
        }
    }
}
