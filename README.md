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