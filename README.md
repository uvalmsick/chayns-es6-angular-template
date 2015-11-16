# Template for chayns using Angular and ECMAScript 2015
This is a template for writing chayns Tapps using AngularJS and ECMAScript 2015.

## Installation
1. <code>git clone https://github.com/rherwig/chayns-es6-angular-template.git</code>
2. <code>npm i</code> to install dependencies
3. <code>git remote set-url &lt;your_repository&gt;</code>
4. <code>gulp</code> to run dev server

## Building and Deployment
You can use <code>gulp build</code> to bundle, uglify and copy the distribution files to dist directory.
The appcache.manifest is automatically invalidated by doing so.

<code>gulp deploy:qa</code> and <code>gulp deploy:release</code> will publish the dist folders contents to
the qa/release path. Before using that feature, ensure that the RELEASE_PATH and QA_PATH inside the gulpfile
are set accordingly.