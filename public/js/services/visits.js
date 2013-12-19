//Visits service used for visits REST endpoint
angular.module('mean.visits').factory("Visits", ['$resource', function($resource) {
    return $resource('visits/:visitId', {
        visitId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);