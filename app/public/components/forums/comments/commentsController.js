angular.module("BossCollection.forums")
    .controller('commentsController', [
        '$scope', '$routeParams', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog', 'userLoginSrvc',
        function ($scope, $routeParams, siteServices, forumService, $mdBottomSheet, $mdDialog, userLoginSrvc) {

            var self = this;

            self.threadSearch = "";
            self.orderBy = "-dateCreated";
            self.orderByString = 'Newest';
            self.loading = false;
            self.attemptedErrorFix = 0;

            $scope.messageCount = 25;
            $scope.comment = "";
            $scope.commentToDelete;

            $scope.showModal = (message, title) => {

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
                );
            }

            $scope.init = function () {


                self.isComingFromFavorites = forumService.getIsComingFromFavorites();
                self.threadID = $routeParams.threadID;
                self.loading = true
                
                if (self.attemptedErrorFix > 3) {
                    return;
                }

                forumService.getSelectedThread(self.threadID)
                    .then(function (thread) {

                        if (thread.thread) {
                            self.thread = thread.thread[0];

                        }
                        else {
                            self.thread = thread;

                        }

                    })
                    .then(function () {

                        return self.getComments();
                    })
                    .catch(function (err) {
                        siteServices.handleError(err);
                    })
                    .finally(function () {
                        self.loading = false;
                    })


            }

            self.editThread = function (thread) {

                forumService.openBottomSheet('threadEdit', thread);
            }

            self.getComments = function () {

                self.loading = true
                $scope.disableLoadMore = false;

                return forumService.getComments(self.threadID, $scope.messageCount)
                    .then(function (comments) {

                        try {

                            if (self.thread.comments.length == comments.comments.length) {
                                $scope.disableLoadMore = true;
                            }
                            self.thread.comments = comments.comments;
                        }
                        catch (err) {
                            console.log(err);

                            if (self.thread == undefined) {

                                //Prevent infinit loop
                                self.attemptedErrorFix++;
                                $scope.init();
                            }
                        }
                    })
                    .catch(function (err) {
                        siteServices.handleError(err);
                    })
                    .finally(function () {

                        self.loading = false
                    })
            }

            $scope.goBack = function () {

                if (forumService.getIsComingFromFavorites()) {
                    forumService.setIsComingFromFavorites(false);
                    $scope.goToBackwards('/forum/favorites');
                } else {
                    $scope.goToBackwards('/forum/' + self.thread.forumID);
                }

            }

            self.flipOrderBySorting = function () {

                if (self.orderBy == "dateCreated") {

                    self.orderByString = 'Newest';
                    self.orderBy = "-dateCreated";
                }
                else {
                    self.orderByString = 'Oldest';
                    self.orderBy = "dateCreated";
                }

            }

            $scope.loadMoreComments = function () {
                $scope.messageCount += 25;

                self.getComments();
            }

            $scope.cancelComment = function () {
                $scope.replying = false;
            }

            $scope.cancelCommentEdit = function (comment) {
                comment.editing = false;
            }

            $scope.saveCommentEdit = function (comment) {

                forumService.editComment(comment)
                    .then(function (savedComment) {

                        $scope.cancelCommentEdit(comment);
                    })
                    .catch(function (err) {
                        siteServices.handleError(err);
                    })
            }

            $scope.formatDate = function (date) {

                var localTime = moment.utc(date).toDate();

                return moment(localTime).format('dddd, MMM D hh:mm a');
            }

            $scope.confirmDelete = function (comment) {

                $scope.commentToDelete = comment;


                forumService.confirmDelete()
                    .then(function (result) {

                        if (result) {

                            $scope.deleteComment(comment)
                        }
                    })
                    .then(function (response) {

                        self.getComments();
                    })

            }

            $scope.deleteComment = function (comment) {

                $scope.loading = true;

                forumService.deleteComment(comment)
                    .then(function (result) {
                        siteServices.successfulUpdate();
                        self.getComments();
                    })
                    .catch(function (err) {

                    })
                    .finally(function () {

                        $scope.loading = false;
                    })
            }

            $scope.saveComment = function () {

                var comment = {
                    message: self.thread.newComment,
                    threadId: self.thread._id
                }

                forumService.createComment(comment)
                    .then(function (comment) {

                        self.thread.newComment = "";
                        self.thread.comments.push(comment.comment);
                        $scope.cancelComment();
                    })
                    .catch(function (err) {
                        siteServices.handleError(err);
                    })
            }

            $scope.openCommentBox = function () {
                $scope.replying = true;
            }

            $scope.close = function () {
                $mdDialog.hide(self.thread);
            }

            $scope.init();
        }]);