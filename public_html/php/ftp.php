<?php
if(empty($_POST['exportfile'])) 
    $filename = "export.txt";
else
    $filename= $_POST['exportfile'];

if (!file_exists("../export/".$filename)){
    echo "-1";
    exit;
}

if(($ftp = ftp_connect("192.168.1.4", 21)) == false)
{
    //echo 'Erreur de connexion...';
    echo "-1";
    exit;
}
     
if(!ftp_login($ftp, "lorenzzaccio", "lorenzo2301"))
{
    //echo 'L\'identification a échoué...';
    echo "-1";
    exit;
}
/*list files     
$liste_fichiers = ftp_nlist($ftp, '.');
 
foreach($liste_fichiers as $fichier)
{
    echo $fichier. '<br/>';
}
*/

ftp_put($ftp, "/var/www/touch/web/export/".$filename, "../export/".$filename, FTP_BINARY);
echo "1";
?>
