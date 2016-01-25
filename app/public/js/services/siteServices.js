'use strict';



angular.module("BossCollection.services")
    .factory('siteServices', ['$rootScope', '$mdBottomSheet', 
    function ($rootScope, $mdBottomSheet) {
        
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
        
        return {
            startLoading:startLoading,
            loadingFinished:loadingFinished,
            updateTitle:updateTitle,
            showLoadingBottomSheet:showLoadingBottomSheet,
            hideLoadingBottomSheet:hideLoadingBottomSheet
        }
    }])