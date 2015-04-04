System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.15",
    "angular-animate": "github:angular/bower-angular-animate@1.3.15",
    "angular-mocks": "github:angular/bower-angular-mocks@1.3.15",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.13",
    "dbtek/bootswatch-dist": "github:dbtek/bootswatch-dist@paper",
    "font-awesome": "npm:font-awesome@4.3.0",
    "json": "github:systemjs/plugin-json@0.1.0",
    "less": "github:aaike/jspm-less-plugin@0.0.4",
    "lodash": "github:lodash/lodash@3.6.0",
    "restangular": "github:mgonto/restangular@1.4.0",
    "text": "github:systemjs/plugin-text@0.0.2",
    "traceur": "github:jmcriffey/bower-traceur@0.0.87",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.87",
    "github:aaike/jspm-less-plugin@0.0.4": {
      "less.js": "github:distros/less@2.4.0"
    },
    "github:angular-ui/ui-router@0.2.13": {
      "angular": "github:angular/bower-angular@1.3.15"
    },
    "github:angular/bower-angular-animate@1.3.15": {
      "angular": "github:angular/bower-angular@1.3.15"
    },
    "github:angular/bower-angular-mocks@1.3.15": {
      "angular": "github:angular/bower-angular@1.3.15"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:mgonto/restangular@1.4.0": {
      "angular": "github:angular/bower-angular@1.3.15",
      "lodash": "npm:lodash@3.6.0"
    },
    "npm:lodash@3.6.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

