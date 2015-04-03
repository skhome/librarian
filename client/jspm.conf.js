System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.14",
    "angular-animate": "github:angular/bower-angular-animate@1.3.14",
    "angular-messages": "github:angular/bower-angular-messages@1.3.14",
    "angular-mocks": "github:angular/bower-angular-mocks@1.3.14",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.13",
    "angular-ui/bootstrap-bower": "github:angular-ui/bootstrap-bower@0.12.1",
    "dbtek/bootswatch-dist": "github:dbtek/bootswatch-dist@paper",
    "font-awesome": "npm:font-awesome@4.3.0",
    "json": "github:systemjs/plugin-json@0.1.0",
    "less": "github:aaike/jspm-less-plugin@0.0.4",
    "lodash/lodash": "github:lodash/lodash@3.3.1",
    "restangular": "github:mgonto/restangular@1.4.0",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:aaike/jspm-less-plugin@0.0.4": {
      "less.js": "github:distros/less@2.4.0"
    },
    "github:angular-ui/bootstrap-bower@0.12.1": {
      "angular": "github:angular/bower-angular@1.2.28"
    },
    "github:angular-ui/ui-router@0.2.13": {
      "angular": "github:angular/bower-angular@1.3.14"
    },
    "github:angular/bower-angular-animate@1.3.14": {
      "angular": "github:angular/bower-angular@1.3.14"
    },
    "github:angular/bower-angular-mocks@1.3.14": {
      "angular": "github:angular/bower-angular@1.3.14"
    }
  }
});

