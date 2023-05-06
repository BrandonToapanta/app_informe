drop database senescyt;
create database  senescyt;

use senescyt;

create table user(
    id int primary key auto_increment,
    rol_user enum('admin','pasante') not null,
    name_user varchar(80) not null,
    user_user varchar(50) not null,
    password_user varchar(255) not null,
    tutor_user varchar(80) 
)ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci; 

use senescyt;
select * from user;