drop database if exists todo;

create database todo;
use todo;

 create table task(
    id serial int primary key,
    description varchar(255) not null,
 );
 
insert into task(description) values('Online Shopping');
insert into task(description) values('Go to the gym');
insert into task(description) values('Go to the bank');
insert into task(description) values('Go to the doctor');
insert into task(description) values('Go to the dentist');
insert into task(description) values('Go to the hairdresser');
insert into task(description) values('Go to the supermarket');
insert into task(description) values('Go to the post office');