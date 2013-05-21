<?php
/*$filename="../export.txt";*/
$filename=$_POST['filepath'];
echo $filename;
$file = fopen($filename, "r");
$arrow = array();
$arrec = array();
$lines = array();
$i=0;

while (!feof($file)) {
    $line=fgets($file);
    //process line however you like
    $line=trim($line);
    //add to array
    $lines.=";".$line;
    
    /*
    //echo fgets($file);
    $arrow = fgets($file);
    //array_push($arrec, $arrow);
    //$arrec[$i]=$arrow;
    $i=$i+1;
    */
}
fclose($file);
var_dump(($lines));
//echo "succes";

?>