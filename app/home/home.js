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
                    lat: 7.0780151,
                    lng: -73.1163446,
                    zoom: 10
                },
                tiles: {
                    //url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                    //url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
                },
                layers: {
                    baselayers: {
                        hot: {
                            name: 'Humanitariam',
                            url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
                            type: 'xyz'
                        },
                        osm: {
                            name: 'OpenStreetMap',
                            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            type: 'xyz'
                        },
                        rm: {
                            name: 'Relief Map',
                            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                            type: 'xyz'
                        },                        
                    }
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