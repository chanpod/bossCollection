'use strict';



angular.module("BossCollection.services")
    .factory('siteServices', [function () {
        
        function startLoading(){
            
            $('#loadingModal').openModal({
                dismissible: false
            });
        }
        
        function loadingFinished(){
            $('#loadingModal').closeModal();
        }
        
        return {
            startLoading:startLoading,
            loadingFinished:loadingFinished
        }
    }])