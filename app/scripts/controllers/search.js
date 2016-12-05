'use strict';

angular.module('reviewSystemApp')
  .controller('SearchController', ['$scope', 'FirebaseService', '$state', '$stateParams', function ($scope, FirebaseService, $state, $stateParams) {
   /*
   search criteria (filter results by):

   date
   tags
   software

   sort results by:

   date
   reviewer name

   */

     if(!$stateParams.query) {
        $state.go('main');
     }

     $scope.query = $stateParams.query;
     $scope.submit = function () {
        $state.go('search', {'query': $scope.searchQuery});
     };



}]);