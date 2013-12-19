//Articles service used for articles REST endpoint
angular.module('mean.visits').factory("Visits", ['$resource', function($resource) {
    return $resource('visits/:visitId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);