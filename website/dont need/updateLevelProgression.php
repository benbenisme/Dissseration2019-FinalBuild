<?php

// retrieve data from request
// if post is username,level
$in = file_get_contents('php://input');
$input = json_decode($in);
$username = $input->user;
$level = $input->level;

// read each line of the password file to the $data array
$data = file(dw);

// check each password in the file
foreach($data as $line) {
	$lineData = explode(',', $line);
    if($lineData[0] == $username) {
        $lineData[1] = $level;
    }
}

$newData = implode(",", $data);
file_put_contents('./levelProgressionLog.txt', $newData);
	
?>