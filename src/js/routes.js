'use strict';

/**
 * Route configuration for the koboG module.
 */
angular.module('koboG').config(['$stateProvider', '$urlRouterProvider', '$logProvider',
    function($stateProvider, $urlRouterProvider, $logProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/map');
        $logProvider.debugEnabled(false);

        // Application routes
        $stateProvider
            .state('map', {
                url: '/map',
                templateUrl: 'templates/map.html',
                controller: 'HomeCtrl'
            })
            .state('surveys', {
                url: '/surveys/:borough_id/:survey_id',
                templateUrl: 'templates/surveys.html',
                controller: 'SurveysCtrl'
            });
    }
]);