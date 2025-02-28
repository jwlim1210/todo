// package com.fdx.todo.common.config;

// import javax.sql.DataSource;

// import org.apache.ibatis.session.SqlSessionFactory;
// import org.mybatis.spring.SqlSessionFactoryBean;
// import org.mybatis.spring.SqlSessionTemplate;
// import org.mybatis.spring.annotation.MapperScan;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.context.annotation.Primary;
// import org.springframework.core.io.support.PathMatchingResourcePatternResolver;


// import com.zaxxer.hikari.HikariConfig;
// import com.zaxxer.hikari.HikariDataSource;



// @Configuration
// @MapperScan(basePackages = "com.fdx.todo.mapper")
// public class BaseDatabaseConfig {

//     @Primary
//     @Bean(name = "dataSource")
//     public DataSource dataSource() throws Exception {
//         HikariConfig hikariConfig = new HikariConfig();
//         hikariConfig.setDriverClassName("com.mysql.cj.jdbc.Driver"); // 사용할 DB 드라이버를 설정합니다 (예: MySQL)
//         hikariConfig.setJdbcUrl("jdbc:mysql://localhost:3306/todo"); // 데이터베이스 URL 설정
//         hikariConfig.setUsername("root"); // 데이터베이스 사용자 이름 설정
//         hikariConfig.setPassword("root"); // 데이터베이스 비밀번호 설정

//         return new HikariDataSource(hikariConfig);
//     }

//     @Primary
//     @Bean
//     public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
//         SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
//         sessionFactory.setDataSource(dataSource);
//         PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
//         sessionFactory.setMapperLocations(resolver.getResources("classpath:mapper/*.xml"));
//         return sessionFactory.getObject();
//     }

//     @Primary
//     @Bean
//     public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
//         return new SqlSessionTemplate(sqlSessionFactory);
//     }
// }