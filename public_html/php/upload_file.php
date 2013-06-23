<?php
if ($_FILES["file"]["error"] > 0)
  {
    echo "Error: " . $_FILES["file"]["error"] . "<br />";
  } else {
    echo "Upload: " . $_FILES["file"]["name"] . "<br />";
    echo "Type: " . $_FILES["file"]["type"] . "<br />";
    echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
    echo "Stored in: " . $_FILES["file"]["tmp_name"];

if (file_exists($_FILES["file"]["name"]))
      {
      echo $_FILES["file"]["name"] . " already exists. ";
      }
    else
      {
      //move_uploaded_file($_FILES["file"]["tmp_name"],$_FILES["file"]["name"]);
      // Where the file is going to be placed 
      $target_path = "/var/www/touch/web/export/";

      /* Add the original filename to our target path.  
       Result is "uploads/filename.extension" */
      $target_path = $target_path . basename( $_FILES['file']['name']);
      echo "Stored in: " . $_FILES["file"]["name"];

        if(move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {
        echo "The file ".  basename( $_FILES['file']['name']). 
        " has been uploaded";
        } else{
            echo "target=".$target_path . "<br/>";
            echo "There was an error uploading the file, please try again!";
        }


      }
  }
?>