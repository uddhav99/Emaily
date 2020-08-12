# Emaily
 A web application that allows users to send custom surveys, track their responses using Webhooks, and analyze the feedback/response through visual dashboards

## Local Usage 
The application currently works in development mode by simply booting up a Node.js server. After cloning the repository, follow these steps to get it running yourself -:

Clone the repo and install the dependencies.
```
$ git clone https://github.com/uddhav99/FaceRecognition.git
$ cd Emaily
$ cd server
```
```
npm install 
```
Once you install all the dependencies, you will have to do the following steps to Add the API keys 
```
* Go to your favourite code editor (VisualStudio Code, Sublime text etc)
* Go to the config folder
* Create a new file called dev.js
* Add the API keys for the following
  - MongoDB database
  - STRIPE API (publishable and secret)
  - SendGrid API 
  - Google OAuth (Client and secret)
  - redirect domain

```
After all the dependencies are installed and the API keys are added you can start the server
```
$ npm run dev
```
## Production Usage
https://evening-sierra-29079.herokuapp.com/

## Technologies
- Front-end: React.js, redux, JavaScript, HTML5/CSS3
- Back-end: Node.js, Express.js, Passport.js, Google OAuth MongoDB
