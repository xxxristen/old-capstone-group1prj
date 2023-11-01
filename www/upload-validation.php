<?php

/* For info: To trigger file upload file validation in HTML file:
<form action="upload.php" method="post" enctype="multipart/form-data">
  Select image to upload:
  <input type="file" name="fileToUpload" id="fileToUpload">
  <input type="submit" value="Upload Image" name="submit">
</form>*/

// $target_dir = "/img/teas" - specifies the directory where the file is going to be placed
$target_dir = "/img/teas";
// $target_file specifies the path of the file to be uploaded
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
// If error in any of the check, $uploadOk will be assigned to value of 0 in the respective checks
$uploadOk = 1;
// $imageFileType holds the file extension of the file (in lower case)
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
  if($check !== false) {
    echo "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    echo "File is not an image.";
    $uploadOk = 0;
  }
}

// Check if file already exists
if (file_exists($target_file)) {
  echo "Sorry, file already exists.";
  $uploadOk = 0;
}

// Check file size. Current limit set at 300 kb
if ($_FILES["fileToUpload"]["size"] > 300000) {
  echo "Sorry, your file is too large.";
  $uploadOk = 0;
}

// Allow certain file formats - JPG, JPEG and PNG
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
  echo "Sorry, only JPG, JPEG and PNG files are allowed.";
  $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    echo "The file ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " has been uploaded.";
  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}
?>