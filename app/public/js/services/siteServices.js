'use strict';



angular.module("BossCollection.services")
    .factory('siteServices', ['$rootScope', '$mdBottomSheet', '$mdDialog', '$mdToast',
    function ($rootScope, $mdBottomSheet, $mdDialog, $mdToast) {
        
        function startLoading(){
            
            $('#loadingModal').openModal({
                dismissible: false
            });
        }
        
        function loadingFinished(){
            $('#loadingModal').closeModal();
        }
        
        function updateTitle(newTitle){
            
            $rootScope.$broadcast('navbarTitle', newTitle)
        }
        
        function showLoadingBottomSheet($event){
            

                $mdBottomSheet.show({
                    templateUrl: 'logInModal',
                    controller: 'loginController',
                    targetEvent: $event
                })
            
        }
        
        function hideLoadingBottomSheet(){
            
            $mdBottomSheet.hide();
        }
        
        function showMessageModal(message, title){
            $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
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
        
        function showMessageToast(message){
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position("top")
                    .hideDelay(4000)
                );
        }
        
        return {
            startLoading:startLoading,
            loadingFinished:loadingFinished,
            updateTitle:updateTitle,
            showLoadingBottomSheet:showLoadingBottomSheet,
            hideLoadingBottomSheet:hideLoadingBottomSheet,
            showMessageModal:showMessageModal,
            showMessageToast:showMessageToast
        }
    }])