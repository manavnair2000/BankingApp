<?php
    session_start();
    include 'db.php';
    try {
        if(isset($_SESSION['acc_no'],$_SESSION['username'])){
            if(isset($_POST['withdraw'],$_POST['amount'])){
                $acc = $_SESSION['acc_no'];
                $stmt = $conn->prepare('SELECT * FROM bank.accounts WHERE AccNO = ? ORDER BY TransactionTime DESC');
                $stmt->bind_param('d', $acc);
                $stmt->execute();
                $result = $stmt->get_result();
                if($row = $result->fetch_assoc()){
                    $bal = $row['remBal'];
                    $amt = $_POST['amount']; 
                    if($amt > $bal){
                        echo "Insufficient Balance!";
                    }
                    else{
                        $stmt = $conn->prepare('INSERT INTO bank.accounts (remBal,Amount,Status,AccNO) VALUES(?,?,?,?)');
                        $status = 'withdraw';
                        $bal -= $amt;
                        $stmt->bind_param('ddsd', $bal,$amt,$status,$acc);
                        if($stmt->execute()){
                            echo "success";
                        }
                        else{
                            echo "failure";
                        }
                    }
                }
            }
            elseif(isset($_POST['deposit'],$_POST['amount'])){
                $acc = $_SESSION['acc_no'];
                $stmt = $conn->prepare('SELECT * FROM bank.accounts WHERE AccNO = ? ORDER BY TransactionTime DESC');
                $stmt->bind_param('d', $acc);
                $stmt->execute();
                $result = $stmt->get_result();
                if($row = $result->fetch_assoc()){
                    $bal = $row['remBal'];
                    $amt = $_POST['amount']; 
                    $stmt = $conn->prepare('INSERT INTO bank.accounts (remBal,Amount,Status,AccNO) VALUES(?,?,?,?)');
                    $status = 'deposit';
                    $bal += $amt;
                    $stmt->bind_param('ddsd', $bal,$amt,$status,$acc);
                    if($stmt->execute()){
                        echo "success";
                    }
                    else{
                        echo "failure";
                    }
                }
                else{
                    $bal = 0;
                    $amt = $_POST['amount']; 
                    $stmt = $conn->prepare('INSERT INTO bank.accounts (remBal,Amount,Status,AccNO) VALUES(?,?,?,?)');
                    $status = 'deposit';
                    $bal += $amt;
                    $stmt->bind_param('ddsd', $bal,$amt,$status,$acc);
                    if($stmt->execute()){
                        echo "success";
                    }
                    else{
                        echo "failure";
                    }
                }
            }
        }
    } catch (Exception $e) {
        echo "<script> window.alert('Unable to process request :".$e->getMessage()."'); window.location.href='index.php'; </script>";
        exit();
    }
?>