<?php
// Chayah Kalahari Project NPC - Contact Form Email Handler
// This file handles the contact form submissions and sends emails

// Load configuration
include 'email-config.php';

// Set error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');

// Allow CORS for the contact form
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address']);
    exit;
}

// Sanitize inputs to prevent XSS
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Additional validation
if (strlen($name) > 100) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name is too long']);
    exit;
}

if (strlen($message) > 2000) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Message is too long']);
    exit;
}

// Email configuration
$to = $config['recipient_email'];
$subject = $config['subject_prefix'] . $config['organization_name'];

// Create email headers
$headers = array();
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
$headers[] = 'From: ' . $config['from_name'] . ' <' . $config['from_email'] . '>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Create HTML email body
$emailBody = '
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Message</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: ' . $config['primary_color'] . '; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: ' . $config['primary_color'] . '; }
        .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid ' . $config['primary_color'] . '; }
        .footer { background-color: ' . $config['secondary_color'] . '; padding: 15px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Contact Form Message</h1>
            <p>' . $config['organization_name'] . '</p>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">' . $name . '</div>
            </div>
            
            <div class="field">
                <div class="label">Email:</div>
                <div class="value">' . $email . '</div>
            </div>
            
            <div class="field">
                <div class="label">Message:</div>
                <div class="value">' . nl2br($message) . '</div>
            </div>
            
            <div class="field">
                <div class="label">Submitted:</div>
                <div class="value">' . date('F j, Y \a\t g:i A T') . '</div>
            </div>
            
            <div class="field">
                <div class="label">IP Address:</div>
                <div class="value">' . $_SERVER['REMOTE_ADDR'] . '</div>
            </div>
        </div>
        
        <div class="footer">
            <p>This message was sent from the ' . $config['organization_name'] . ' website contact form.</p>
            <p>NPC Registration: ' . $config['organization_registration'] . '</p>
        </div>
    </div>
</body>
</html>';

// Send email
$mailSent = mail($to, $subject, $emailBody, implode("\r\n", $headers));

if ($mailSent) {
    // Log successful submission (optional)
    if ($config['enable_logging']) {
        $logEntry = date('Y-m-d H:i:s') . " - Contact form submitted by: $name ($email)\n";
        file_put_contents($config['contact_log_file'], $logEntry, FILE_APPEND | LOCK_EX);
    }
    
    // Send success response
    http_response_code(200);
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you for your message! We will get back to you soon.'
    ]);
} else {
    // Log error (optional)
    if ($config['enable_logging']) {
        $errorLog = date('Y-m-d H:i:s') . " - Failed to send email from: $name ($email)\n";
        file_put_contents($config['error_log_file'], $errorLog, FILE_APPEND | LOCK_EX);
    }
    
    // Send error response
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Sorry, there was an error sending your message. Please try again or contact us directly.'
    ]);
}

// Optional: Send auto-reply to the sender
function sendAutoReply($senderEmail, $senderName) {
    global $config;
    $autoReplySubject = $config['auto_reply_subject'];
    
    $autoReplyHeaders = array();
    $autoReplyHeaders[] = 'MIME-Version: 1.0';
    $autoReplyHeaders[] = 'Content-Type: text/html; charset=UTF-8';
    $autoReplyHeaders[] = 'From: ' . $config['from_name'] . ' <' . $config['from_email'] . '>';
    $autoReplyHeaders[] = 'X-Mailer: PHP/' . phpversion();
    
    $autoReplyBody = '
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for contacting us</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: ' . $config['text_color'] . '; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: ' . $config['primary_color'] . '; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .footer { background-color: ' . $config['secondary_color'] . '; padding: 15px; text-align: center; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
                    <div class="header">
            <h1>Thank you for contacting us!</h1>
            <p>' . $config['organization_name'] . '</p>
        </div>
            
            <div class="content">
                <p>Dear ' . $senderName . ',</p>
                
                <p>Thank you for reaching out to the Chayah Kalahari Project NPC. We have received your message and will respond to you as soon as possible.</p>
                
                <p>In the meantime, you can:</p>
                <ul>
                    <li>Visit our Facebook page: <a href="' . $config['facebook'] . '">Solidearth Meerkat</a></li>
                    <li>Call us directly: ' . $config['phone'] . '</li>
                    <li>WhatsApp us: <a href="https://wa.me/' . str_replace('+', '', $config['whatsapp']) . '">' . $config['whatsapp'] . '</a></li>
                </ul>
                
                <p>For urgent matters, please contact us directly by phone or WhatsApp.</p>
                
                <p>Best regards,<br>
                The Chayah Kalahari Project Team</p>
            </div>
            
            <div class="footer">
                <p>' . $config['organization_name'] . '</p>
                <p>NPC Registration: ' . $config['organization_registration'] . '</p>
                <p>' . $config['organization_address'] . '</p>
            </div>
        </div>
    </body>
    </html>';
    
    mail($senderEmail, $autoReplySubject, $autoReplyBody, implode("\r\n", $autoReplyHeaders));
}

// Send auto-reply if main email was sent successfully
if ($mailSent && $config['send_auto_reply']) {
    sendAutoReply($email, $name);
}
?> 