# Mobile Client

## Getting started with git
To download the code for the mobile client and start doing development you must clone this repository. Follow the [github instructions]( https://help.github.com/articles/set-up-git) for installing and setting up git or use the [github for Windows](http://windows.github.com/).

Once setup clone this repository to your local hard drive with this

```bash
git clone https://github.com/globicon/mobile-client.git
````

To learn more about working with git read through [docs and watch videos](http://git-scm.com/doc)

## Local development environment
The application is build using [yeoman.io](http://yeoman.io/) which is a set of tools helping developers to build web applications. On a mac follow the instructions on the installation instruction of the [yeoman website](http://yeoman.io/installation.html) for downloading and installing yeoman. On Windows follow these [instructions](http://decodize.com/css/installing-yeoman-front-end-development-stack-windows/), use Method 2.

With yeoman install you can run the application by running.

```bash
yeoman server
``` 

This will run a small development webserver and open a browser pointing to that webserver. Because this application uses [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) to talk to webservices on another domain, you need to run [Chrome with the --disable-web-security flag](http://stackoverflow.com/questions/3102819/chrome-disable-same-origin-policy). If not you'll will not be able to call the remote REST API.

With that you should be able to run the application of your local machine in your local browser. 

To start coding all you need is a text editor e.g. http://www.sublimetext.com/. 

Whenever you save a file yeoman will refresh your browser for you.

## Development
The application is build using [Angularjs](http://angularjs.org/), it is worth reading through some of the documentation and watchinhg some videos about angular before starting.

The code for the application is in the `app` directory. 

The `app/index.html` folder is the entry point of the application, it sets up the initial page layout and loads angular and the application logi. 

The `app/views` folder contains the view templates used to generate the UI for the application.

The `app/styles` contains the css styles used for the application. The application uses the [twitter bootstrap](http://twitter.github.com/bootstrap/) framework for styling the application. Most changes should happen in the `app/styles/main.scss` (scss file a [sass](http://sass-lang.com/) file, sass is a css preprocessor, proving features such as variable names and nesting to cs. Yeoman will compile the sass files in css file whenever you save).

The `app/scripts` contains the javascript code for the application. 

* `app/scripts/vendor` contains the angular library (and should contain any other third party library needed). 

* `app/scripts/app.js` contains the initial setup of the application, registres routes and setups angular filters and directives used in the application.

* `app/scripts/resources.js` contains the code for communicating with the REST API. 

* `app/scripts/controllers.js` contains the controller layer of the Angular MVC application. The controllers act as a binding layer between the views and the resources (Models). The controllers will call the rest api make the data available for the views to render and react to user interactions from the views. The is one controller per view. 

## Deployment
To create a deployment package run

```bash
yeoman build
````

This will create a folder called `dist` that can be deployed on a webserver.



