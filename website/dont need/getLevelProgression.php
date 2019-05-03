<?php
 // read each line of the password file to the $data array
$username = $_GET["user"];
$data = file('./levelProgressions.txt');
$levelProgression = 0;

// check each password in the file
// username,levelProgression
foreach ($data as $line) {
    $lineData = explode(',', $line);
    if ($lineData[0] == $username) {
        $levelProgression = $lineData[1];
        break;
    }
}

echo json_encode(array('levelProgression' =>$levelProgression));

?>