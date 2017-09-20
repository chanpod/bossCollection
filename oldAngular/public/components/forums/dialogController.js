angular.module("BossCollection.forums")
    .controller('dialogController', [
        '$scope', '$location', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog', 'data', 'userLoginSrvc',
        function ($scope, $location, siteServices, forumService, $mdBottomSheet, $mdDialog, data, userLoginSrvc) {

            $scope.object = {};
            $scope.loading = false;
            $scope.replying = false;
            $scope.rankSelected;

            $scope.orderBy = "dateCreated"

            const OFFICER = "Officer";
            const RAIDER = "Raider";
            const PUBLIC = "Public";
            const MEMBERS = "Members";

            $scope.init = function () {

                if (data) {

                    $scope.object = data;
                }
                else {
                    $scope.object = {};
                }

                if (data.user) {
                    try {

                        $scope.user = data.user;
                        $scope.determinePermissions();
                    }
                    catch (err) {
                        //don't care
                    }
                }


            }

            $scope.determinePermissions = function () {

                if ($scope.object.permissions) {

                    if ($scope.object.permissions.officer) {

                        $scope.selectedPermission = OFFICER;

                    }
                    else if ($scope.object.permissions.raider) {

                        $scope.selectedPermission = RAIDER;

                    }
                    else if ($scope.object.permissions.public) {

                        $scope.selectedPermission = PUBLIC;
                    }
                    else {

                        $scope.selectedPermission = MEMBERS;
                    }

                    $scope.getVisibilityStatement();

                    $scope.user.guild.ranks.forEach((rank, index) => {

                        if (rank.rank == $scope.object.permissions.minRank) {
                            $scope.rankSelected = rank;
                        }
                    })
                }

            }

            $scope.cancel = function () {

                $mdDialog.cancel();
            }

            $scope.orderByDateCreated = function () {
                $scope.orderBy = "dateCreated"
            }

            $scope.orderByDateCreatedReversed = function () {
                $scope.orderBy = "-dateCreated"
            }



            $scope.deleteCategory = function () {

                forumService.deleteCategory($scope.object)
                    .then(function (result) {

                        $scope.close(result);
                    })
                    .catch(function (err) {
                        siteServices.handleError(err);
                    })
            }

            $scope.deleteForum = function () {

                forumService.deleteForum($scope.object)
                    .then(function (result) {
                        siteServices.successfulUpdate();
                        $scope.close(result);
                    })
                    .catch(function (err) {
                        siteServices.handleError(err);
                    })
            }

            $scope.setSelectedRank = (rank) => {
                $scope.rankSelected = rank;
            }

            $scope.saveCategory = function () {

                $scope.loading = true;

                if (typeof $scope.rankSelected.rank == 'number') {
                    $scope.object.permissions.minRank = $scope.rankSelected.rank;
                }

                if ($scope.object._id) {

                    if ($scope.selectedPermission == OFFICER) {

                        $scope.object.permissions.officer = true;
                        $scope.object.permissions.raider = false;
                        $scope.object.permissions.public = false;

                    }
                    else if ($scope.selectedPermission == RAIDER) {

                        $scope.object.permissions.raider = true;
                        $scope.object.permissions.officer = false;
                        $scope.object.permissions.public = false;
                    }
                    else if ($scope.selectedPermission == PUBLIC) {

                        $scope.object.permissions.public = true;
                        $scope.object.permissions.raider = false;
                        $scope.object.permissions.officer = false;
                    }
                    else {
                        $scope.object.permissions.public = false;
                        $scope.object.permissions.raider = false;
                        $scope.object.permissions.officer = false;
                    }

                    forumService.editCategory($scope.object)
                        .then(function (result) {

                            $scope.close(result);
                        })
                        .catch(function (err) {
                            siteServices.handleError(err);
                        })
                        .finally(function () {
                            $scope.loading = false;
                        })
                }
                else {
                    forumService.createNewCategory($scope.object)
                        .then(function (result) {

                            $scope.close(result);
                        })
                        .catch(function (err) {
                            siteServices.handleError(err);
                        })
                        .finally(function () {
                            $scope.loading = false;
                        })
                }

            }

            $scope.getVisibilityStatement = () => {

                $scope.visiblityStatement = "";

                let defaultEndingMessage = " and up can see these forums";

                if ($scope.selectedPermission == PUBLIC) {
                    $scope.visiblityStatement = "Anyone can see these forums.";
                }
                else if ($scope.selectedPermission == RAIDER || $scope.selectedPermission == OFFICER || $scope.selectedPermission == MEMBERS) {

                    if ($scope.rankSelected == undefined) {

                        if ($scope.object.permissions.minRank)

                            $scope.visiblityStatement = "Any rank " + $scope.object.permissions.minRank + ". " + $scope.selectedPermission + defaultEndingMessage;
                    }
                    else {

                        let currentRankSelected = $scope.rankSelected.rank + ". " + $scope.rankSelected.name;

                        $scope.visiblityStatement = "Anyone of rank " + currentRankSelected + defaultEndingMessage;
                    }
                }
                else if ($scope.selectedPermission == undefined) {
                    $scope.visiblityStatement = "Permissions not defined yet...";
                }

            }

            $scope.saveThread = function () {

                var thread;

                if ($scope.object._id) {

                    thread = $scope.object;
                    $scope.loading = true;

                    forumService.editThread(thread)
                        .then(function (response) {

                            $scope.close(response);
                        })
                        .catch(function (err) {
                            siteServices.handleError(err);
                        })
                        .finally(function () {
                            $scope.loading = false;
                        })
                }
                else {

                    thread = {
                        name: $scope.object.title,
                        forumId: $scope.object.forum._id,
                        message: $scope.object.message
                    }

                    $scope.loading = true;

                    forumService.createThread(thread)
                        .then(function (response) {

                            $scope.close(response);
                        })
                        .catch(function (err) {
                            siteServices.handleError(err);
                        })
                        .finally(function () {
                            $scope.loading = false;
                        })
                }
            }

            $scope.formatDate = function (date) {

                var localTime = moment.utc(date).toDate();

                return moment(localTime).format('dddd, MMM D hh:mm');
            }

            $scope.close = function () {
                $mdDialog.hide(self.thread);
            }

            $scope.saveForum = function () {

                $scope.loading = true;

                if ($scope.object._id) {
                    var forum = $scope.object;

                    forumService.editForum(forum)
                        .then(function (response) {

                            $scope.close(response);
                        })
                        .catch(function (err) {
                            siteServices.handleError(err);
                        })
                        .finally(function () {
                            $scope.loading = false;
                        })
                }
                else {


                    var forum = {
                        name: $scope.object.name,
                        categoryId: $scope.object.object.categoryId
                    }

                    forumService.createNewForum(forum)
                        .then(function (response) {

                            $scope.close(response);
                        })
                        .catch(function (err) {
                            siteServices.handleError(err);
                        })
                        .finally(function () {
                            $scope.loading = false;
                        })
                }
            }

            $scope.init();
        }]);