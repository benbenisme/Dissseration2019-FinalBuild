<?php

// retrieve data from request
// if post is username,level
$in = file_get_contents('php://input');
$input = json_decode($in);
$username = $input->user;

// read each line of the password file to the $data array
$data = file('./levelProgressionLog.txt');
// set to false by default
$exists = FALSE;

// check each password in the file
foreach($data as $line) {
	$lineData = explode(',', $line);
    if($lineData[0] == $username) {
        $exists = TRUE;
        break;
    }
}

echo $exists;
	
?>