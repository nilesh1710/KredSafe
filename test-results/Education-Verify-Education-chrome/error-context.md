# Page snapshot

```yaml
- link "KredSafe":
  - /url: https://dev.kredsafe.net
  - img "KredSafe"
- heading "Welcome" [level=1]
- paragraph: Simple. Centralized. Credential Concierge services for and by professionals.
- paragraph: Connect. Anytime. Anywhere. Your credentials are secure and managed with KredSafe.
- paragraph: Two-Factor Authentication is On
- heading "Authenticate the Login" [level=3]
- paragraph: A one-time password has been sent to your registered phone number and email address. If you have not initiated this, please change your password. This OTP will expire in 5 minutes.
- text: 
- textbox
- text: Enter OTP * 04:12
- button "Verify"
- link "Resend OTP":
  - /url: javascript:document.getElementById('resend_otp').submit();
- paragraph:
  - text: Already have an account?
  - link "Login":
    - /url: https://dev.kredsafe.net/login
```