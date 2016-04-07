
angular.module("BossCollection.guild")
    .directive('listGuildMembers', ['guildServices', '$filter', '$mdUtil', function(guildServices,$filter, $mdUtil){
        return {
            restrict : 'E',
            scope: {
                guild: "=guild",
                selectedMember: "=selectedMember"
            },
            link: function($scope){
                
                $scope.userSelected = function(){
                    //Don't care?   
                }
                
                $scope.getGuildUsers = function() {

                    $scope.loading = true;
                    console.log($scope.guild);
                    
                    guildServices.getGuildMembers($scope.guild)
                        .then(function(users) {

                            $scope.users = users;                            
                        })
                        .finally(function() {

                            $scope.loading = false;
                        })
                }
                
                $scope.filterSearch = function (filterSearch) {

                    return $filter('filter')($scope.users, filterSearch);
                }
                
                $scope.getGuildUsers();
            },
            templateUrl: 'listGuildMembersTemplate'
        }
    }])