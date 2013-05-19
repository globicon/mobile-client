# Mobile Client

## Getting started with git
To download the code for the mobile client and start doing development you must clone this repository. Follow the [github instructions]( https://help.github.com/articles/set-up-git) for installing and setting up git or use the [github for Windows](http://windows.github.com/).

Once setup clone this repository to your local hard drive with this

```bash
git clone https://github.com/globicon/mobile-client.git
````

To learn more about working with git read through [docs and watch videos](http://git-scm.com/doc)

## Local development environment

Requirements

  * http://nodejs.org/
  * http://www.ruby-lang.org/en/
  * http://compass-style.org/install

Download and instal latest version of nodejs.

To compile sass files ensure ruby and compass is installed.
On windows go to http://rubyinstaller.org/downloads/ and download and install Ruby 1.9.3-p429. Make sure ruby executables are put on path when installing. When installed open a console and type

```
gem install compass
```

to install compass. Compass is used to compile sass files to css files.

## Development
The application is build using [Angularjs](http://angularjs.org/), it is worth reading through some of the documentation and watching some videos about angular before starting.

The code for the application is in the `app` directory.

The `app/index.html` folder is the entry point of the application, it sets up the initial page layout and loads angular and the application logic.

The `app/views` folder contains the view templates used to generate the UI for the application.

The `app/styles` contains the css styles used for the application. The application uses the [twitter bootstrap](http://twitter.github.com/bootstrap/) framework for styling the application. Most changes should happen in the `app/styles/main.scss` (scss file a [sass](http://sass-lang.com/) file, sass is a css preprocessor, proving features such as variable names and nesting to css.

The `app/scripts` contains the javascript code for the application.

* `app/scripts/vendor` contains the angular library (and should contain any other third party library needed).

* `app/scripts/app.js` contains the initial setup of the application, registres routes and setups angular filters and directives used in the application.

* `app/scripts/resources.js` contains the code for communicating with the REST API.

* `app/scripts/controllers.js` contains the controller layer of the Angular MVC application. The controllers act as a binding layer between the views and the resources (Models). The controllers will call the rest api make the data available for the views to render and react to user interactions from the views. The is one controller per view.

## Deployment
To create a deployment package run

```bash
build.bat
````

This will create a folder called `dist` that can be deployed on a webserver.



