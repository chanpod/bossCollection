angular.module("BossCollection.forums")
    .controller('forumController', [
        '$scope', '$location', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog',
        function ($scope, $location, siteServices, forumService, $mdBottomSheet, $mdDialog) {

            console.log("Forum Controller loaded");
            siteServices.updateTitle('Forums');
            $scope.testListCount = [];

            for (var i = 0; i < 5; i++) {
                $scope.testListCount.push(i);
            }


            $scope.markdown = "";

            $scope.newCategory = function () {

                $scope.category = {};
                openBottomSheet('category');
            }

            $scope.editCategory = function (category) {

                //$scope.category = category;
                $scope.category = {name: "Test"};
                openBottomSheet('category');
            } 

            $scope.deleteCategory = function (category) {

                $mdDialog.show(confirmDelete())
                    .then(function(result){
                        console.log("You deleted it.");
                        //forumService.deleteCategory(category);
                    },
                    function(){
                        $scope.cancel();
                    })
            }
            
            $scope.createForum = function () {
                
                $mdDialog.show({
                    templateUrl: 'forumEdit',
                    scope: $scope,
                    parent: angular.element(document.body),
                    clickOutsideToClose: false
                })
                    .then(function(){
                        console.log("successfully closed");
                    },
                    function(){
                        console.log("It broke?");
                    })
                
                //openBottomSheet('forumEdit');
            }

            $scope.cancel = function () {
                $mdDialog.hide();
            }

            $scope.goToForum = function (forum) {

                forumService.setForum(forum);
                $location.url('/forum/' + forum.name)
            }


            function confirmDelete(event) {

                return $mdDialog.confirm()
                    .title('Are you sure you want to delete this?')
                    .textContent('This is irreversable once you click Yes!')
                    .ariaLabel('Confirm Delete')
                    .targetEvent(event)
                    .ok('Delete')
                    .cancel('Nevermind');
            }


            function openBottomSheet(template) {

                $mdDialog.show({
                    templateUrl: template,
                    scope: $scope,
                    parent: angular.element(document.body),
                    clickOutsideToClose: false
                })
                    .then(function(){
                        console.log("successfully closed");
                    },
                    function(){
                        console.log("It broke?");
                    })
            }
        }]) 