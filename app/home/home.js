'use strict';

angular.module('koboG')
    .config(function ($stateProvider) {
        $stateProvider.state({
            name: 'home',
            url: '/',
            controller: 'HomeCtrl',
            templateUrl: 'home/home.html'
        });
    })

    .controller('HomeCtrl', function ($scope, apiService, $state) {

        $scope.init = function () {
            $scope.markers = [];
            getData();
            angular.extend($scope, {
                center: {
                    lat: 6.33236022397594,
                    lng: -75.55709838867188,
                    zoom: 7
                },
                position: {
                    lat: 51,
                    lng: 0
                }
            });
        };

        $scope.selectedMarker = function (item, model, label, event) {
            //console.log(item);
            $state.go("surveys", {id: item.id});
        };

        function getData() {
            apiService.api.get('data').then(function (response) {
                $scope.surveys = response.data;
                angular.forEach($scope.surveys, function (value, key) {
                    var mark = {};
                    mark.lat = value.borough.lat;
                    mark.lng = value.borough.lng;
                    mark.id = value.id;
                    mark.message = value.borough.department.name + ' - ' + value.borough.name + '/ ' + value.starting_date + " <a style='color:white;' class='label label-info' ui-sref='surveys({id:" + value.id + "})'>Ver Resultados</a>";
                    mark.title = value.borough.department.name + ' - ' + value.borough.name + '/ ' + value.starting_date;
                    $scope.markers.push(mark);
                });
            });
        }


        $scope.init();
    });