create database taskManager;

use taskManager;

create table tasks (
	email 		        varchar(64),
	containername	 		varchar(64),
  taskName    varchar(64),
  taskDDL     varchar(64),
	taskTime 		varchar(64),
	taskDescription varchar(1024),
	primary key(email,containername,taskName,taskDDL)
);

create table users (
  username  varchar(64),
  password  varchar(64),
  email     varchar(64),
  PRIMARY KEY (email)
);

create table containers(
  email   varchar(64),
  time    varchar(64),
  containername varchar(64),
  PRIMARY KEY (email,containername)
);