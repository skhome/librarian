System.config({
  "baseURL": "/",
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.13",
    "angular-animate": "github:angular/bower-angular-animate@1.3.13",
    "angular-messages": "github:angular/bower-angular-messages@1.3.13",
    "angular-mocks": "github:angular/bower-angular-mocks@1.3.13",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.13",
    "fyockm/bootstrap-css-only": "github:fyockm/bootstrap-css-only@3.3.2",
    "json": "github:systemjs/plugin-json@0.1.0",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:angular-ui/ui-router@0.2.13": {
      "angular": "github:angular/bower-angular@1.3.13"
    },
    "github:angular/bower-angular-animate@1.3.13": {
      "angular": "github:angular/bower-angular@1.3.13"
    },
    "github:angular/bower-angular-mocks@1.3.13": {
      "angular": "github:angular/bower-angular@1.3.13"
    }
  }
});

