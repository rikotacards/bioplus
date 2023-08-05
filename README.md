# Features

# Pages

## Profile page (Page where the links are hosted)

# Data Schemas and data planning
## Firebase
Firebase uses email to login
Email is tied to a uid
* User content needs to be pointing towards Uid
* Username needs to point to Uid

* uid -> username
* uid -> user content
* uid -> userinfo {username}

## User

# Problems encountered
Had THE most annoying issue with Google firebase authentication, signInWithRedirect. Documents ask you to whitelist the redirect URI. 

The palce you need to go is in Auth > Google Signin method > whitelist ClientIds from externap projects. 

# Creating own theme
## Backgrounds
- Right now, you have to create a new background component to have a custom background. The reason is that if the background requires more divs and what not, we can easily do this. 

## Link button styles
- Right now they are in the linkStyles.ts objects