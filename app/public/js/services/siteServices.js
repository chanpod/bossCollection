'use strict';



angular.module("BossCollection.services")
    .factory('siteServices', ['$rootScope', '$mdBottomSheet', '$mdDialog', '$mdToast',
    function ($rootScope, $mdBottomSheet, $mdDialog, $mdToast) {
        
        var alreadyLoading = false;
        
        function startLoading(){
            
            if(alreadyLoading){
                
            }
            else{
                alreadyLoading = true;
                showLoadingModal();    
            }
            
        }
        
        function loadingFinished(){
            hideLoadingModal();
            alreadyLoading = false;
        }
        
        function updateTitle(newTitle){
            
            $rootScope.$broadcast('navbarTitle', newTitle)
        }
        
        function showLoadingBottomSheet($event){
            

                $mdBottomSheet.show({
                    templateUrl: 'logInModal',
                    controller: 'loginController',
                    targetEvent: $event,
                    escapeToClose: false
                })
            
        }
        
        function hideLoadingBottomSheet(){
            
            $mdBottomSheet.hide();
        }
        
        function hideBottomSheet(){
            
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
        
        function hideLoadingModal(){
            
            if(alreadyLoading == false){
                
            }
            else{
                alreadyLoading = false;
                $mdDialog.hide();
            }
        }
        
        function shouldWeBeLoading(){
            return alreadyLoading;
        }
        
        function showLoadingModal(){
            
            $mdDialog.show(
                {
                    templateUrl: 'loadingModal',
                    onComplete: function(){
                        
                        if(!alreadyLoading){
                            
                            $mdDialog.hide();
                        }
                    }           
                    
                }
            )
        }
        
        return {
            startLoading:startLoading,
            loadingFinished:loadingFinished,
            updateTitle:updateTitle,
            showLoadingBottomSheet:showLoadingBottomSheet,
            hideLoadingBottomSheet:hideLoadingBottomSheet,
            showMessageModal:showMessageModal,
            showMessageToast:showMessageToast,
            hideBottomSheet:hideBottomSheet,
            showLoadingModal:showLoadingModal,
            hideLoadingModal:hideLoadingModal
        }
    }])