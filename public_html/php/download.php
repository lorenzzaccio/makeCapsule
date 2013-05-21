<?php
//if(empty($_POST['exportfile']) || empty($_POST['content'])){
if(empty($_POST['tab'])){
	exit;
}
if(empty($_POST['exportfile'])) 
    $filename = "export.txt";
else
    $filename= $_POST['exportfile'];

// Sanitizing the filename:
//$filename1 = "export.txt";
//$filename = preg_replace('/[^a-z0-9\-\_\.]/i','',$_POST['filename']);
//$filename = preg_replace('/[^a-z0-9\-\_\.]/i','',$filename1);

// Outputting headers:
//header("Cache-Control: ");
//header("Content-type: text/plain");
//header('Content-Disposition: attachment; filename="'.$filename.'"');
    
//create new file
$file = '../export/'.$filename;
file_put_contents($file, $arrow[$i]);

    $arrow= $_POST['tab'];
    $nbr_data = sizeof($arrow);
    echo $nbr_data;
    for($i=0;$i<$nbr_data;$i++){
        file_put_contents($file, $arrow[$i], FILE_APPEND);
        file_put_contents($file,"\r\n", FILE_APPEND);
    }
    
    /*for($i=0;$i<$nbr_data;$i++){
        $req1 .= "'".$arrow[$i]."'" ;
        if($i+1>=$nbr_data){
            $req1 .= ')';
        }else{
            $req1 .= ',';
        }
    }*/
//print_r($req1);

//echo $req1;
?> 