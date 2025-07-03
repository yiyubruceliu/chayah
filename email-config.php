<?php
// Email Configuration for Chayah Kalahari Project NPC
// Modify these settings as needed

// Recipient email (where contact form messages will be sent)
$config['recipient_email'] = 'alma.solidearth@gmail.com';

// Organization details
$config['organization_name'] = 'Chayah Kalahari Project NPC';
$config['organization_registration'] = '2025/268702/08';
$config['organization_address'] = 'Village House 15, Ward 4, Van Zylsrus, South Africa';

// Contact information
$config['phone'] = '+27 83 388 0898';
$config['whatsapp'] = '+27 83 388 0898';
$config['facebook'] = 'https://www.facebook.com/SolidearthMeerkat';

// Email settings
$config['from_email'] = 'noreply@chayahkalahari.org';
$config['from_name'] = 'Chayah Kalahari Project';
$config['subject_prefix'] = 'New Contact Form Message - ';

// Validation settings
$config['max_name_length'] = 100;
$config['max_message_length'] = 2000;

// Auto-reply settings
$config['send_auto_reply'] = true;
$config['auto_reply_subject'] = 'Thank you for contacting Chayah Kalahari Project NPC';

// Logging settings
$config['enable_logging'] = true;
$config['contact_log_file'] = 'contact-log.txt';
$config['error_log_file'] = 'error-log.txt';

// Security settings
$config['enable_csrf_protection'] = false; // Set to true if you want CSRF protection
$config['allowed_origins'] = ['*']; // Set specific domains for production

// Email template colors
$config['primary_color'] = '#D08C2B';
$config['secondary_color'] = '#F4E8D2';
$config['text_color'] = '#333333';

// Include this configuration in the main email handler
if (file_exists('email-config.php')) {
    include 'email-config.php';
}
?> 