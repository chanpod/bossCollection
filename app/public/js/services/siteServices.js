'use strict';
angular.module("BossCollection.services")
    .factory('siteServices', ['$rootScope', '$mdBottomSheet', '$mdDialog', '$mdToast', '$q',
        function ($rootScope, $mdBottomSheet, $mdDialog, $mdToast, $q) {

            var alreadyLoading = false;
            var isToastOpen = false;
            function startLoading() {

                if (alreadyLoading) {

                }
                else {
                    alreadyLoading = true;
                    showLoadingModal();
                }

            }

            function loadingFinished() {
                hideLoadingModal();
                alreadyLoading = false;
            }

            function updateTitle(newTitle) {

                $rootScope.$broadcast('navbarTitle', newTitle)
            }

            function successfulUpdate() {
                showMessageToast("Success");
            }

            function showLoadingBottomSheet($event) {


                $mdBottomSheet.show({
                    templateUrl: 'logInModal',
                    controller: 'loginController',
                    targetEvent: $event,
                    escapeToClose: false
                })

            }

            function confirmDelete(event, callback) {

                var defer = $q.defer();

                var confirm = $mdDialog.confirm()
                    .title('Are you sure you want to delete this?')
                    .textContent('This is irreversable once you click Yes!')
                    .ariaLabel('Confirm Delete')
                    .targetEvent(event)
                    .ok('Delete')
                    .cancel('Nevermind');

                $mdDialog.show(confirm)
                    .then(function () {

                        defer.resolve(true);
                    }, function (err) {

                        defer.reject(false);
                    })

                return defer.promise;
            }

            function hideLoadingBottomSheet() {

                $mdBottomSheet.hide();
            }

            function hideBottomSheet() {

                $mdBottomSheet.hide();
            }

            function showMessageModal(message, title) { 
                $mdDialog.hide();
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(false)
                        .title(title)
                        .textContent(message)
                        .ariaLabel('message popup')
                        .ok('Got it!')
                        .openFrom({
                            left: -50,
                            width: 30,
                            height: 80
                        })
                        .closeTo({
                            right: 1500
                        })
                );
            }

            function showMessageToast(message) {
                try {
                    
                $mdToast.show($mdToast.simple()
                    .textContent(message)
                    .hideDelay(4000))
                    .action('X')
                }
                catch(err){
                    //Don't care
                }
            }

            function hideLoadingModal() {

                if (alreadyLoading == false) {

                }
                else {
                    alreadyLoading = false;
                    $mdDialog.hide();
                }
            }

            function shouldWeBeLoading() {
                return alreadyLoading;
            }

            function showLoadingModal() {

                $mdDialog.show(
                    {
                        templateUrl: 'loadingModal',
                        onComplete: function () {

                            if (!alreadyLoading) {

                                $mdDialog.hide();
                            }
                        }

                    }
                )
            }

            function handleError(error) {

                let defaultError = "Well, crap. Something broke and we weren't able to determine the error.";
                let message = "";

                if (error.data) {
                    message = error.data.message;
                }
                else if (typeof error === "string") {
                    message = error;
                }
                else {
                    message = error.message;
                }

                if (typeof message === "string") {

                    showMessageModal(message);
                }
                else {
                    message = defaultError;
                    showMessageModal(defaultError);
                }

                return message;
            }

            return {
                startLoading: startLoading,
                loadingFinished: loadingFinished,
                updateTitle: updateTitle,
                showLoadingBottomSheet: showLoadingBottomSheet,
                hideLoadingBottomSheet: hideLoadingBottomSheet,
                showMessageModal: showMessageModal,
                showMessageToast: showMessageToast,
                hideBottomSheet: hideBottomSheet,
                showLoadingModal: showLoadingModal,
                hideLoadingModal: hideLoadingModal,
                confirmDelete: confirmDelete,
                successfulUpdate: successfulUpdate,
                handleError: handleError
            }
        }])