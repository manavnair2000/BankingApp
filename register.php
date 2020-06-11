<?php
session_start();
include './db.php';
if(isset($_POST['user_submit'],$_POST['acc_name'],$_POST['acc_no'],$_POST['acc_password'],$_POST['user_status']))
{
	$acc = $_POST['acc_no'];
	$name = $_POST['acc_name'];
	$password = $_POST['acc_password'];
	$status = $_POST['user_status'];
	try{
		$stmt = $conn->prepare('INSERT INTO bank.users (AccNO,Password,Name,Status) VALUES(?,?,?,?)');
        $stmt->bind_param('dsss', $acc,$password,$name,$status);
        if($stmt->execute()){    
            echo "<script> alert('Account Created Successfully !!Login to continue!!'); window.location.href='index.php'; </script>";
		}
		else{
			echo "<script> alert('Account Was Not Created Successfully !!Please try again!!'); window.location.href='register.html'; </script>";
		}
	}
	catch(Exception $e){
		echo "<script> window.alert('Unable to open account due to :$e->getMessage()') </script>";
	}
}
else{
    echo "<script> alert('Account Details Not Received Correctly!!!'); window.location.href='register.html'; </script>";
}
?>
