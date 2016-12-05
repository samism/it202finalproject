'use strict';

angular.module('reviewSystemApp')
  .controller('ReviewController', ['$scope', '$location', '$state', '$stateParams', 'FirebaseService', function ($scope, $location, $state, $stateParams, FirebaseService) {
   if(!$stateParams.reviewId) {
      $state.go('software', {'softwareName': $stateParams.softwareName});
   }

   $scope.fb = FirebaseService.getArray();
   $scope.review = {};

   $('.nav-tabs a').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    });

   $scope.propertyToQuestion = function (prop) {
      return prop.charAt(0).toUpperCase() + prop.slice(1).replace(/_/g, ' ') + '?';
   };

   $scope.isRating = function (data) {
     console.log(data + ' isRating: ' + (!isNaN(data) && data.constructor !== Array));
     return !isNaN(data) && data.constructor !== Array;
   };

   $scope.interpretResponse = function (data) {
      if(data.constructor === Array) {
        return data.join(', ');
      }

      return data;
   };

   $scope.fb.$loaded().then(function(data) {
      var found = false;

      //set the current software based on url
      angular.forEach(data, function(key) {
         // console.log(value + ": " + key);

         if(decodeURI(key.meta.fullName) === $stateParams.softwareName) {
            $scope.software = key;
            console.log('This software has been set to: ' + $scope.software.meta.fullName);

            //set the given review for the given software based on url
            angular.forEach($scope.software.reviews, function(keyTwo, valueTwo) {
               if(parseInt($stateParams.reviewId) === valueTwo) {
                  $scope.review = keyTwo;
                  console.log('This review has been set to: ' + JSON.stringify($scope.review));
               }
            });

            //redirect to general page if given review not found
            if(!$scope.review) {
               $state.go('software', {'softwareName': $stateParams.softwareName});
            }
         }
      });
   });
}]);