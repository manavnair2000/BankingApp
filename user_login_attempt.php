<?php
    session_start();
    include ("./db.php");
    try {
        if(isset($_POST['bank_submit'],$_POST['acc_no'],$_POST['acc_password'])|| isset($_POST['user_submit'],$_POST['acc_no'],$_POST['acc_password'])){
            $acc = $_POST['acc_no'];
            $password = $_POST['acc_password'];
            $stmt = $conn->prepare('SELECT * FROM bank.users WHERE AccNO = ? AND Password = ?');
            $stmt->bind_param('ds', $acc,$password);
            $stmt->execute();
            $result = $stmt->get_result();
            if(!$row = $result->fetch_assoc())
            {
                echo "<script> alert('Your Username or Password is Incorrect !!! Please Signup'); window.open('register.html','_self')</script>";
            }
            else {
                $_SESSION['acc_no'] = $row['AccNO'];
                $_SESSION['username'] = $row['Name'];
                if($row['Status'] == 'banker' && isset($_POST['bank_submit'])){
                    $_SESSION['user_status']='banker';
                    header("Location: banker.php");
                }
                elseif ($row['Status'] == 'user' && isset($_POST['user_submit'])){
                    $_SESSION['user_status']='user';
                    header("Location: user.php");
                } 
                else{
                    echo "<script> alert('Your have selected the incorrect login option'); window.location.href='index.php';</script>";
                }
            }
        }
        else{
            echo "<script> alert('Login Error occured!'); window.location.href='index.php';</script>";
        }
    } catch (Exception $e) {
        echo "<script> window.alert('Unable to process request :".$e->getMessage()."'); window.location.href='index.php'; </script>";
    }
?>