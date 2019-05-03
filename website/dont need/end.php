<?php

// retrieve data from request
$in = file_get_contents('php://input');
$input = json_decode($in);
$password = $input->password;
$part = $input->part;

// read each line of the password file to the $data array
$data = file('./log.txt');
$time = 0;

// check each password in the file
foreach($data as $line) {
	$lineData = explode(',', $line);
    if($lineData[0] == $password) {
        $time = time() - $lineData[1];
    }
}

// update log file
// [password],[timestamp],[event],[eventdetails?]
$fp = fopen("./log.txt", "a");
flock($fp, LOCK_EX);
fwrite($fp, $password . "," . time() . ",end," . $time . "\r\n");
flock($fp, LOCK_UN);
fclose($fp);
 

echo json_encode(array());
	
?>