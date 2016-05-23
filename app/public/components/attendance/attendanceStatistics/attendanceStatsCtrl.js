                
    
'use strict';
/**
 *
 */
angular.module("BossCollection.attendance")
    .controller("attendanceStatsCtrl", ["$scope", '$location', 'userLoginSrvc', 'absenceService', '$mdDialog', '$mdMedia','siteServices', '$filter',
        function($scope, $location, userLoginSrvc, absenceService, $mdDialog, $mdMedia, siteServices, $filter){
        
        siteServices.updateTitle('Attendance Portal');    
        $scope.absenceHighchartData = [];
        $scope.absenceHighchartDrillDownSeries = [];
        
        
        $scope.late = 1;
        $scope.absent = 6;
        $scope.weeksCounted = 4;
        $scope.raidsPerWeek = 3;
        $scope.startingDate = new Date();
        
        $scope.init = function(){
            
            $scope.getAbsences();
            $scope.buildHighChart();
        }
        
        $scope.openReportModal = function(){
            
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            
            $mdDialog.show({
                controller: "absenceReportController as reportAbsenceCtrl",
                templateUrl: 'absence',                
                clickOutsideToClose: false,
                fullscreen: useFullScreen
            })
        }
           
        $scope.getAbsences = function () {
            
            $scope.currentlySelected = "All absences"
            $scope.loading = true;
            
            var absenceHistory = {
                date:$scope.startingDate, 
                weeks:$scope.weeksCounted
            }
            
            absenceService.getAbsenceHistory(absenceHistory).then(function (result) {

                $scope.loading = false;
                $scope.absences = result.absences;
                $scope.calculateAttendance();

            },
                function (err) {
                    siteServices.showMessageModal(err.data)
                    $scope.loading = false;
                    console.log(err);
                })
        }
        
        /** 
         * 
         * 
         * 
         */
        $scope.calculateAttendance = function(){
            
            //get an object of unique users in the absence list
            var listOfUsers = _.groupBy($scope.absences, "user");
            $scope.absenceHighchartData = [];
            $scope.absenceHighchartDrillDownSeries = [];
            
            _(listOfUsers).forEach(function(user) {
                
                //group the users absences by type
                var absentTypes = _.groupBy(user, "type");
                var lateCount = 0;
                var absentCount = 0;
                
                //Get the number of each type
                if(absentTypes.late){
                    lateCount = absentTypes.late.length || 0;    
                }
                if(absentTypes.absent){
                    absentCount = absentTypes.absent.length || 0;
                }
                    
                
                //Calculate total value based on weights and number of days.
                var totalAttendancePoints = ($scope.weeksCounted * $scope.raidsPerWeek) * $scope.absent;
                
                var lateWeight = $scope.late/$scope.absent * $scope.absent;
                //Get flat value by subtracting the total value minus the weighted values times the number of times they've occured a particular type. 
                var attendanceRating =  totalAttendancePoints - (lateCount * lateWeight) - (absentCount * $scope.absent);
                //Divide to get the %
                var percentAttendanceRating = attendanceRating / totalAttendancePoints;
                
                //Build the initial highchart object.
                $scope.absenceHighchartData.push({ 
                    name: user[0].user,
                    y: percentAttendanceRating * 100,
                    drilldown: user[0].user
                })
                
                var drillDownData = []
                
                //build the drilldown data.
                _(absentTypes.late).forEach(function(lateObject){
                    
                    drillDownData.push([
                        lateObject.date,
                        $scope.late
                    ])
                }) 
                    
                _(absentTypes.absent).forEach(function(absentObject){
                    
                    drillDownData.push([
                        absentObject.date,
                        $scope.absent
                    ]) 
                })  
                
                
                
                $scope.absenceHighchartDrillDownSeries.push({
                    name: user[0].user,
                    id: user[0].user,
                    data: drillDownData
                })
                
            }, this);
            
            $scope.buildHighChart();
        }
        
        $scope.redrawChart = function(seriesData, drilldownData){
            
            $scope.chart.series[0].setData([{
                    name: "Member",
                    colorByPoint: true,
                    data: $scope.absenceHighchartData
                }])
            
            $scope.chart.drilldown.setData({
                    series: $scope.absenceHighchartDrillDownSeries
                })
        }
        
        
        $scope.buildHighChart = function () {
            
            $scope.chart = new Highcharts.Chart({
                chart: {
                    type: 'column',
                    renderTo: 'container'
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
        
        
        
        
        $scope.init();
 
    }])


