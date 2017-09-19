'use strict';
angular.module("BossCollection.services")
    .factory('sheetsService', ['$rootScope', '$mdBottomSheet', '$mdDialog', '$mdToast', '$q',
        function ($rootScope, $mdBottomSheet, $mdDialog, $mdToast, $q) {

            let CLIENT_ID = "1099140712491-esphn576cqr56kiqvsqi4kjd683jc9fm.apps.googleusercontent.com";
            let DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
            let SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

            let signedIn = false;
            var initializing = true;

            function initClient() {
                console.log("Loading Sheets Service...");
                gapi.client.init({
                    discoveryDocs: DISCOVERY_DOCS,
                    clientId: CLIENT_ID,
                    scope: SCOPES
                }).then(function (result) {
                    
                    // Listen for sign-in state changes.
                    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

                    // Handle the initial sign-in state.
                    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                    updateInitializing(false);

                    console.log("Sheets Initialized");
                }, (error) => {
                    console.log(error);
                });
            }

            function updateInitializing(newValue) {
                initializing = newValue;
            }

            function updateOnSignIn(callback){
                gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
            }

            function getInitializing() {
                return initializing
            }

            function getApiObject(){
                return gapi;
            }

            function getSheets(sheetId) {

                let defer = $q.defer();

                gapi.client.sheets.spreadsheets.get({
                    spreadsheetId: sheetId
                })
                    .then(function (result) {

                        defer.resolve(result);                        
                    })

                return defer.promise;
            }

            function getSheetData(sheetId, range) {

                let defer = $q.defer();

                gapi.client.sheets.spreadsheets.values.get({
                    spreadsheetId: sheetId,
                    range: range,
                }).then((response) => {
                    defer.resolve(response);
                },
                    function (error) {

                        defer.reject(error);
                    });

                return defer.promise;
            }

            function signIn() {
                let defer = $q.defer();

                gapi.auth2.getAuthInstance().signIn()
                    .then(()=>{
                        defer.resolve(true);
                    })

                return defer.promise;
            }

            function signOut() {
                let defer = $q.defer();
                gapi.auth2.getAuthInstance().signOut()
                    .then(()=>{
                        defer.resolve(true);
                    })

                return defer.promise;
            }

            function updateSigninStatus(isSignedIn) {
                
                if (isSignedIn) {
                    signedIn = true;

                } else {
                    signedIn = false;
                }
            }

            function isSignedIn() {
                return signedIn;
            }

            gapi.load('client:auth2', initClient);

            return {
                getInitializing: getInitializing, //Not a function
                isSignedIn: isSignedIn,
                signIn: signIn,
                signOut: signOut,
                getSheetData: getSheetData,
                getSheets:getSheets,
                getApiObject:getApiObject
            }

        }]);