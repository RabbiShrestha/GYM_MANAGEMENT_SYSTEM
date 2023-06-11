<?php
$servername = "127.0.0.1"; // Replace with your MySQL server name
$username = "Rabbishrestha"; // Replace with your MySQL username
$password = "rabbi2001"; // Replace with your MySQL password
$database = "gms"; // Replace with the name of your MySQL database

// Create a new MySQLi object
$mysqli = new mysqli($servername, $username, $password, $database);

// Check the connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Connection successful
echo "Connected to the database successfully";

// Close the connection (optional, you can omit this)
$mysqli->close();
?>