drop database if exists hotelapp;
create database hotelapp;
use hotelapp;
create table hotel (id int primary key auto_increment, address varchar(1000),
categories varchar(1000),city varchar(500),country varchar(20),latitude varchar(50),
longitude varchar(50), name varchar(1000),postalcode varchar(20), province varchar(50),
ratings float,review_text varchar(2000),review_title varchar(1000),review_username varchar(100)); 

 LOAD DATA LOCAL INFILE 'C://Users//amar//Downloads//hotels7146782.csv' 
 INTO TABLE hotel FIELDS 
 TERMINATED BY ',' ENCLOSED BY '"' IGNORE 1 ROWS;

 
create table users (id int primary key auto_increment, first_name varchar(50) not null, last_name varchar(50),
email_id varchar(50) not null unique key, password varchar(1000));


insert into users (first_name, last_name, email_id, password) values 
('Kite', 'Danie', 'kite_d@gmail.com','$2y$12$U9VFvF/e4XtvXv8qQn7GmOOlAOnXAb0Al.qTOvbI3Gi0yMyiqaYNW');

insert into users (first_name, last_name, email_id, password) values 
('William', 'John', 'william_j@gmail.com','$2y$12$U9VFvF/e4XtvXv8qQn7GmOOlAOnXAb0Al.qTOvbI3Gi0yMyiqaYNW');


update users set password='$2a$10$eUB5vV/xWXrcR61TqcWRXOCfl37r3fk.UXNXEzx7xTol5inz5xZ.2' where id>0;



create table booking (id int primary key auto_increment, user_id int,foreign key(user_id) references 
users (id), hotel_id int, foreign key(hotel_id) references hotel(id), rooms varchar(10),
selectdate varchar(20));


