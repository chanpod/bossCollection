'use strict';



angular.module("BossCollection.services")
    .factory('pushNotificationsService', ['$rootScope', '$mdBottomSheet', '$mdDialog', '$mdToast', '$q', '$resource',
    function ($rootScope, $mdBottomSheet, $mdDialog, $mdToast, $q, $resource) {
        /**
       var API_KEY = "AIzaSyCsOC0YDE2dKWwp20f4SiHlh_KI-2uJ-P8";
       var BASE_GOOGLE_URL = "https://android.googleapis.com/gcm/send";
       var subscription;
       var serverPushUrl = $resource('/pushNotification');
       
        function sendPush(){
            
            var subscripotionId = getSubscriptionId();
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            
            var bodyData = {subId: subscripotionId}
            
            serverPushUrl.save(bodyData).$promise
                .then(function(response) {
                    
                    console.log("What did we get?");
                    console.log(response);
                })
                .catch(function(err){
                    console.log(err);
                })
            
        }
        
        function loadSubscription(){
            
            navigator.serviceWorker.ready
                .then(function(serviceWorker){
                    return serviceWorker.pushManager.getSubscription();
                })
                .then(function(subscriptionLoaded){
                    
                    subscription = subscriptionLoaded.endpoint;
                    console.log(subscription);
                })
        }
        
        function subscribe(){
            
            if ('serviceWorker' in navigator) {
                console.log('Service Worker is supported');
                navigator.serviceWorker.register('sw.js').then(function(reg) {
                    console.log(':^)', reg);
                    reg.pushManager.subscribe({
                        userVisibleOnly: true
                    }).then(function(sub) {
                        console.log('endpoint:', sub.endpoint);                        
                    });
                }).catch(function(error) {
                    console.log(':^(', error);
                });
            }
            else{
                
                alert("You browser doesn't support push notifications. Please use a modern browser");
            }
        }
        
        function unsubscribe(){
            navigator.serviceWorker.ready
                .then(function(serviceWorker){
                    return serviceWorker.pushManager.getSubscription();
                })
                .then(function(subscription){
                    
                    return subscription.unsubscribe();
                })
                .then(function(success){
                    
                    if(success){
                        
                    }
                })
        }
        
        var getSubscriptionId = function() {            
            
            var endpointSections = subscription.split('/');
            var subscriptionId = endpointSections[endpointSections.length - 1];            
            
            return subscriptionId;
        };
        
        //loadSubscription();
        
        return {            
            subscribe:subscribe,
            unsubscribe:unsubscribe,
            loadSubscription:loadSubscription,
            sendPush:sendPush
    
        }
         */
    }])