                
    
'use strict';
/**
 *
 */
angular.module("BossCollection.attendance")
    .controller("attendanceStatsCtrl", ["$scope", '$location', 'userLoginSrvc', 'absenceService', 'siteServices', '$filter',
        function($scope, $location, userLoginSrvc, absenceService, siteServices, $filter){
        
        siteServices.updateTitle('Attendance Statistics');    
        $scope.absenceHighchartData = [];
        $scope.absenceHighchartDrillDownSeries = [];
        $scope.getAbsences = function(){
            $scope.currentlySelected = "All absences"
            $scope.loading = true;
            
            absenceService.getAbsences().then(function(result){
                
                $scope.loading = false;
                $scope.absences = result.absences; 
                $scope.calculateAttendance();
            }, 
            function(err){
                siteServices.showMessageToast(err) 
                $scope.loading = false;
                console.log(err);  
            })
        }
        
        /**
         * 
         * 12
         * 12 * 4 = 48
         * 
         */
        $scope.calculateAttendance = function(){
            
            var late = 3;
            var absent = 1;
            var weeksCounted = 4;
            var raidsPerWeek = 3;
            
            var totalPoints = weeksCounted * raidsPerWeek;
            
            var lateTypesCount;
            var listOfUsers = _.groupBy($scope.absences, "user");
            
            _(listOfUsers).forEach(function(user) {
                
                var absentTypes = _.groupBy(user, "type");
                var lateCount = 0;
                var absentCount = 0;
                
                if(absentTypes.late){
                    lateCount = absentTypes.late.length || 0;    
                }
                if(absentTypes.absent){
                    absentCount = absentTypes.absent.length || 0;
                }
                    
                
                
                var totalAttendancePoints = (weeksCounted * raidsPerWeek) * (late + absent); 
                var attendanceRating =  totalAttendancePoints - (lateCount * late) - (absentCount * absent);
                var percentAttendanceRating = attendanceRating / totalAttendancePoints;
                
                $scope.absenceHighchartData.push({ 
                    name: user[0].user,
                    y: percentAttendanceRating * 100,
                    drilldown: user[0].user
                })
                
                var drillDownData = []
                
                _(absentTypes.late).forEach(function(lateObject){
                    
                    drillDownData.push([
                        lateObject.date,
                        late
                    ])
                }) 
                    
                _(absentTypes.absent).forEach(function(absentObject){
                    
                    drillDownData.push([
                        absentObject.date,
                        absent
                    ])
                })  
                
                
                
                /*
                {
                name: 'Microsoft Internet Explorer',
                id: 'Microsoft Internet Explorer',
                data: [
                    
                    [
                        'v11.0',
                        24.13
                    ]
                   
                ]
                 */
            
                
                $scope.absenceHighchartDrillDownSeries.push({
                    name: user[0].user,
                    id: user[0].user,
                    data: drillDownData
                })
                
            }, this);
            
            $scope.buildHighChart();
        }
        
        $scope.getAbsences();
        
        $scope.buildHighChart = function () {
            
            $('#container').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Member attendance rates'
                },
                subtitle: {
                    text: 'Click the columns to view dates missed.'
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: 'Percent attendance'
                    }

                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.1f}%'
                        }
                    }
                },
                series: [{
                    name: "Member",
                    colorByPoint: true,
                    data: $scope.absenceHighchartData
                }],

                drilldown: {
                    series: $scope.absenceHighchartDrillDownSeries

                }

            });
        }
        
        
        
        
        
        
        
        
        
        
        
 
    }])


/*
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Microsoft Internet Explorer',
                y: 56.33,
                drilldown: 'Microsoft Internet Explorer'
            }, {
                name: 'Chrome',
                y: 24.03,
                drilldown: 'Chrome'
            }, {
                name: 'Firefox',
                y: 10.38,
                drilldown: 'Firefox'
            }, {
                name: 'Safari',
                y: 4.77,
                drilldown: 'Safari'
            }, {
                name: 'Opera',
                y: 0.91,
                drilldown: 'Opera'
            }, {
                name: 'Proprietary or Undetectable',
                y: 0.2,
                drilldown: null
            }]
        }],
        */
        
                    /*
            [{
                name: 'Microsoft Internet Explorer',
                id: 'Microsoft Internet Explorer',
                data: [
                    [
                        'v11.0',
                        24.13
                    ],
                    [
                        'v8.0',
                        17.2
                    ],
                    [
                        'v9.0',
                        8.11
                    ],
                    [
                        'v10.0',
                        5.33
                    ],
                    [
                        'v6.0',
                        1.06
                    ],
                    [
                        'v7.0',
                        0.5
                    ]
                ]
            }, {
                name: 'Chrome',
                id: 'Chrome',
                data: [
                    [
                        'v40.0',
                        5
                    ],
                    [
                        'v41.0',
                        4.32
                    ],
                    [
                        'v42.0',
                        3.68
                    ],
                    [
                        'v39.0',
                        2.96
                    ],
                    [
                        'v36.0',
                        2.53
                    ],
                    [
                        'v43.0',
                        1.45
                    ],
                    [
                        'v31.0',
                        1.24
                    ],
                    [
                        'v35.0',
                        0.85
                    ],
                    [
                        'v38.0',
                        0.6
                    ],
                    [
                        'v32.0',
                        0.55
                    ],
                    [
                        'v37.0',
                        0.38
                    ],
                    [
                        'v33.0',
                        0.19
                    ],
                    [
                        'v34.0',
                        0.14
                    ],
                    [
                        'v30.0',
                        0.14
                    ]
                ]
            }, {
                name: 'Firefox',
                id: 'Firefox',
                data: [
                    [
                        'v35',
                        2.76
                    ],
                    [
                        'v36',
                        2.32
                    ],
                    [
                        'v37',
                        2.31
                    ],
                    [
                        'v34',
                        1.27
                    ],
                    [
                        'v38',
                        1.02
                    ],
                    [
                        'v31',
                        0.33
                    ],
                    [
                        'v33',
                        0.22
                    ],
                    [
                        'v32',
                        0.15
                    ]
                ]
            }, {
                name: 'Safari',
                id: 'Safari',
                data: [
                    [
                        'v8.0',
                        2.56
                    ],
                    [
                        'v7.1',
                        0.77
                    ],
                    [
                        'v5.1',
                        0.42
                    ],
                    [
                        'v5.0',
                        0.3
                    ],
                    [
                        'v6.1',
                        0.29
                    ],
                    [
                        'v7.0',
                        0.26
                    ],
                    [
                        'v6.2',
                        0.17
                    ]
                ]
            }, {
                name: 'Opera',
                id: 'Opera',
                data: [
                    [
                        'v12.x',
                        0.34
                    ],
                    [
                        'v28',
                        0.24
                    ],
                    [
                        'v27',
                        0.17
                    ],
                    [
                        'v29',
                        0.16
                    ]
                ]
            }]
            */