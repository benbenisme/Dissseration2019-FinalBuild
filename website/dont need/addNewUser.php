<?php

// retrieve data from request
// if post is username,level
$in = file_get_contents('php://input');
$input = json_decode($in);
$username = $input->user;
$newUser = $username + ",0\r\n";
// add new user, use append flag else overwrite
file_put_contents('./levelProgressionLog.txt', $newUser, FILE_APPEND);
	
?>