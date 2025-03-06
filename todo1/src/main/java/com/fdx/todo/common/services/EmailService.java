package com.fdx.todo.common.services;

import com.fdx.todo.common.vo.EmailParameter;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.Properties;

@Service
public class EmailService {

    public void sendEmail(EmailParameter emailParameter) throws MessagingException {
        // username과 password가 비어있는지 확인
        if (emailParameter.getUsername() == null || emailParameter.getUsername().isEmpty()) {
            throw new IllegalArgumentException("이메일을 입력해 주세요");
        }
        if (emailParameter.getPassword() == null || emailParameter.getPassword().isEmpty()) {
            throw new IllegalArgumentException("패스워드를 입력해 주세요");
        }
        // JavaMailSender 설정 동적으로 구성
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(emailParameter.getHost());
        mailSender.setPort(emailParameter.getPort());
        mailSender.setUsername(emailParameter.getUsername());
        mailSender.setPassword(emailParameter.getPassword());

        // SMTP 설정
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        // 이메일 본문을 List<String>으로 받은 후 하나의 문자열로 합침
        StringBuilder emailBody = new StringBuilder();
        for (String line : emailParameter.getText()) {
            emailBody.append(line).append("<br>"); // HTML 줄바꿈 추가
        }

        // 이메일 보내기
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(emailParameter.getUsername()); // 발신자 이메일
        helper.setTo(emailParameter.getUsername()); // 수신자 이메일
        helper.setSubject(emailParameter.getSubject()); // 메일 제목
        helper.setText(emailBody.toString(), true); // 메일 내용 (UTF-8 인코딩으로 설정)

        mailSender.send(message); // 메일 전송
    }

}
