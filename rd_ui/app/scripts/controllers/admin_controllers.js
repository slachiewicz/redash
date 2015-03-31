(function () {
  var AdminStatusCtrl = function ($scope, Events, $http, $timeout) {
    Events.record(currentUser, "view", "page", "admin/status");
    $scope.$parent.pageTitle = "System Status";

    var refresh = function () {
      $scope.refresh_time = moment().add('minutes', 1);
      $http.get('/status.json').success(function (data) {
        $scope.workers = data.workers;
        delete data.workers;
        $scope.manager = data.manager;
        delete data.manager;
        $scope.status = data;
      });

      $timeout(refresh, 59 * 1000);
    };

    refresh();
  };

  var AdminDataSourcesCtrl = function ($scope, Events, DataSource) {
    Events.record(currentUser, "view", "page", "admin/data_sources");
    $scope.$parent.pageTitle = "Data Sources";

    $scope.dataSources = DataSource.query();
  };

  var AdminDataSourceCtrl = function ($scope, $routeParams, $http, Events, DataSource) {
    Events.record(currentUser, "view", "page", "admin/data_source");
    $scope.$parent.pageTitle = "Data Sources";

    $scope.dataSourceId = $routeParams.dataSourceId;
    $scope.dataSources = DataSource.query();

    

    $scope.dataSource = DataSource.get({id: $routeParams.dataSourceId});
  };

  angular.module('redash.admin_controllers', [])
         .controller('AdminStatusCtrl', ['$scope', 'Events', '$http', '$timeout', AdminStatusCtrl])
         .controller('AdminDataSourcesCtrl', ['$scope', 'Events', 'DataSource', AdminDataSourcesCtrl])
         .controller('AdminDataSourceCtrl', ['$scope', '$routeParams', '$http', 'Events', 'DataSource', AdminDataSourceCtrl])
})();
