

'use strict';
/**
 *
 */
angular.module("BossCollection.attendance")
    .controller("googleSheetsAttendance", ["$scope", '$location', 'userLoginSrvc', 'absenceService', '$mdDialog', '$mdMedia', 'siteServices', '$filter', '$anchorScroll',
        function ($scope, $location, userLoginSrvc, absenceService, $mdDialog, $mdMedia, siteServices, $filter, $anchorScroll) {

            $scope.CLIENT_ID = "1099140712491-esphn576cqr56kiqvsqi4kjd683jc9fm.apps.googleusercontent.com";
            $scope.DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
            $scope.SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

            $scope.sheetId = "";
            $scope.sheetName = "OldSheet";
            $scope.startCell = "A2";
            $scope.endColumn = "B";

            $scope.headerSheetName = "";
            $scope.headerStartCell = "A1";
            $scope.headerEndColumn = "B";

            $scope.init = () => {
                $scope.loading = true;

                gapi.load('client:auth2', $scope.initClient);

            }

            $scope.initClient = () => {
                gapi.client.init({
                    discoveryDocs: $scope.DISCOVERY_DOCS,
                    clientId: $scope.CLIENT_ID,
                    scope: $scope.SCOPES
                }).then(function () {
                    // Listen for sign-in state changes.
                    gapi.auth2.getAuthInstance().isSignedIn.listen($scope.updateSigninStatus);

                    // Handle the initial sign-in state.
                    $scope.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                    $scope.loading = false;
                    // authorizeButton.onclick = handleAuthClick;
                    // signoutButton.onclick = handleSignoutClick;
                });
            }

            /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
            $scope.updateSigninStatus = (isSignedIn) => {
                if (isSignedIn) {
                    $scope.signedIn = true;
                    //listMajors();
                    $scope.$digest();
                } else {
                    $scope.signedIn = false;
                }
            }

            /**
             *  Sign in the user upon button click.
             */
            $scope.handleAuthClick = (event) => {
                gapi.auth2.getAuthInstance().signIn();
            }

            /**
             *  Sign out the user upon button click.
             */
            $scope.handleSignoutClick = (event) => {
                gapi.auth2.getAuthInstance().signOut();
            }

            /**
             * Append a pre element to the body containing the given message
             * as its text node. Used to display the results of the API call.
             *
             * @param {string} message Text to be placed in pre element.
             */
            function appendPre(message) {
                var pre = document.getElementById('content');
                var textContent = document.createTextNode(message + '\n');
                pre.appendChild(textContent);
            }
 
            /**
             * Print the names and majors of students in a sample spreadsheet:
             * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
             */
            $scope.getSheetTableData = () => {
                $scope.loading = true;
                let range = $scope.sheetName.trim() + "!" + $scope.startCell + ':' + $scope.endColumn;

                $scope.getTableHeaders(); 
                $scope.getSheetData($scope.sheetId, range, handleTableData);
            }

            $scope.getTableHeaders = () => {
                $scope.loading = true;

                let headerSheetName = $scope.headerSheetName || $scope.sheetName;
                let range = headerSheetName.trim() + "!" + $scope.headerStartCell + ':' + $scope.headerEndColumn;

                $scope.getSheetData(headerSheetName, range, handleHeaders);
            }

            function handleTableData(response) {
                console.log(response);

                $scope.sheetData = response.result;
                $scope.$digest();
            }

            function handleHeaders(response) {
                console.log(response);

                $scope.sheetHeaders = response.result;
                $scope.$digest();
            }

            $scope.getSheetData = (sheetId, range, callback) => {

                console.log(range);

                // function (response) {
                //     console.log(response);
                //     $scope.loading = false;
                //     $scope.sheetData = response.result;
                //     $scope.$digest();

                // },

                gapi.client.sheets.spreadsheets.values.get({
                    spreadsheetId: $scope.sheetId || '1oPSfalySLEKWQT8OCjLb-Vxdfo-6aNImY_HhrQ7vTRs',
                    range: range,
                }).then(callback,
                    function (response) {
                        // appendPre('Error: ' + response.result.error.message);
                        console.log(response);
                        $scope.error = true;
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


