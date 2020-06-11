<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $conn =  new mysqli($servername, $username, $password);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $sql = "CREATE DATABASE IF NOT EXISTS bank";
    $conn->query($sql);
    $sql = "USE bank";
    $conn->query($sql);
?>