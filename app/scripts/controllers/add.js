'use strict';

angular.module('reviewSystemApp')
  .controller('AddReviewController', ['$scope', 'FirebaseService', '$state', '$stateParams', function ($scope, FirebaseService, $state, $stateParams) {
     $scope.data = FirebaseService.getObject();

    if(!$stateParams.softwareName) {
      $state.go('main');
    }

     //empty review object. i didnt have to fully populate it like this as 
     //angular bindings would've auto-populated the object with the data,
     //but in order to default all the ratings to 0 instead of 'undefined' this was
     //necessary.
     $scope.newReview = {
        'content' : {
          'avoids_stereotypes' : $scope.avoids_stereotypes || 0,
          'content_is_accurate' : $scope.content_is_accurate || 0,
          'correct_grammar_on_the_screen' : $scope.correct_grammar_on_the_screen || 0,
          'correct_spelling_on_the_screen' : $scope.correct_spelling_on_the_screen || 0,
          'graphics_are_age_appropriate' : $scope.graphics_are_age_appropriate || 0,
          'has_clear_graphics' : $scope.has_clear_graphics || 0,
          'help_messages_are_easily_comprehended' : $scope.help_messages_are_easily_comprehended || 0,
          'instructions_are_clear' : $scope.instructions_are_clear || 0,
          'motivates_the_student' : $scope.motivates_the_student || 0
        },
        'effectiveness' : {
          'how_are_the_number_of_examples' : $scope.how_are_the_number_of_examples || 0,
          'how_clear_are_the_learning_strategies' : $scope.how_clear_are_the_learning_strategies || 0,
          'how_clear_is_the_objective_of_the_software' : $scope.how_clear_is_the_objective_of_the_software || 0,
          'how_clear_is_the_softwares_font_and_font_size' : $scope.how_clear_is_the_softwares_font_and_font_size || 0,
          'how_clear_is_the_softwares_navigation' : $scope.how_clear_is_the_softwares_navigation || 0,
          'how_customizable_is_the_software' : $scope.how_customizable_is_the_software || 0,
          'how_well_does_the_software_allow_the_student_to_practice' : $scope.how_well_does_the_software_allow_the_student_to_practice || 0,
          'how_well_does_the_software_analyze_and_present_the_students_errors' : $scope.how_well_does_the_software_analyze_and_present_the_students_errors || 0,
          'how_well_does_the_software_correct_the_students_errors' : $scope.how_well_does_the_software_correct_the_students_errors || 0,
          'how_well_does_the_software_engage_the_student' : $scope.how_well_does_the_software_engage_the_student || 0,
          'how_well_does_the_software_monitor_the_students_progress' : $scope.how_well_does_the_software_monitor_the_students_progress || 0,
          'softwares_use_of_visual_auditory_stimuli' : $scope.softwares_use_of_visual_auditory_stimuli || 0
        },
        'general' : {
          'cons' : [], //required
          'pros' : [], //required
          'review' : $scope.review //required
        },
        'meta' : {
          'reviewDate' : new Date().toISOString(),
          'reviewerName' : $scope.reviewerName //required
        },
        'overall' : {
          'additional_comments' : $scope.additional_comments || "",
          'comments_on_ease_of_use' : $scope.comments_on_ease_of_use || "",
          'comments_on_general_effectiveness' : $scope.comments_on_general_effectiveness || "",
          'how_cost_effective_is_the_software' : $scope.how_cost_effective_is_the_software || 0,
        },
        'usage' : {
          'adjusting_the_sound' : $scope.adjusting_the_sound || 0,
          'closing_the_program' : $scope.closing_the_program || 0,
          'help_screens' : $scope.help_screens || 0,
          'illogical_input' : $scope.illogical_input || 0,
          'instructions_easily_accessible' : $scope.instructions_easily_accessible || 0,
          'program_operates_without_crashing' : $scope.program_operates_without_crashing || 0,
          'repeated_incorrect_responses' : $scope.repeated_incorrect_responses || 0,
          'starting_it_up' : $scope.starting_it_up || 0,
          'user_friendly' : $scope.user_friendly || 0
        }
      };

     orientTabsAndNavigation();
     
     $scope.removePro = function () {
       $scope.newReview.general.pros.pop();
     };
     
     $scope.removeCon = function () {
       $scope.newReview.general.cons.pop();
     };

     $scope.addPro = function () {
       if($scope.proInput) { 
        $scope.newReview.general.pros.push($scope.proInput);
        $scope.proInput = "";
       }
     };

     $scope.addCon = function () {
      if($scope.conInput) { 
        $scope.newReview.general.cons.push($scope.conInput);
        $scope.conInput = "";
      }
     };
     
     $scope.submitReview = function () {
       console.log($scope.newReview);

       if($scope.SubmitReview.$valid && 
            $scope.newReview.general.pros.length > 0 && 
            $scope.newReview.general.cons.length > 0){
         console.log("form valid, submitting...");

         //traverse software until one specified in url is found
          angular.forEach($scope.data, function(key) {
            if(decodeURI(key.meta.fullName) === $stateParams.softwareName) {
              console.log(key.meta.fullName + " started with " + key.reviews.length);

              //push this new review object to this array
              key.reviews.push($scope.newReview);

              //save to firebase
              $scope.data.$save().then(function(res) {
                console.log(key.meta.fullName + " now has " + key.reviews.length);
                $state.go('software', {'softwareName': $stateParams.softwareName}); //redirect page
              }, function(error) {
                console.log("Error: ", error);
              });
            }
          });
       } else {
         alert("Please complete at least the first page of questions.");
       }
    };
}]);

//i shouldn't really use jquery outright 
//but there is no cleaner way to use bootstrap's javascript with angular
function orientTabsAndNavigation() {
  $('.nav-pills li a').click(function(e) {
    e.preventDefault();
    return false;
  });

  $('#next-button-1').click(function(e) {
    e.preventDefault();
    $('a[tab-data="usageTab"]').tab('show');
  });

  $('#next-button-2').click(function(e) {
    e.preventDefault();
    $('a[tab-data="contentTab"]').tab('show');
  });

  $('#next-button-3').click(function(e) {
    e.preventDefault();
    $('a[tab-data="effectivenessTab"]').tab('show');
  });

  $('#next-button-4').click(function(e) {
    e.preventDefault();
    $('a[tab-data="overallTab"]').tab('show');
  });

  $('#back-button-2').click(function(e) {
    e.preventDefault();
    $('a[tab-data="generalTab"]').tab('show');
  });

  $('#back-button-3').click(function(e) {
    e.preventDefault();
    $('a[tab-data="usageTab"]').tab('show');
  });

  $('#back-button-4').click(function(e) {
    e.preventDefault();
    $('a[tab-data="contentTab"]').tab('show');
  });

  $('#back-button-5').click(function(e) {
    e.preventDefault();
    $('a[tab-data="effectivenessTab"]').tab('show');
  });
}