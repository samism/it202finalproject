'use strict';

angular.module('reviewSystemApp')
  .controller('AddSoftwareController', ['$scope', 'FirebaseService', '$state', function ($scope, FirebaseService, $state) {
    $scope.data = FirebaseService.getObject();

    $scope.addSoftware = function() {
        var newSoftware = {
            "meta" : {
                "description" : $scope.softwareDescription,
                "forFaculty" : true,
                "forStudents" : true,
                "fullName" : $scope.softwareName,
                "image" : $scope.softwareImageURL,
                "tags" : $scope.softwareTags.split(','),
                "version" : $scope.softwareVersion
            },
            "reviews" : [{
                "content" : {
                    "avoids_stereotypes" : 0,
                    "content_is_accurate" : 0,
                    "correct_grammar_on_the_screen" : 0,
                    "correct_spelling_on_the_screen" : 0,
                    "graphics_are_age_appropriate" : 0,
                    "has_clear_graphics" : 0,
                    "help_messages_are_easily_comprehended" : 0,
                    "instructions_are_clear" : 0,
                    "motivates_the_student" : 0
                },
                "effectiveness" : {
                    "how_are_the_number_of_examples" : 0,
                    "how_clear_are_the_learning_strategies" : 0,
                    "how_clear_is_the_objective_of_the_software" : 0,
                    "how_clear_is_the_softwares_font_and_font_size" : 0,
                    "how_clear_is_the_softwares_navigation" : 0,
                    "how_customizable_is_the_software" : 0,
                    "how_well_does_the_software_allow_the_student_to_practice" : 0,
                    "how_well_does_the_software_analyze_and_present_the_students_errors" : 0,
                    "how_well_does_the_software_correct_the_students_errors" : 0,
                    "how_well_does_the_software_engage_the_student" : 0,
                    "how_well_does_the_software_monitor_the_students_progress" : 0,
                    "softwares_use_of_visual_auditory_stimuli" : 0
                },
                "general" : {
                    "review" : ""
                },
                "overall" : {
                    "additional_comments" : "",
                    "comments_on_ease_of_use" : "",
                    "comments_on_general_effectiveness" : "",
                    "how_cost_effective_is_the_software" : 0
                },
                "usage" : {
                    "adjusting_the_sound" : 0,
                    "closing_the_program" : 0,
                    "help_screens" : 0,
                    "illogical_input" : 0,
                    "instructions_easily_accessible" : 0,
                    "program_operates_without_crashing" : 0,
                    "repeated_incorrect_responses" : 0,
                    "starting_it_up" : 0,
                    "user_friendly" : 0
                }
            }]
        };

        $scope.data[$scope.softwareName] = newSoftware;
        $scope.data.$save().then(function(res) {
            $state.go('main');
        });
    };

    $scope.removeSoftware = function(softwareName) {
        delete $scope.data[softwareName];
        $scope.data.$save().then(function() {
            console.log(softwareName + " deleted.");
            $state.go('add-software');
        });
    };
}]);