angular.module('mean.visits').controller('VisitsController', ['$scope', '$routeParams', '$location', 'Global', 'Visits', function ($scope, $routeParams, $location, Global, Visits) {
    $scope.global = Global;

    $scope.create = function() {
        var visit = new Visits({
            datePlayed: this.datePlayed,
            location: this.location,
            visitType: this.visitType,
            stakes: this.stakes,
            hoursPlayed: this.hoursPlayed,
            profitOrLoss: this.profitOrLoss,
            notes: this.notes
        });
        visit.$save(function(response) {
            $location.path("visits/" + response._id);
        });

        this.datePlayed = "";
        this.location = "";
        this.visitType = "";
        this.stakes = "";
        this.hoursPlayed = "";
        this.profitOrLoss = "";
        this.notes = "";
    };

    $scope.remove = function(visit) {
        if (visit) {
            visit.$remove();  

            for (var i in $scope.visits) {
                if ($scope.visits[i] == visit) {
                    $scope.visits.splice(i, 1);
                }
            }
        }
        else {
            $scope.visit.$remove();
            $location.path('visits');
        }
    };

    $scope.update = function() {
        var visit = $scope.visit;
        if (!visit.updated) {
            visit.updated = [];
        }
        visit.updated.push(new Date().getTime());

        visit.$update(function() {
            $location.path('visits/' + visit._id);
        });
    };

    $scope.find = function() {
        Visits.query(function(visits) {
            $scope.visits = visits;
        });
    };

    $scope.findOne = function() {
        Visits.get({
            visitId: $routeParams.visitId
        }, function(visit) {
            $scope.visit = visit;
        });
    };
}]);