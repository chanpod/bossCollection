
angular.module("BossCollection.guild")
    .directive('listGuildMembers', ['guildServices', '$filter', '$mdUtil', 'siteServices', function (guildServices, $filter, $mdUtil, siteServices) {
        return {
            restrict: 'E',
            scope: {
                guild: "=guild",
                selectedMember: "=selectedMember"
                
            },
            link: function ($scope) {

                $scope.userSelected = function () { 
                    
                }

                $scope.getGuildUsers = function () {

                    $scope.loading = true;
                    console.log($scope.guild);

                    guildServices.getGuildMembers($scope.guild)
                        .then(function (users) {

                            $scope.users = users;
                        })
                        .catch(function (err) {
                            
                            if (err == "You don't have sufficient priveleges.") {
                                console.log(err);
                            }
                            else {

                                siteServices.handleError(err);
                            }
                        })
                        .finally(function () {

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