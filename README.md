# chatterino

Welcome to Chatterino!

This web app serves as a tool for 2-person video calls and text chat.

This app is deployed with Netlify and can be accessed here: https://chattterino.netlify.app/.

The backend is deployed on Heroku. It is CORS configured to work only with the frontend. To run the app locally, intallation steps in the next section can be followed.

## Installation

The app is already deployed and you can use the final product on this [link](https://discorso.netlify.app/). 
If you want to play around with it locally, clone this repo and install the dependencies. Keep in mind that frontend is in the root of this repo.

```
$ git clone https://github.com/HSemic/Chatterino.git
$ cd Chatterino
```

To run the backend, for example, with nodemon, use the commands outlined below:

```
$ cd Chatterino
$ npm i
$ nodemon index.ts
```

To run the frontend, use the commands below:

```
$ cd client
$ npm i
$ npm start
```

An axios instance for localhost will need to be configured to connect to the local API

## Used technologies

The app was built using the [React library](https://reactjs.org/) and bootstrapped using create-react-app.

Code itself was written using [TypeScript](https://www.typescriptlang.org/), a statically typed JavaScript superset.

UI and styling was done using [MaterialUI](https://mui.com/), a CSS preprocessor.

Backend was written using [NodeJS](https://nodejs.org/en/) and [Express](https://expressjs.com/).

## Design

The app is responsive and works on various screen sizes.

## License

Discorso is released under the [MIT license](https://opensource.org/licenses/MIT).
