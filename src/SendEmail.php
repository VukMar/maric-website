<?php
// Define SMTP server settings
$smtpHost = '""';
$smtpUsername = '';
$smtpPassword = '';
$smtpPort = 465; // Update with the appropriate port number for your SMTP server

// Retrieve form data
if($_SERVER['REQUEST_METHOD'] === 'POST'){

    $name = $_POST['name'];
    $email = $_POST['email'];

    $to = 'vuk.s.maric@gmail.com';
    $subject = 'Conatct from website';
    $headers = "From: $email" . "\r\n" .
    "Reply-To: $email" . "\r\n" .
    "X-Mailer: PHP/" . phpversion();
    $content = "Hello my name is $name!\nMy email is: $email\n Please contact me back!";
    
    // Configure PHP to use SMTP for sending emails
    ini_set('SMTP', $smtpHost);
    ini_set('smtp_port', $smtpPort);
    ini_set('sendmail_from', $smtpUsername);
    
    // Set up SMTP authentication
    ini_set('smtp_auth', 'true');
    ini_set('smtp_username', $smtpUsername);
    ini_set('smtp_password', $smtpPassword);
    ini_set('smtp_secure', 'tls');
    
    // Send the email
    $success = false;
    set_time_limit(10);
    try{
        if (mail($to, $subject, $content, $headers)) {
            $success = true;
        }
    }catch(Exception $e){
        //Unused
    }

    if ($success) {
        echo 'success';
    } else {
        echo 'error';
    }

}
?>