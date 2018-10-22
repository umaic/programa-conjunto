(function () {
    angular.module('koboG.services', [])
        .factory("apiService", ['$http', '$q', 'API_URL', function ($http, $q, API_URL) {
            var api = {};

            api.get = function (url) {
                var deferred = $q.defer();
                $http({
                    url: API_URL + url,
                    method: 'GET',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            };

            return {
                api: api
            };
        }])

        .factory("graphService", function () {

            function getOptions(question, utilities){
                var options = {
                    showAllTooltips: false,
                };
                options.tooltips = {
                    intersect:true,
                }
                if (utilities.txt || utilities.number || utilities.pie) {                  
                    options.title = {
                        display : true,
                        text : question.text.text,
                        fontSize : 15,
                        padding: 0,
                    };
                    options.legend = {
                        display : true,
                    }
                }else if(utilities.weighted) {
                    options.title = {
                        display : true,
                        text : question.text.text,
                        fontSize : 20
                    };
                    options.legend = {
                        display : false,
                    }
                    options.scale = {
                        ticks: {
                            beginAtZero: true,
                            max: 10
                        }
                    }
                }else{
                    options.legend = {
                        display : false,
                    }
                    options.title = {
                        display : true,
                        text : question.text.text,
                        fontSize : 20
                    };                    
                }
                
                
                return options;
            }

            function sortChart (data, labels){
               var list = [];
               if (Array.isArray(data[0])) {
                    for (var j = 0; j < data[0].length; j++){
                        list.push({'label': labels[j], 'val': data[0][j]});
                    }
               }else{
                    for (var j = 0; j < data.length; j++){
                        list.push({'label': labels[j], 'val': data[j]});
                    }
               }     
                    
                list.sort(function(a, b) {
                  return b.val-a.val;
                });

                return list;
            }

            return {
                sort: sortChart,
                options: getOptions
            };
        });
})();

