# Email Setup Guide - Chayah Kalahari Project NPC

This guide explains how to set up and configure the contact form email functionality for the Chayah Kalahari Project website.

## Files Overview

- `send-email.php` - Main email handler that processes form submissions
- `email-config.php` - Configuration file for email settings
- `script.js` - Updated JavaScript to handle form submission

## Setup Instructions

### 1. Server Requirements

- PHP 7.0 or higher
- Mail server configured (SMTP or local mail server)
- File write permissions for logging (optional)

### 2. Configuration

Edit `email-config.php` to customize your email settings:

```php
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
```

### 3. Email Server Configuration

#### Option A: Using Gmail SMTP (Recommended)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Update the configuration:

```php
// In email-config.php, add SMTP settings
$config['smtp_host'] = 'smtp.gmail.com';
$config['smtp_port'] = 587;
$config['smtp_username'] = 'your-email@gmail.com';
$config['smtp_password'] = 'your-app-password';
$config['smtp_secure'] = 'tls';
```

#### Option B: Using Local Mail Server

If your hosting provider has a local mail server, you can use the default PHP mail() function.

### 4. Security Considerations

#### For Production:

1. **Remove debug settings** in `send-email.php`:
```php
// Comment out or remove these lines
// error_reporting(E_ALL);
// ini_set('display_errors', 1);
```

2. **Set specific allowed origins**:
```php
$config['allowed_origins'] = ['https://yourdomain.com', 'https://www.yourdomain.com'];
```

3. **Enable CSRF protection** (optional):
```php
$config['enable_csrf_protection'] = true;
```

4. **Set up SSL certificate** for secure form submission

### 5. Testing

1. Upload files to your web server
2. Test the contact form on your website
3. Check that emails are received
4. Verify auto-reply functionality

### 6. Troubleshooting

#### Common Issues:

1. **Emails not sending**:
   - Check server mail configuration
   - Verify SMTP settings
   - Check error logs

2. **Form submission errors**:
   - Ensure PHP is enabled
   - Check file permissions
   - Verify file paths

3. **Spam filters**:
   - Configure SPF records
   - Set up DKIM authentication
   - Use a reputable email service

#### Debug Mode:

To enable debug mode, uncomment these lines in `send-email.php`:
```php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

### 7. Logging

The system can log contact form submissions and errors. Logs are stored in:
- `contact-log.txt` - Successful submissions
- `error-log.txt` - Failed submissions

To disable logging, set:
```php
$config['enable_logging'] = false;
```

### 8. Customization

#### Email Templates

The email templates are embedded in `send-email.php`. You can customize:
- Colors and styling
- Content and messaging
- Layout and structure

#### Auto-Reply

The auto-reply feature sends a thank you message to form submitters. To disable:
```php
$config['send_auto_reply'] = false;
```

### 9. Maintenance

#### Regular Tasks:

1. **Monitor logs** for any issues
2. **Update contact information** as needed
3. **Test email functionality** periodically
4. **Backup configuration** files

#### Security Updates:

1. Keep PHP updated
2. Monitor for security vulnerabilities
3. Update email server configurations
4. Review access logs

## Support

For technical support or questions about the email setup, please contact your web developer or hosting provider.

## File Structure

```
/
├── send-email.php          # Main email handler
├── email-config.php        # Configuration file
├── script.js              # Updated JavaScript
├── contact-log.txt        # Contact form logs (auto-generated)
├── error-log.txt          # Error logs (auto-generated)
└── EMAIL_SETUP.md         # This guide
```

## Changelog

- **v1.0** - Initial release with basic email functionality
- **v1.1** - Added configuration file and improved security
- **v1.2** - Added auto-reply functionality and logging 