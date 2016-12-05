'use strict';

angular.module('reviewSystemApp')
  .controller('MainCtrl', ['$scope', 'FirebaseService', function ($scope, FirebaseService) {
    $scope.data = FirebaseService.getObject();
}]);