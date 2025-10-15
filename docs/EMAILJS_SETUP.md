# EmailJS Setup Instructions

Follow these steps to set up EmailJS for your contact form:

## Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the authorization steps to connect your Gmail account
5. Copy the **Service ID** (you'll need this)

## Step 3: Create Email Template

1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Set up your template with these variables:

   ```
   From: {{name}} <{{email}}>
   Subject: New Contact Form Message: {{subject}}

   You have a new message from your portfolio:

   Name: {{name}}
   Email: {{email}}
   Subject: {{subject}}

   Message:
   {{message}}
   ```

4. Save the template and copy the **Template ID**

## Step 4: Get Public Key

1. Go to "Account" → "General"
2. Find your **Public Key** (starts with "user\_" or similar)
3. Copy this key

## Step 5: Update Your Code

Open `assets/js/script.js` and replace these placeholders:

```javascript
// Line with: emailjs.init("YOUR_PUBLIC_KEY");
emailjs.init("your_actual_public_key_here");

// Line with: emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", contactForm)
emailjs.sendForm("your_service_id_here", "your_template_id_here", contactForm);
```

## Step 6: Test

1. Open your portfolio
2. Click "Get in Touch"
3. Fill out and submit the form
4. Check your email for the message

## Free Tier Limits

- 200 emails per month
- Perfectly fine for a portfolio site!

## Troubleshooting

- **Form not sending**: Check browser console for errors
- **Wrong email received**: Double-check template variable names match form field names
- **Service blocked**: Make sure you authorized the email service correctly

## Security Note

EmailJS public key is safe to expose in client-side code - it's designed for this purpose.

---

Your contact form is now ready! Once you complete these steps, visitors can send you emails directly from your portfolio. 🚀
