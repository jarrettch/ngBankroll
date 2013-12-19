angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Visits",
        "link": "visits"
    }, {
        "title": "Create New Visit",
        "link": "visits/create"
    }];
    
    $scope.isCollapsed = false;
}]);