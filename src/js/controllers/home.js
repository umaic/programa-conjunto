'use strict';

angular.module('koboG')
    .controller('HomeCtrl', ['$scope', 'apiService', '$state', function ($scope, apiService, $state) {

        $scope.init = function () {
            $scope.markers = [];
            getData();
            angular.extend($scope, {
                center: {
                    lat: 5.0252334,
                    lng: -66.0789788,
                    zoom: 5
                },
                tiles: {
                    //url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                    //url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
                },
                layers: {
                    baselayers: {
                        hot: {
                            name: 'Humanitarian',
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
            // console.log(item);
            $state.go("surveys", {borough_id: item.id});
        };

        function getData() {
            apiService.api.get('data').then(function (response) {
                $scope.surveys = response.data;
                angular.forEach($scope.surveys, function (value, key) {
                    var found_geoposition = $scope.markers.findIndex(function(m){
                        return (m.lat == value.borough.lat && m.lng == value.borough.lng);
                    });

                    if (found_geoposition == -1) {
                        var mark = {};
                        mark.lat = value.borough.lat;
                        mark.lng = value.borough.lng;
                        mark.id = value.borough_id;
                        mark.message = value.borough.department.name + ' - ' + value.borough.name +
                        "<a style='color:white;' class='label label-info' ui-sref='surveys({borough_id:" 
                        + value.borough_id + "})'>Ver Resultados</a>";
                        mark.title = value.borough.department.name + ' - ' + value.borough.name;
                        mark.icon = {
                            iconUrl: 'images/marker-icon.png',
                                shadowUrl: 'images/marker-shadow.png',
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                                popupAnchor: [1, -34],
                                shadowSize: [41, 41]
                            }
                        $scope.markers.push(mark);
                    }
                });
            });
        }


        $scope.init();
    }]);