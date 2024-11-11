CREATE TABLE user
(
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT COMMENT 'Id Εγγραφής',
    username VARCHAR(50) COMMENT 'Username',
    password VARCHAR(20) COMMENT 'Password',
    first_name VARCHAR(50) COMMENT 'First Name',
    last_name VARCHAR(50) COMMENT 'Last Name',
    email VARCHAR(30) COMMENT 'Email',
    phone VARCHAR(30) COMMENT 'Phone'
) COMMENT 'User';