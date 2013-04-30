# Mobile Client

## Getting started with git
To download the code for the mobile client and start doing development you must clone this repository. Follow the [github instructions]( https://help.github.com/articles/set-up-git) for installing and setting up git or use the [github for Windows](http://windows.github.com/).

Once setup clone this repository to your local hard drive with this

```bash
git clone https://github.com/globicon/mobile-client.git
````

## Developer Requirements and Initial Setup
The Application is build with [Sencha Touch 2.2.0](http://www.sencha.com/products/touch/download/), the framework is included in the repository, in
`touch` folder.

The Sencha Cmd is used to test and build the application read more about the
Sencha Cmd on http://www.sencha.com/products/sencha-cmd/download/sencha-cmd-3.1.1
**Download** this to build and test the application.

## Development
To modify the mobile client application you need a local webserver that can be used
during application development. Your local webserver should be setup to serve the
`mobile-client` folder.

You also need a webbrowser, because the application will call a cross domain API,
you need to launch chrome with the `--disable-web-security` option when hosting the
application on localhost. Other browsers have a similar option.

When you web server running you should be able to access the application on
http://localhost:<port>/mobile-client/ and do you debugging here.

To change styles of the application you need [compass](http://compass-style.org/).
With compass installed, make changes to the `resources/sass/app.scss` file and
run `compass compile` in the `resources/sass` folder, to recompile the styles.

## Building
Ensure that the [Sencha Cmd](http://www.sencha.com/products/sencha-cmd/download/sencha-cmd-3.1.1) is installed and is on path.

To build a version that can be deployed on a webserver.
```bash
sencha app build production
```

This will generate a folder in `build/MobileClient/production/` this folder should be
deployed on a webserver.

To build a version that can be deployed on a webserver and be used for testing run

```bash
sencha app build testing
```
This will generate a folder in `build/MobileClient/testing/` this folder should be
deployed on a webserver.

To build a package the app as a native application

```bash
sencha app build native
```

Read more about native packaging on http://docs.sencha.com/touch/2-0/#!/guide/native_packaging