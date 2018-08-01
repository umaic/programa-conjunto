'use strict';

// Declare app level module which depends on views, and components
angular.module('koboG', [
    'ui.router',
    'koboG.constants',
    'koboG.services',
    'ui.bootstrap',
    'chart.js',
    'leaflet-directive',
    'ngAnimate',
]).config(function ($locationProvider, $urlRouterProvider, $logProvider, ChartJsProvider) {
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/');
    $logProvider.debugEnabled(false);
});
