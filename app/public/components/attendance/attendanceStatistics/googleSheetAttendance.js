

'use strict';
/**
 *
 */
angular.module("BossCollection.attendance")
    .controller("googleSheetsAttendance", ["$scope", '$location', 'userLoginSrvc', 'absenceService', '$mdDialog', '$mdMedia', 'siteServices', '$filter', 'sheetsService', '$timeout',
        function ($scope, $location, userLoginSrvc, absenceService, $mdDialog, $mdMedia, siteServices, $filter, sheetsService, $timeout) {

            $scope.CLIENT_ID = "1099140712491-esphn576cqr56kiqvsqi4kjd683jc9fm.apps.googleusercontent.com";
            $scope.DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
            $scope.SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

            $scope.sheetId = "";
            $scope.sheetUrl = "";

            $scope.sheetNames = [];
            $scope.sheetName = "OldSheet";
            $scope.startCell = "A2";
            $scope.endColumn = "B";

            $scope.headerSheetName = "";
            $scope.headerStartCell = "A1";
            $scope.headerEndColumn = "B";

            $scope.loading = true;
            $scope.errorMessage = "Oops. Something went wrong. Did you spell the name of the sheet correctly? And does data exist in the range you specified?"
            $scope.gapiObject;

            $scope.init = () => {

                if (sheetsService.getInitializing() == true) {


                    $timeout(() => {
                        $scope.init();
                    }, 500)

                }
                else {

                    $scope.loading = false;
                    $scope.signedIn = sheetsService.isSignedIn();

                    if ($scope.signedIn == false) {
                        $scope.gapiObject = sheetsService.getApiObject();
                        $scope.gapiObject.auth2.getAuthInstance().isSignedIn.listen($scope.userAuthorizedApp());                        
                    }
                    else{
                        $scope.sheetUrl = localStorage.getItem('sheetName');
                        if($scope.sheetUrl == null){
                            $scope.sheetUrl = '';
                        }
                        else{
                            $scope.getSheetNames();
                        }
                    }
                }
            }

            $scope.userAuthorizedApp = () => {
                if (sheetsService.isSignedIn() == true) {
                    $scope.init();
                }
            }

            $scope.getSheetNames = () => {

                $scope.sheetNames = [];
                $scope.sheets = [];
                $scope.sheetId = parseSheetId($scope.sheetUrl);
                $scope.loading = true;

                localStorage.setItem('sheetName', $scope.sheetUrl);

                sheetsService.getSheets($scope.sheetId)
                    .then(function (result) {
                        $scope.loading = false;
                        $scope.sheets = result.result.sheets;

                        _.forEach($scope.sheets, function (sheet) {
                            $scope.sheetNames.push(sheet.properties.title);
                        }, this);
                    }, function(error){
                        $scope.loading = false;
                    })

            }

            function parseSheetId(sheetUrl) {
                //https://docs.google.com/spreadsheets/d/1m2uEpQjpmxX4g7iHO5NSITAl8rH1Z7EH3v0NA6OCSK8/edit#gid=1805832991
                let splitString = sheetUrl.split('/');
                let sheetId = '';

                _.forEach(splitString, (string, index) => {
                    if(string == 'd'){
                        sheetId = splitString[index + 1];
                    }
                })

                if (sheetUrl == '' || sheetUrl == undefined) {
                    return '1oPSfalySLEKWQT8OCjLb-Vxdfo-6aNImY_HhrQ7vTRs';
                }
                else {

                    return sheetId;
                }
            }

            /**
             *  Sign in the user upon button click.
             */
            $scope.handleAuthClick = (event) => {
                if (sheetsService.isSignedIn() == false) {

                    sheetsService.signIn()
                        .then((result) => {
                            if (result) {

                                $scope.init();
                            }
                        })
                }
                else {
                    $scope.signedIn = true;
                }
            }

            /**
             *  Sign out the user upon button click.
             */
            $scope.handleSignoutClick = (event) => {

                sheetsService.signOut()
                    .then((result) => {
                        if (result) {

                            $scope.init();
                        }
                    })
            }

            /**
             * Print the names and majors of students in a sample spreadsheet:
             * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
             */
            $scope.getSheetTableData = (sheetName) => {
                $scope.loading = true;
                $scope.error = false;
                $scope.sheetData = [];
                $scope.sheetHeaders = [];
                $scope.sheetName = sheetName;
                
                let range = sheetName + "!" + $scope.startCell + ':' + $scope.endColumn;

                $scope.getTableHeaders(sheetName);
                $scope.getSheetData($scope.sheetId, range, handleTableData);
            }

            $scope.getTableHeaders = (sheetName) => {
                $scope.loading = true;

                let headerSheetName = sheetName;
                let range = headerSheetName.trim() + "!" + $scope.headerStartCell + ':' + $scope.headerEndColumn;

                $scope.getSheetData(headerSheetName, range, handleHeaders);
            }

            function handleTableData(response) {

                $scope.sheetData = response.result;
                $scope.loading = false;
            }

            function handleHeaders(response) {

                $scope.sheetHeaders = response.result;
                $scope.loading = false;
            }

            $scope.getSheetData = (sheetId, range, callback) => {

                sheetsService.getSheetData($scope.sheetId, range)
                    .then(callback,
                    function (response) {

                        console.log(response);
                        $scope.error = true;
                        $scope.loading = false;
                    });
            }

            // function createDD() {
            //     var ss = SpreadsheetApp.getActiveSpreadsheet('http://docs.google.com/spreadsheets/d/1xfb9trifQA5KDPc9Nh5hBL4MJ290Mxcc1Uod2VTPzYI');
            //     var s = ss.getActiveSheet('States');
            //     var vals = s.getDataRange().getValues().map(function (x) { return x[0]; });//returns an array of the values in column A
            //     var rule = SpreadsheetApp.newDataValidation().requireValueInList(vals);//builds a rule for data validation using those values
            //     s.getRange(1, 2).setDataValidation(rule);//assigns that rule to cell B1 (row 1, column 2)
            // }



            $scope.init();

        }])


