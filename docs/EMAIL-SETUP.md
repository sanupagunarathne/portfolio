# Receiving portfolio messages

The user confirmed **sanupar07@gmail.com** after correcting the original domain typo. It is now the public Contact email and mailto recipient, and the suggested CONTACT_TO_EMAIL in .env.example. This task sends no real email and creates no service accounts.

## Existing integration: Resend

The site already has a server-side Resend adapter. Create an account at https://resend.com, verify a sending domain you control, and create a sending API key. Add these in your deployment project's secure Environment Variables settings (for example, Vercel → Project → Settings → Environment Variables):

- `RESEND_API_KEY`: the API key, never a NEXT_PUBLIC variable.
- `CONTACT_TO_EMAIL`: your confirmed receiving inbox.
- `CONTACT_FROM_EMAIL`: an address on your verified sending domain, optionally formatted as `Portfolio <contact@your-domain>`.

Redeploy after configuration. The public email in src/data/personal.ts is separate from server delivery configuration. Your Gmail inbox can be the recipient; it should not be used as a Resend sender unless that sender is authorized by the provider. The Resend test sender is restricted and is not a general production substitute for domain verification.

Resend offers a free tier; check current quotas at https://resend.com/pricing. Current prices/limits could not be independently verified from this environment because its network policy blocked the pricing page. A domain can still cost money if you do not already own one. Configure hosting/provider abuse controls before public activation, then explicitly authorize a real test and verify it arrives in the inbox/spam folder. API acceptance alone does not guarantee inbox delivery. There is no persistent application-wide rate limiter here.

## No API or sending domain: email-app fallback

Prepare a message in Contact and choose “Open in email app”. This uses a mailto link with the draft. It has no API key/service cost, but requires the visitor to have an email app configured and click Send there. The website does not send or receive it directly. Copying a draft remains available.

## Hosted-form alternative

A hosted form service such as https://formsubmit.co can avoid managing an email API key/domain, normally using mailbox activation. Check its current terms, quotas and privacy policy before choosing it. It requires a different server adapter and shares form contents with that provider. It is not configured in this branch; no destination is registered and no activation email is sent. Do not embed an API secret in client code or send secret values in chat.
