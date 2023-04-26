drop database senescyt;
create database  senescyt;

use senescyt;

create table user(
    id int primary key auto_increment,
    user_user varchar(50) not null,
    password_user varchar(255) not null,
    rol_user enum('admin','user') not null
)ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci; 

/* use senescyt;
insert into user VALUES('','admin','12345','admin');
insert into user VALUES('','user','12345','user'); */

/* use senescyt;
select * from user; */