<?php
session_start();
include ('db.php');
 try {
        function getUserName($acc){
            include ('db.php');
            $stmt = $conn->prepare('SELECT Name FROM bank.users WHERE AccNO = ?');
            $stmt->bind_param('d', $acc);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            return $row['Name'];
        }
        function getUserTransactionDetails($acc){
            include ('db.php');
            $user_detail =[];
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
                    $user = $trans;
                    return $user;
                }
            else{
                return NULL;
            }
        }
        if(isset($_SESSION['acc_no'],$_SESSION['username'],$_SESSION['user_status'])&&$_SESSION['user_status']=='banker' ){
            $stmt = $conn->prepare('SELECT * FROM bank.accounts WHERE TransactionTime IN (SELECT MAX(TransactionTime) FROM bank.accounts GROUP BY AccNO) GROUP BY AccNO');
            $stmt->execute();
            $all_user['user'] = [];
            $result = $stmt->get_result();
            if($rows = $result->fetch_all(MYSQLI_ASSOC)){
                foreach ($rows as $row) {
                    $acc = $row['AccNO'];
                    $name = getUserName($acc);
                    $transaction_detail = getUserTransactionDetails($acc);
                    array_push($all_user['user'], array(
                            "acc_no" => $acc,
                            "name" => $name,
                            "transaction_details" => $transaction_detail
                        )
                    ) ;
                }
            }
            array_multisort(array_column($all_user['user'], 'name'), SORT_ASC, $all_user['user']);
            echo json_encode($all_user);
        }    
        else{
            echo "<script> alert('Please Login as Banker to View Details!'); window.open('index.php','_self')</script>";
            exit();
        }
    } catch (Exception $e) {
        echo "<script> window.alert('Unable to process request :".$e->getMessage()."'); window.location.href='index.php'; </script>";
        exit();
    }
?>