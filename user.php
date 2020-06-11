<?php
    session_start();
    include ("./db.php");
    $user =[];
    try {
        if(isset($_SESSION['acc_no'],$_SESSION['username'])){
            $acc = $_SESSION['acc_no'];
            $stmt = $conn->prepare('SELECT * FROM bank.users WHERE AccNO = ? ');
            $stmt->bind_param('d', $acc);
            $stmt->execute();
            $result = $stmt->get_result();
            if($row = $result->fetch_assoc()){
                $user_detail = array('name' => $row['Name'],'acc_no'=>$row['AccNO']);
                $stmt = $conn->prepare('SELECT * FROM bank.accounts WHERE AccNO = ? ORDER BY TransactionTime DESC');
                $stmt->bind_param('d', $acc);
                $stmt->execute();
                $result = $stmt->get_result();
                if($rows = $result->fetch_all(MYSQLI_ASSOC)){
                    $trans =[];
                    foreach($rows as $row){
                        array_push($trans,array(
                            'time' => $row['TransactionTime'],
                            'balance' => $row['remBal'],
                            'amount' => $row['Amount'],
                            'status' => $row['Status']
                        ));
                    }
                    $user = array("name" => $user_detail['name'],"acc_no" => $user_detail['acc_no'],"accounts" => $trans);
                }
                else{
                    $user = array("name" => $user_detail['name'],"acc_no" => $user_detail['acc_no'],"accounts" => "No Transactions");
                }
            }
            else {
                echo "<script> alert('User Not Found! Please Signup'); window.open('register.html','_self')</script>";
                exit();
            }
        }
        else{
            echo "<script> alert('Please Login to View Details!'); window.open('index.php','_self')</script>";
            exit();
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
                <div id="user-display" class="white col s12 l12">
                    <user-display-header></user-display-header>
                    <ul class="tabs tabs-icon tabs-fixed-width tab-demo z-depth-1">
                        <li class="tab"><a class="active" href="#withdraw_deposit"> <!--i class="material-icons left pink-text">account_circle</i--> Transaction</a></li>
                        <li class="tab"><a href="#transaction_history"> <!--i class="material-icons left pink-text">account_balance</i-->Account Statement</a></li>
                    </ul>
                    <form id="withdraw_deposit" class="col s12" method="post">
                        <center>
                            <p v-if="user.accounts == 'No Transactions'" class="blact-text flow-text"> Remaining Balance: Rs. 0 </p>
                            <p class="blact-text flow-text" v-else> Remaining Balance: Rs. {{users.accounts[0].balance}} </p>
                            <div class="row">
                                <div class="input-field col s11">
                                    <i class="material-icons prefix pink-text">account_balance</i>
                                    <input id="money" ref="amount" name="acc_no" type="number" min="1" class="validate">
                                    <label for="money">Enter Amount</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s10 l10 push-l1 push-s1">
                                    <button v-on:click="withdraw($event)" type="submit" form="withdraw_deposit" name="withdraw" id="withdraw_button" class="btn waves-effect waves-light red accent-2"><i class="material-icons left white-text">arrow_downward</i>Withdraw</button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s10 l10 push-l1 push-s1">
                                    <button v-on:click="deposit($event)" type="submit" form="withdraw_deposit" name="deposit" id="deposit_button" class="btn waves-effect waves-light light-green accent-4"><i class="material-icons left white-text">arrow_upward</i>Deposit</button>
                                </div>
                            </div>
                        </center>
                    </form>  
                    <div class="container">
                        <div class="row">
                            <div id="transaction_history" class="container col s12 l12">
                                <br>
                                <transaction-history> </transaction_history> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </center>
        </div>
    </header>
    

    </div>
    <script>
        var user = <?php echo json_encode($user)?>;
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="./js/user.js"></script>
   <script>

    $(document).ready(function () {
        $('.tabs').tabs();
        
    });
   </script>
</body>
</html>