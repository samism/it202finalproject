'use strict';

angular.module('reviewSystemApp').service('FirebaseService', ['$firebaseObject', '$firebaseArray', function($firebaseObject, $firebaseArray) {
    var config = {
      apiKey: 'AIzaSyBW2BQE00_OywISZTbqN6S-JgA1QNpBUGU',
      authDomain: 'etl-review-system.firebaseapp.com',
      databaseURL: 'https://etl-review-system.firebaseio.com',
      storageBucket: 'etl-review-system.appspot.com',
      messagingSenderId: '668723338966'
    };

    firebase.initializeApp(config);
    var ref = firebase.database().ref().child('software');

    return {
       getObject: function() { 
        return $firebaseObject(ref);
      },
      getArray: function() {
        return $firebaseArray(ref);
      }
    };
}]);