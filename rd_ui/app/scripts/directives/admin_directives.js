(function () {
  'use strict';

  var directives = angular.module('redash.directives');

  // Angular strips data- from the directive, so data-source-form becomes sourceForm...
  directives.directive('sourceForm', ['$http', function ($http) {
    console.log('hello???');
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/views/admin_data_source_form.html',
      scope: {
        'dataSource': '='
      },
      link: function ($scope) {
        $http.get('/api/data_sources/types').success(function (types) {
          $scope.type = _.find(types, function (t) {
            return t.type == $scope.dataSource.type;
          });
          $scope.dataSourceTypes = types;
          _.each(types, function (type) {
            _.each(type.configuration_schema.properties, function (prop, name) {
              if (name == 'password' || name == 'passwd') {
                prop.type = 'password';
              }
              prop.required = _.contains(type.configuration_schema.required, name);
            });
          });
        });
        // todo:
        // 1. watch type change, and if changed clear options and update current type.
      }
    }
  }]);
})();
