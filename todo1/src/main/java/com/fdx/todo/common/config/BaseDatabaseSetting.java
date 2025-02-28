// package com.fdx.todo.common.config;
// import org.springframework.boot.context.properties.ConfigurationProperties;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.context.annotation.Profile;
// import org.springframework.context.annotation.PropertySource;
// import org.springframework.stereotype.Component;

// import com.fdx.todo.common.enums.DatabaseDriver;

// import lombok.Getter;
// import lombok.Setter;

// @ConfigurationProperties(prefix = "spring.datasource")
// @Component
// @Getter	@Setter
// public class BaseDatabaseSetting {

//     private String url;
//     private String driverClassName;
//     private String username;
//     private String password;
//     private DatabaseDriver type;
    
   
	
// 	@Configuration
//     @Profile("local")
//     @PropertySource("classpath:application-local.db.properties")
//     static class LocalConfig {
//     }
// }
