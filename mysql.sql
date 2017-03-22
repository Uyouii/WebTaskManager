create database taskManager;

use taskManager;

create table tasks (
	taskName 		varchar(64),
	taskDDL	 		varchar(64),
	taskTime 		varchar(64),
	taskDescription varchar(255),
	primary key(taskName,taskDDL)	
);