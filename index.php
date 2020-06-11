<?php
session_start();
 try {
        if(isset($_SESSION['acc_no'],$_SESSION['username'],$_SESSION['user_status'])){
            if($_SESSION['user_status']=='banker')
            {
                header("Location: banker.php");
                exit();
            }
            elseif($_SESSION['user_status']=='user'){
                header("Location: user.php");
                exit();
            }
        }
    } catch (Exception $e) {
            echo "<script> window.alert('Unable to process request :".$e->getMessage()."'); window.location.href='index.php'; </script>";
            exit();
    }
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Banking Application</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="css/styles.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
    <script src="https://cdn.jsdelivr.net/npm/promise-polyfill"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
</head>
<body>
    <div id="root">
    <header>
        <nav-bar></nav-bar>
        <mobile-menu></mobile-menu>
        <div class="container">
            <center>
                <div class="row">
                    <div id="form" class="white col s12 push-l3 l6">
                        <form-header></form-header>
                        <ul class="tabs tabs-icon tabs-fixed-width tab-demo z-depth-1">
                            <li class="tab"><a class="active" href="#user_login"> <!--i class="material-icons left pink-text">account_circle</i--> User Login</a></li>
                            <li class="tab"><a href="#bank_login"> <!--i class="material-icons left pink-text">account_balance</i-->Banker's Login</a></li>
                        </ul>
                        <user-form></user-form>
                        <banker-form></banker-form>
                    </div>
                </div>
            </center>
        </div>
    </header>
    

    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="./js/index.js"></script>
   <script>
    $(document).ready(function () {
        $('.tabs').tabs();
});
   </script>
</body>
</html>