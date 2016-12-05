'use strict';

angular.module('reviewSystemApp')
  .controller('SoftwareController', ['$scope', '$location', '$state', '$stateParams', 'FirebaseService', function ($scope, $location, $state, $stateParams, FirebaseService) {
    if($stateParams.reviewId) {
      $state.go('review', {'softwareName': $stateParams.softwareName, 'reviewId': $stateParams.reviewId});
    }

    $scope.fb = FirebaseService.getArray();
    $scope.software = undefined;

    $scope.firstName = function (review) { return review.meta.reviewerName.split(' ')[0]; };
    $scope.lastName = function (review) { return review.meta.reviewerName.split(' ')[1]; };
    $scope.dateAscending = function (review) { return new Date(review.meta.reviewDate); };
    $scope.dateDescending = function (review) { return -new Date(review.meta.reviewDate); };

    $('#software-sort-dropdown').dropdown(); //initialize sort dropdown

    $scope.fb.$loaded().then(function(data) {
      var found = false;

      angular.forEach(data, function(key) {
        if(!found) {
          // console.log(value + ": " + key);

          if(decodeURI(key.meta.fullName) === $stateParams.softwareName) {
            found = true;
            $scope.software = key;
            console.log('This page has been set to: ' + $scope.software.meta.fullName);
          }
        }
      });

      if(!$scope.software) {
        console.log('could not find ' + $stateParams.softwareName + ' in the firebase object.');
      }
    });
  }]);
