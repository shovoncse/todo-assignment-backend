drop database if exists todo;

create database todo;
use todo;

CREATE TABLE task (
    id serial PRIMARY KEY,
    description varchar(255) NOT NULL,
    status boolean NOT NULL DEFAULT false
);
 
insert into task(description) values('Online Shopping');
insert into task(description) values('Go to the gym');