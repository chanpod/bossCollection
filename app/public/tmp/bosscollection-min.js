"use strict";angular.module("BossCollection",["BossCollection.controllers","BossCollection.services","BossCollection.directives","BossCollection.filters","BossCollection.forums","ngRoute","ngResource","btford.socket-io","ngCookies","ngMaterial"]).factory("mySocket",["socketFactory",function(e){return e()}]).config(["$routeProvider","$locationProvider","$httpProvider","$sceDelegateProvider","$mdThemingProvider",function(e,o,t,n,r){r.theme("default").primaryPalette("deep-orange",{"default":"A700"}).accentPalette("grey",{"default":"900"}),e.when("/",{templateUrl:"home",controller:"homeController"}).when("/strategyRoom/:raid",{templateUrl:"strategyRoom",controller:"strategyRoomController"}).when("/roster",{templateUrl:"roster",controller:"rosterController"}).when("/auth/signup",{templateUrl:"signup",controller:"signupController"}).when("/auth/updateAccount",{templateUrl:"editAccount",controller:"editAccountController"}).when("/auth/application",{templateUrl:"application",controller:"applicationController"}).when("/auth/absence",{templateUrl:"absence",controller:"absenceController"}).when("/reviewApplications",{templateUrl:"reviewApplications",controller:"applicationsReviewController"}).when("/createGuild",{templateUrl:"createGuild",controller:"createGuildController"}).when("/joinGuild",{templateUrl:"joinGuild",controller:"joinGuildController"}).when("/manageMembers",{templateUrl:"manageMembers",controller:"manageMembersController"}).when("/whosOut",{templateUrl:"absenceSubmissions",controller:"absenceController"}).otherwise({redirectTo:"/"}),o.hashPrefix("!"),n.resourceUrlWhitelist(["self","https://www.youtube.com/**","https://pagead2.googlesyndication.com"]),o.html5Mode(!0)}]),angular.module("BossCollection.forums",["ngRoute"]).config(["$routeProvider",function(e){e.when("/forum",{templateUrl:"forum",controller:"forumController"}).when("/forum/:forumID",{templateUrl:"thread",controller:"threadController"})}]),angular.module("BossCollection.forums").controller("dialogController",["$scope","$location","siteServices","forumService","$mdBottomSheet","$mdDialog","data","userLoginSrvc",function(e,o,t,n,r,i,a,c){e.object={},e.loading=!1,e.replying=!1,e.comment="",e.commentToDelete,e.orderBy="dateCreated",e.init=function(){a?e.object=a:e.object={},c.getUser().then(function(o){e.user=o})},e.cancel=function(){i.cancel()},e.orderByDateCreated=function(){e.orderBy="dateCreated"},e.orderByDateCreatedReversed=function(){e.orderBy="-dateCreated"},e.cancelComment=function(){e.replying=!1},e.cancelCommentEdit=function(e){e.editing=!1},e.saveCommentEdit=function(o){n.editComment(o).then(function(t){e.cancelCommentEdit(o)})},e.confirmDelete=function(o){e.commentToDelete=o,e.confirmDeleteBool=!0},e.deleteComment=function(){n.deleteComment(e.commentToDelete).then(function(o){e.refreshComments()})["catch"](function(e){})["finally"](function(){e.loading=!1,e.confirmDeleteBool=!1})},e.refreshComments=function(){n.getComments(e.object._id).then(function(o){e.object.comments=o.comments})["catch"](function(e){})["finally"](function(){e.loading=!1})},e.cancelCommentDelete=function(){e.commentToDelete={},e.confirmDeleteBool=!1},e.saveComment=function(){var o={message:e.object.newComment,threadId:e.object._id};n.createComment(o).then(function(o){e.object.newComment="",e.object.comments.push(o.comment),e.cancelComment()})},e.openCommentBox=function(){e.replying=!0},e.close=function(){i.hide(e.object)},e.deleteCategory=function(){n.deleteCategory(e.object).then(function(o){e.close(o)})},e.deleteForum=function(){n.deleteForum(e.object).then(function(o){e.close(o)})},e.saveCategory=function(){e.loading=!1,e.object._id?n.editCategory(e.object).then(function(o){e.close(o)})["catch"](function(e){})["finally"](function(){e.loading=!1}):n.createNewCategory({name:e.object.name}).then(function(o){e.close(o)})["catch"](function(e){})["finally"](function(){e.loading=!1})},e.saveThread=function(){var o;e.object._id?(o=e.object,n.editThread(o).then(function(o){e.close(o)})["catch"](function(e){})["finally"](function(){e.loading=!1})):(o={name:e.object.title,forumId:e.object.forum._id,message:e.object.message},n.createThread(o).then(function(o){e.close(o)})["catch"](function(e){})["finally"](function(){e.loading=!1}))},e.formatDate=function(e){var o=moment.utc(e).toDate();return moment(o).format("dddd, MMM D hh:mm")},e.saveForum=function(){if(e.loading=!0,e.object._id){var o=e.object;n.editForum(o).then(function(o){e.close(o)})["catch"](function(e){})["finally"](function(){e.loading=!1})}else{var o={name:e.object.name,categoryId:e.object.object.categoryId};n.createNewForum(o).then(function(o){e.close(o)})["catch"](function(o){e.loading=!1})["finally"](function(){e.loading=!1})}},e.init()}]),angular.module("BossCollection.forums").controller("forumController",["$scope","$location","siteServices","forumService","$mdBottomSheet","$mdDialog","$window",function(e,o,t,n,r,i,a){console.log("Forum Controller loaded"),t.updateTitle("Forums"),e.testListCount=[],e.loading=!1;for(var c=0;5>c;c++)e.testListCount.push(c);e.markdown="",e.init=function(){e.getForums()},e.getForums=function(){return e.loading=!0,n.getForums().then(function(o){e.loading=!1,e.forums=o})["catch"](function(o){e.loading=!1,console.log(o)})},e.newCategory=function(){e.category={},n.openBottomSheet("category").then(function(o){n.removeLocalForums(),e.getForums()}).then(function(){n.cancel()})["catch"](function(e){})},e.editCategory=function(o){n.openBottomSheet("category",o).then(function(o){n.removeLocalForums(),e.getForums()})["catch"](function(e){})},e.deleteCategory=function(o){n.confirmDelete().then(function(e){return e?(console.log("Deleting the category"),n.deleteCategory(o)):void 0}).then(function(o){n.removeLocalForums(),e.getForums()})},e.createForum=function(o){var t=o._id;n.openBottomSheet("forumEdit",{object:{categoryId:t}}).then(function(o){n.removeLocalForums(),e.getForums()})["catch"](function(e){})},e.editForum=function(o){n.openBottomSheet("forumEdit",o).then(function(o){n.removeLocalForums(),e.getForums()})},e.deleteForum=function(o){n.confirmDelete().then(function(e){return e?(console.log("Deleting the forum"),n.deleteForum(o)):void 0}).then(function(o){n.removeLocalForums(),e.getForums()})},e.goToForum=function(e){n.setForum(e),o.url("/forum/"+e._id)},e.init()}]),angular.module("BossCollection.forums").service("forumService",["$location","$mdDialog","$q","$routeParams","siteServices","$mdMedia","$rootScope","$resource",function(e,o,t,n,r,i,a,c){function l(e){var o=t.defer(),n={category:e};return A.save(n).$promise.then(function(e){o.resolve(e)},function(e){o.reject(e)})["finally"](function(){}),o.promise}function s(e){var o=t.defer(),n={category:e};return L.save(n).$promise.then(function(e){o.resolve(e.category)}),o.promise}function u(e){var o=t.defer(),n={category:e};return R.save(n).$promise.then(function(e){o.resolve(e.category)},function(e){o.reject(e)})["finally"](function(){}),o.resolve(e),o.promise}function d(e){j=e}function f(e){var o=t.defer();return m().then(function(t){var n;_(t.categories).forEach(function(o){_.find(o.forums,function(o){o._id==e&&(n=o)})}),o.resolve(n)},function(e){o.reject(e)})["finally"](function(){}),o.promise}function m(){var e=t.defer();return F?e.resolve(F):I.save({}).$promise.then(function(o){F=o.forums,e.resolve(o.forums)},function(o){e.reject(o)}),e.promise}function g(){F=void 0}function h(e){var o=t.defer(),n={forum:e};return N.save(n).$promise.then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)})["finally"](function(){}),o.promise}function p(e){var o=t.defer();return P.save({forum:e}).$promise.then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)}),o.promise}function v(e){var o=t.defer();return G.save({forum:e}).$promise.then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)})["finally"](function(){}),o.promise}function w(){var e=t.defer();return j?e.resolve(j):f(n.forumID).then(function(o){j=o,e.resolve(o)}),e.promise}function y(e){var o=t.defer(),n={forumId:e};return O.save(n).$promise.then(function(e){o.resolve(e.threads)}),o.promise}function b(e){var o=t.defer(),n={thread:e};x.save(n).$promise.then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)})["finally"](function(){})}function C(e){var o=t.defer();return H.save({thread:e}).$promise.then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)})["finally"](function(){}),o.promise}function $(e){var o=t.defer(),n={thread:e};return E.save(n).$promise.then(function(e){o.resolve(e.thread)}),o.promise}function S(e){var o=t.defer();return J.save({comment:e}).$promise.then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)})["finally"](function(){}),o.promise}function B(e){var o=t.defer();return z.save({comment:e}).$promise.then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)})["finally"](function(){}),o.promise}function M(e){var o=t.defer(),n={comment:e};return q.save(n).$promise.then(function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise}function k(e){var o=t.defer(),n={threadId:e};return V.save(n).$promise.then(function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise}function T(e,n){var r=t.defer(),i=o.confirm().title("Are you sure you want to delete this?").textContent("This is irreversable once you click Yes!").ariaLabel("Confirm Delete").targetEvent(e).ok("Delete").cancel("Nevermind");return o.show(i).then(function(){r.resolve(!0)},function(e){r.reject(!1)}),r.promise}function U(e,n){var r=t.defer(),a=i("xs")||i("sm");(i("sm")||i("xs"))&&a;return o.show({templateUrl:e,controller:"dialogController",parent:angular.element(document.body),clickOutsideToClose:!1,locals:{data:n},fullscreen:!0}).then(function(e){r.resolve(e)},function(){r.reject()}),r.promise}function D(){o.hide()}var j,F,L=c("/forum/createCategory",{},{}),R=c("/forum/editCategory",{},{}),A=c("/forum/deleteCategory",{},{}),I=c("/forum/getCategories",{},{}),N=c("/forum/deleteForum",{},{}),G=c("/forum/editForum",{},{}),P=c("/forum/createForum",{},{}),E=c("/forum/createThread",{},{}),O=c("/forum/getThreads",{},{}),x=c("/forum/deleteThread",{},{}),H=c("/forum/editThread"),q=c("/forum/createComment",{},{}),V=c("/forum/getComments",{},{}),z=c("/forum/editComment",{},{}),J=c("/forum/deleteComment",{},{});return{setForum:d,confirmDelete:T,openBottomSheet:U,createNewCategory:s,deleteCategory:l,editCategory:u,editForum:v,createNewForum:p,deleteForum:h,cancel:D,getForums:m,removeLocalForums:g,getThreads:y,getCurrentForum:w,deleteThread:b,editThread:C,createThread:$,deleteComment:S,editComment:B,createComment:M,getComments:k}}]),angular.module("BossCollection.forums").controller("threadController",["$scope","$location","siteServices","forumService","$mdBottomSheet","$mdDialog",function(e,o,t,n,r,i){console.log("Thread Controller Loaded"),e.forum={},e.loading=!1,e.orderBy="dateCreated",e.init=function(){e.loading=!0,e.forum=n.getCurrentForum().then(function(o){e.forum=o}).then(function(){return t.updateTitle(e.forum.name+" Forum"),n.getThreads(e.forum)}).then(function(o){e.threads=o})["catch"](function(o){e.loading=!1})["finally"](function(){e.loading=!1})},e.refresh=function(){e.loading=!0,n.getThreads(e.forum).then(function(o){e.loading=!1,e.threads=o})["catch"](function(o){e.loading=!1})},e.deleteThread=function(o){n.confirmDelete().then(function(e){return e?(console.log("Deleting the category"),n.deleteThread(o)):void 0}).then(function(o){e.refresh()})},e.orderByDateCreated=function(){e.orderBy="dateCreated"},e.orderByDateCreatedReversed=function(){e.orderBy="-dateCreated"},e.openThread=function(e){n.getComments(e._id).then(function(o){e.comments=o.comments,n.openBottomSheet("threadComments",e)})},e.createThread=function(){n.openBottomSheet("threadEdit",{forum:e.forum}).then(function(o){e.refresh()})},e.editThread=function(e){n.openBottomSheet("threadEdit",e)},e.goBack=function(){window.history.back()},e.init()}]),angular.module("BossCollection.controllers",[]),angular.module("BossCollection.controllers").controller("homeController",["$scope","$location","$http","$timeout","siteServices","$sce",function(e,o,t,n,r,i){r.updateTitle("Home")}]),angular.module("BossCollection.controllers").controller("navbar",["$scope","$location","$http","userLoginSrvc","$rootScope","$mdSidenav","siteServices",function(e,o,t,n,r,i,a){function c(e){return function(){i(e).toggle()}}function l(){n.getUser().then(function(o){o&&(e.user=o,e.loggedIn=!0)},function(o){e.user.name="",e.loggedIn=!1})}var s;e.user={},e.user.name="",e.loggedIn=!1,e.title="",e.init=function(){l()},e.showLoginBottomSheet=function(e){a.showLoadingBottomSheet(e)},e.openMenu=function(e,o){s=o,e(o)},e.goTo=function(t){o.url(t),e.toggle()},e.goToExternal=function(e){window.open(e,"_blank")},r.$on("navbarTitle",function(o,t){e.title=t}),r.$on("loggedin",function(e,o){l()}),e.logout=function(){n.logout().then(function(e){},function(e){console.log(e)})},e.areWeLoggedIn=function(){n.getUser().then(function(o){e.loggedIn=!0})["catch"](function(o){e.loggedIn=!1})},e.openSideBar=function(e){i(e).open()},e.closeSideBar=function(e){i(e).close()},e.toggle=c("left"),e.init()}]),angular.module("BossCollection.controllers").controller("rosterController",["$scope","filterFilter","socketProvider","guildServices","$http","$cookies","$location","siteServices",function(e,o,t,n,r,i,a,c){function l(){var o=i.getObject("ranksList");o&&(e.raiderRanks=o.raiderRanks,e.trialRanks=o.trialRanks,e.guild=o.guild,e.realm=o.realm)}c.updateTitle("Guild Roster"),e.currentRosterDropdown=!0,e.applicantsDropdown=!1;var s=["placeholder","warrior","paladin","hunter","rogue","priest","death knight","shaman","mage","warlock","monk","druid"];e.raiders=[],e.trials=[],e.trialRanks=[9],e.raiderRanks=[0,2,6],e.guild="mkdir bosscollection",e.realm="zul'jin",e.loading=!0,e.genders=["Male","Female"],l(),$("ul.tabs").tabs(),e.getMembers=function(){e.raiders=[],e.trials=[],e.loading=!0,n.getGuild(e.realm,e.guild).then(function(o){console.log(o),e.loading=!1,d(o)},function(o){e.loading=!1,console.log(o)})},e.getUser=function(){r({method:"POST",url:"/getUser"}).success(function(e){console.log(e)})},e.openArmoryProfile=function(e,o){var t="http://us.battle.net/wow/en/character/"+o+"/"+e+"/simple";window.open(t)},e.saveRanksList=function(){var o={guild:e.guild,realm:e.realm,trialRanks:e.trialRanks,raiderRanks:e.raiderRanks};i.putObject("ranksList",o)};var u=function(o,t,n){try{var r={name:o.character.name,"class":n.charAt(0).toUpperCase()+n.slice(1),rank:t,gender:e.genders[o.character.gender],race:o.character.race,spec:o.character.spec.name,achievementPoints:o.character.achievementPoints,avatar:"http://us.battle.net/static-render/us/"+o.character.thumbnail};return r}catch(i){console.log(o)}},d=function(o){for(var t=0;t<o.length;t++){var n=o[t].rank,r=_.find(e.raiderRanks,function(e){return n==e}),i=_.find(e.trialRanks,function(e){return n==e}),a=s[o[t].character["class"]];r&&e.raiders.push(u(o[t],n,a)),i&&e.trials.push(u(o[t],n,a))}e.raiders.sort(function(e,o){return e.rank-o.rank})};e.lowLvlTrials=[],e.getMembers()}]),angular.module("BossCollection.controllers").controller("absenceController",["$scope","$location","userLoginSrvc","absenceService","siteServices","$filter",function(e,o,t,n,r,i){moment().day();e.newAbsence={},e.absences={},e.loading=!1,e.typePicked=!1,e.today=moment(),e.dayDesired,e.currentlySelected=moment().format("dddd - Do"),e.toolbar={isOpen:!1,direction:"right"},e.currentlySelected="Today",e.isToolSetOpen=!1,"/auth/absence"==o.url()?r.updateTitle("Report Absence"):r.updateTitle("Upcoming Absences"),e.updateList=function(){e.currentlySelected=moment(e.dayDesired).format("dddd - Do"),e.getAbsencesByDate()},e.formatDate=function(e){return moment.utc(e).format("dddd, MMM D")},e.getAbsences=function(){e.currentlySelected="All absences",e.loading=!0,n.getAbsences().then(function(o){e.loading=!1,e.absences=o.absences},function(o){r.showMessageToast(o),e.loading=!1,console.log(o)})},e.getAbsencesByDate=function(){e.loading=!0,n.getAbsencesByDate(e.dayDesired).then(function(o){e.loading=!1,e.absences=o.absences},function(o){r.showMessageToast(o),e.loading=!1,console.log(o)})},e.submitNewAbsence=function(){null==e.newAbsence.date?r.showMessageModal("Must select a date"):null==e.newAbsence.type?r.showMessageModal("Must select a type: Late or Absent"):n.submitNewAbsence(e.newAbsence).then(function(e){o.path("/whosOut")},function(e){Materialize.toast(e),console.log(e)})}}]),angular.module("BossCollection.controllers").controller("editAccountController",["$scope","$location","$http","userLoginSrvc","siteServices","guildServices",function(e,o,t,n,r,i){r.updateTitle("Account"),e.leaveGuild=function(){var o=e.user.guild.name;i.leaveGuild(o).then(function(o){e.user=n.updateUser()})},e.updateAccount=function(){console.log("Updating account"),n.updateAccount(e.user).then(function(o){e.user=n.updateUser(),r.showMessageToast("User updated")},function(e){r.showMessageModal(e)})}}]),angular.module("BossCollection.controllers").controller("loginController",["$scope","$location","$http","userLoginSrvc","siteServices","$mdBottomSheet","$timeout",function(e,o,t,n,r,i,a){e.user={},e.user.name="",e.loading=!1,"/auth/login"==o.url()&&r.updateTitle("Login"),console.log("Login Controller"),e.init=function(){},e.resetPassword=function(){e.loading=!0,n.lostPassword(e.user.email).then(function(e){r.showMessageModal("Email has been sent. Refer to your email for your temporary password.")})["catch"](function(e){r.showMessageModal(e)})["finally"](function(){e.loading=!1})},e.alreadyLoggedIn=function(){1==n.loggedIn()&&o.path("/")},e.openPasswordResetWindow=function(e){i.show({templateUrl:"resetPassword",controller:"loginController",targetEvent:e,escapeToClose:!1})},e.cancelPasswordReset=function(){i.hide(),a(function(){r.showLoadingBottomSheet()},500)},e.login=function(){n.login(e.user).then(function(e){console.log(e),n.getUser().then(function(){"/auth/application"==o.path()||o.path("/")})},function(e){r.showMessageModal(e),console.log(e)})},e.cancelLogin=function(){r.hideBottomSheet(),o.path("/")}}]),angular.module("BossCollection.controllers").controller("signupController",["$scope","$location","$http","$timeout","userLoginSrvc","siteServices",function(e,o,t,n,r,i){e.user={},e.passwordsMatch=!1,$("#logInModal").closeModal(),e.register=function(){r.registerNewUser(e.user).then(function(e){console.log(e)},function(o){e.passwordsMatch=!0,e.openFromLeft(o),console.log(o)})},e.openFromLeft=function(e){i.showMessageModal(e)}}]),angular.module("BossCollection.controllers").controller("applicationController",["$scope","$location","$http","$timeout","$filter","realmServices","guildServices","userLoginSrvc","siteServices",function(e,o,t,n,r,i,a,c,l){l.updateTitle("Applications"),console.log("Loading application ctrl..."),e.application={},e.validCharacterName=!1,e.charRequirementsIncomplete=!1,e.charRealmError=!1,e.searchingForUser=!1,e.icon="error",e.init=function(){i.getRealms().then(function(o){e.realms=o}).then(function(){return e.loggedIn()})["catch"](function(e){console.log(e)})["finally"](function(){n(function(){l.hideLoadingModal()},500)})},e.filterSearch=function(o){return r("filter")(e.realms,o)},e.loggedIn=function(){c.getUser().then(function(e){})["catch"](function(e){l.showMessageModal("Please log in before attempting to apply."),o.path("/")})["finally"](function(){})},e.validateCharactername=function(o){e.application.realm?(e.validCharacterName=!1,e.searchingForUser=!0,a.validateCharacterName(e.application.characterName,e.application.realm.name).then(function(t){e.validCharacterName=!0,e.icon="check_circle",e.application.character=t,o&&o()},function(o){e.icon="error",l.showMessageToast(o),e.validCharacterName=!1})["finally"](function(){e.searchingForUser=!1})):(e.validCharacterName=!1,o&&o())},e.submitApplication=function(){e.validateCharactername(function(){0==e.validCharacterName?l.showMessageToast("Sorry, we couldn't find your character. Please verify your Realm and Character are correct."):a.submitApplication(e.application).then(function(e){o.path("/reviewApplications")},function(e){l.showMessageToast(e)})})},e.init()}]),angular.module("BossCollection.controllers").controller("applicationsReviewController",["$scope","$location","$http","$timeout","guildServices","siteServices",function(e,o,t,n,r,i){function a(){for(var o=0;o<e.applications.length;o++){var t=c[e.applications[o].character["class"]];e.applications[o].character["class"]=t.charAt(0).toUpperCase()+t.slice(1)}}i.updateTitle("View Applications");var c=["placeholder","warrior","paladin","hunter","rogue","priest","death knight","shaman","mage","warlock","monk","druid"];e.loading=!0,e.openComments=function(e){i.showMessageModal(e,"Comments")},e.goTo=function(e){var o=window.open(e,"_blank");o.focus()},e.buildArmoryUrl=function(o,t){var n="http://us.battle.net/wow/en/character/"+o+"/"+t+"/simple";e.goTo(n)},r.getApplications().then(function(o){e.loading=!1,e.applications=o.applications,console.log(e.applications),a()},function(o){e.loading=!1,console.log(o),i.showMessageToast("Seems something broke. Try again in a few...")})}]),angular.module("BossCollection.controllers").controller("forumsController",["$scope","$location","$http","userLoginSrvc","$rootScope",function(e,o,t,n,r){e.user.name=n.getUser(),void 0==e.user.name&&o.path("/")}]),angular.module("BossCollection.controllers").controller("createGuildController",["$scope","$location","$http","$timeout","siteServices","guildServices","userLoginSrvc",function(e,o,t,n,r,i,a){r.updateTitle("Create Guild"),e.guildName="",e.loading=!1,e.joinGuild=function(){e.loading=!0,i.createGuild(e.guildName).then(function(){var e=a.updateUser();r.showMessageModal("Successfully created "+e.guild.name),o.path("/")})["catch"](function(e){r.showMessageModal(e)})["finally"](function(){e.loading=!1})}}]),angular.module("BossCollection.controllers").controller("joinGuildController",["$scope","$location","$http","$timeout","siteServices","guildServices","userLoginSrvc","$filter",function(e,o,t,n,r,i,a,c){e.listOfGuilds=[],e.loading=!1,r.updateTitle("Join Guild"),e.init=function(){e.getGuilds()},e.filterSearch=function(o){return c("filter")(e.listOfGuilds,o)},e.getGuilds=function(){i.getListOfGuilds().then(function(o){e.listOfGuilds=o})},e.joinGuild=function(){e.loading=!0,e.guildName?i.joinGuild(e.guildName.name,e.user.name).then(function(t){r.showMessageModal("Success! You will be able to access the guild services once you've been promoted to member."),a.updateUser(e.user),o.path("/")})["catch"](function(e){r.showMessageModal(e)})["finally"](function(){e.loading=!1}):(r.showMessageToast("Guild doesn't exist"),e.loading=!1)},e.init()}]),angular.module("BossCollection.controllers").controller("manageMembersController",["$scope","$location","$http","$timeout","siteServices","guildServices","userLoginSrvc","$filter",function(e,o,t,n,r,i,a,c){e.guildMembers,e.ranks=["Applicant","Member","Officer","GM"],e.init=function(){""!=e.user.name?i.getGuildMembers(e.user.guild.name).then(function(o){e.guildMembers=o}):a.getUser().then(function(o){i.getGuildMembers(o.guild.name).then(function(o){e.guildMembers=o})})},e.promote=function(o){3==o.rank?r.showMessageModal("Can't promote any further"):(o.rank++,i.updateRank(e.user.guild.name,o).then(function(){})["catch"](function(e){r.showMessageModal(e)}))},e.demote=function(o){1==o.rank?r.showMessageModal("Can't demote any further. They are effectively kicked at this rank."):(o.rank--,i.updateRank(e.user.guild.name,o).then(function(){})["catch"](function(e){r.showMessageModal(e)}))},e.init(),r.updateTitle("Manage Members")}]),angular.module("BossCollection.controllers").controller("strategyRoomController",["$scope",function(e){}]),angular.module("BossCollection.controllers").controller("bossStrategyController",["$scope","bossStrats","socketProvider","$routeParams",function(e,o,t,n){function r(){for(var o in e.raidToDisplay)e.raidToDisplay[o].isSelected=!1}function i(){document.getElementById("sideNavID").style.height=window.outerHeight/2+"px"}function a(e){return/(?:https?:\/\/|www\.|m\.|^)youtu(?:be\.com\/watch\?(?:.*?&(?:amp;)?)?v=|\.be\/)([\w‌​\-]+)(?:&(?:amp;)?[\w\?=]*)?/.test(e)}e.highmaulBossSelected=!1,e.brfBossSelected=!1,e.hfcBossSelected=!1,$(".modal-trigger").leanModal();var c=n.raid;e.highmaul="hm",e.brf="brf",e.hfc="hfc",e.bossInfo={},e.loadChat=!1,e.difficultySelected="",e.currentEmbedUrl="",e.addNewBoss=!1,e.currentRaid={},e.raidToDisplay={},e.name="",e.url="",e.init=function(){i(),o.getStrats(c).then(function(o){e.raidToDisplay=o.bosses,e.raidData=o,r()})},e.addVideo=function(o,t,n){e.currentBoss=o,e.currentDifficulty=t,e.currentRaid=n},e.saveNewBossInfo=function(t,n,r,i){if(console.log(r),a(n)){var c=n.split("&");c=c[0].split("="),n=c[1],"heroic"==i?r.heroic.videos[r.heroic.videos.length]={name:t,url:n}:"mythic"==i&&(r.mythic.videos[r.mythic.videos.length]={name:t,url:n}),e.raidData.bosses=e.raidToDisplay,console.log(e.raidData),o.saveStrats(e.raidData,n),e.addNewBoss=!1,e.name="",e.url="",e.addNewBoss=!e.addNewBoss}else $("#urlInput").popover("show")},e.changeBossInfo=function(o,t){o.isSelected=!o.isSelected,e.bossSelected=o.name,e.addNewBoss=!1},e.changeDifficulty=function(e,o){e.difficultySelected=o,"- Heroic"==o?(e.heroic.isSelected=!e.heroic.isSelected,e.mythic.isSelected=!1):(e.mythic.isSelected=!e.mythic.isSelected,e.heroic.isSelected=!1)},e.setUrl=function(o){e.currentEmbedUrl=o},e.open=function(o){e.setUrl(o),console.log(o),$("#bossVideo").openModal()},e.init()}]),angular.module("BossCollection.controllers").controller("bossStrategyController",["$scope","bossStrats","$modal","socketProvider","$routeParams",function(e,o,t,n,r){function i(){for(var o in e.raidToDisplay)e.raidToDisplay[o].isSelected=!1}function a(){document.getElementById("sideNavID").style.height=window.outerHeight/2+"px"}function c(e){return/(?:https?:\/\/|www\.|m\.|^)youtu(?:be\.com\/watch\?(?:.*?&(?:amp;)?)?v=|\.be\/)([\w‌​\-]+)(?:&(?:amp;)?[\w\?=]*)?/.test(e)}e.highmaulBossSelected=!1,e.brfBossSelected=!1,e.hfcBossSelected=!1;var l=r.raid;e.highmaul="hm",e.brf="brf",e.hfc="hfc",e.bossInfo={},e.loadChat=!1,e.difficultySelected="",e.currentEmbedUrl="",e.addNewBoss=!1,e.currentRaid={},e.raidToDisplay={},e.name="",e.url="",e.init=function(){a(),o.getStrats(l).then(function(o){e.raidToDisplay=o.bosses,e.raidData=o,i()})},e.addVideo=function(o,t,n){e.currentBoss=o,e.currentDifficulty=t,e.currentRaid=n},e.saveNewBossInfo=function(t,n,r,i){if(console.log(r),c(n)){var a=n.split("&");a=a[0].split("="),n=a[1],"heroic"==i?r.heroic.videos[r.heroic.videos.length]={name:t,url:n}:"mythic"==i&&(r.mythic.videos[r.mythic.videos.length]={name:t,url:n}),e.raidData.bosses=e.raidToDisplay,console.log(e.raidData),o.saveStrats(e.raidData,n),e.addNewBoss=!1,e.name="",e.url="",e.addNewBoss=!e.addNewBoss}else $("#urlInput").popover("show")},e.changeBossInfo=function(o,t){o.isSelected=!o.isSelected,e.bossSelected=o.name,e.addNewBoss=!1},e.changeDifficulty=function(e,o){e.difficultySelected=o,"- Heroic"==o?(e.heroic.isSelected=!e.heroic.isSelected,e.mythic.isSelected=!1):(e.mythic.isSelected=!e.mythic.isSelected,e.heroic.isSelected=!1)},e.setUrl=function(o){e.currentEmbedUrl=o},e.open=function(o){e.setUrl(o),console.log(o);t.open({templateUrl:"videoModal",controller:"videoController",size:"lg",windowClass:"videoModal",resolve:{currentUrl:function(){return e.currentEmbedUrl}}})},e.init()}]),angular.module("BossCollection.controllers").controller("videoController",["$scope","currentUrl","$modalInstance",function(e,o,t){e.url=o,e.getIframeSrc=function(){return"https://www.youtube.com/embed/"+e.url},e.close=function(){t.dismiss("cancel")},e.embedUrl=e.url}]),angular.module("BossCollection.directives",[]),angular.module("BossCollection.directives").directive("ad",[function(){return{restrict:"E",template:'<ins class="adsbygoogle"style="display:block;"data-ad-client="ca-pub-4895481554192451"data-ad-slot="1814022675"data-ad-format="auto">',link:function(e,o,t){try{(adsbygoogle=window.adsbygoogle||[]).push({})}catch(n){console.log("Add code broke"),console.log(n)}}}}]),angular.module("BossCollection.directives").directive("bossstrategies",[function(){return{restrict:"E",templateUrl:"bossStrategy",controller:"bossStrategyController",link:function(e,o,t){}}}]),angular.module("BossCollection.directives").directive("logIn",[function(){return{restrict:"E",templateUrl:"login",controller:"loginController",link:function(e,o,t){}}}]),angular.module("BossCollection.directives").directive("displayMarkdown",["$sce",function(e){return{restrict:"E",scope:{markdown:"=markdown"},link:function(o){var t=new showdown.Converter;o.converToHtml=function(){o.html=e.trustAsHtml(t.makeHtml(o.markdown))},o.converToHtml(o.markdown)},templateUrl:"displayMarkdownDirective"}}]),angular.module("BossCollection.directives").directive("inputMarkdown",["$sce",function(e){return{restrict:"E",scope:{input:"=input"},link:function(o){var t=new showdown.Converter;o.markdown=o.input,o.showPreview=!0,o.goToExternal=function(e){window.open(e,"_blank")},o.converToHtml=function(){o.html=e.trustAsHtml(t.makeHtml(o.markdown)),o.input=o.markdown},o.hideShowPreview=function(){o.showPreview=!o.showPreview},o.converToHtml(o.markdown)},templateUrl:"inputField"}}]),angular.module("BossCollection.filters",[]),angular.module("BossCollection.filters").filter("applicants",[function(){return function(e){var o=[];return o=_.filter(e,function(e){return 1==e.rank}),o.length}}]),angular.module("BossCollection.filters").filter("interpolate",function(e){return function(o){return String(o).replace(/\%VERSION\%/gm,e)}}),angular.module("BossCollection.services",[]),angular.module("BossCollection.services").factory("absenceService",["$resource","$q","$location","$cookies","$rootScope","siteServices",function(e,o,t,n,r,i){var a=e("/api/absence",{},{}),c=e("/api/absenceByDate",{},{}),l={submitNewAbsence:function(e){var t=o.defer();return i.startLoading(),a.save(e).$promise.then(function(e){t.resolve(e)},function(e){console.log(e),t.reject(e.data)})["finally"](function(){i.loadingFinished()}),t.promise},getAbsences:function(){var e=o.defer();return a.get().$promise.then(function(o){e.resolve(o)},function(o){console.log(o),e.reject(o.data)})["finally"](function(){i.loadingFinished()}),e.promise},getAbsencesByDate:function(e){var t=o.defer();return c.save({date:e}).$promise.then(function(e){t.resolve(e)},function(e){console.log(e),t.reject(e.data)})["finally"](function(){i.loadingFinished()}),t.promise}};return l}]),angular.module("BossCollection.services").factory("bossStrats",["socketProvider","$resource","$q",function(e,o,t){var n=o("/api/bossStrats",{},{update:{method:"PUT"}}),r={getStrats:function(e){var o=t.defer();console.log("Request Boss Info");var r={name:e};return n.save(r).$promise.then(function(e){console.log("Result: "),console.log(e),o.resolve(e.result)}),o.promise},saveStrats:function(e,o){console.log("Saving info now");var t={raidData:e,url:o};t=angular.toJson(t),console.log(t),n.data=t,n.update(t,function(e){console.log("Result: "+e)})}};return r}]),angular.module("BossCollection.services").factory("guildServices",["$http","$q","$resource","siteServices","userLoginSrvc","socketProvider",function(e,o,t,n,r,i){var a="https://us.api.battle.net/wow/guild/",c="?fields=members&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d",l=t("/api/applicationSubmission",{},{}),s=t("/api/getApplications",{},{}),u=t("/api/addGuild",{},{}),d=t("/api/updateRank",{},{}),f=(t("/api/changeGuildName",{},{}),t("/api/addMember",{},{})),m=t("/api/removeMember",{},{}),g=t("/api/getGuildMembers",{},{}),h=t("/api/listOfGuilds",{},{}),p={getListOfGuilds:function(){var e=o.defer();return n.startLoading(),h.get().$promise.then(function(o){e.resolve(o.guilds)})["catch"](function(o){e.reject(o.data.message)})["finally"](function(){n.loadingFinished()}),e.promise},updateRank:function(e,t){var r=o.defer();return d.save({guildName:e,member:t}).$promise.then(function(e){
r.resolve(e.members)})["catch"](function(e){r.reject(e.data.message)})["finally"](function(){n.loadingFinished()}),r.promise},getGuildMembers:function(e){var t=o.defer();return n.startLoading(),g.save({guildName:e}).$promise.then(function(e){t.resolve(e.members)})["catch"](function(e){t.reject(e.data.message)})["finally"](function(){n.loadingFinished()}),t.promise},createGuild:function(e){var t=o.defer();return u.save({guildName:e}).$promise.then(function(e){t.resolve(e.guild)})["catch"](function(e){t.reject(e.data.message)})["finally"](function(){}),t.promise},joinGuild:function(e,t){var n=o.defer();return f.save({guildName:e,memberName:t}).$promise.then(function(e){n.resolve(e.guild)})["catch"](function(e){n.reject(e.data.message)})["finally"](function(){}),n.promise},leaveGuild:function(e){var t=o.defer();return n.startLoading(),m.save({guildName:e}).$promise.then(function(e){t.resolve(e.user)})["catch"](function(e){t.reject(e.data.message)})["finally"](function(){n.loadingFinished()}),t.promise},getApplications:function(){var e=o.defer();return n.startLoading(),s.get().$promise.then(function(o){e.resolve(o)},function(o){e.reject(o)})["finally"](function(){n.loadingFinished()}),e.promise},validateCharacterName:function(e,n){var r=o.defer(),i="https://us.api.battle.net/wow/character/"+n+"/"+e+"?locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d",a=t(i,{},{});return a.get().$promise.then(function(e){r.resolve(e)},function(e){r.reject("Character not found")}),r.promise},getGuild:function(t,r){var i=o.defer();if(n.startLoading(),""!=t&&""!=r)var l=a+encodeURIComponent(t)+"/"+encodeURIComponent(r)+c;return e({method:"GET",url:l}).then(function(e){i.resolve(e.data.members)},function(e){i.reject(e)})["finally"](function(){n.loadingFinished()}),i.promise},submitApplication:function(e){var r=o.defer(),i="https://us.api.battle.net/wow/character/"+e.realm.name+"/"+e.character.name+"?fields=talents&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d",a=t(i,{},{});return n.startLoading(),a.get().$promise.then(function(e){return e},function(e){r.reject("Character not found")}).then(function(o){e.character.specs=o.talents,l.save({newApplicant:e}).$promise.then(function(e){n.loadingFinished(),r.resolve(e)},function(e){r.reject(e)})})["finally"](function(){n.loadingFinished()}),r.promise}};return p}]),angular.module("BossCollection.services").factory("realmServices",["$http","$q","siteServices",function(e,o,t){var n="https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d",r=[],i={getRealms:function(){var i=o.defer();return 0==r.length?e({method:"GET",url:n}).success(function(e){t.hideLoadingModal(),r=e.realms,i.resolve(r),r=r}):(t.hideLoadingModal(),i.resolve(r)),i.promise}};return i}]),angular.module("BossCollection.services").factory("siteServices",["$rootScope","$mdBottomSheet","$mdDialog","$mdToast",function(e,o,t,n){function r(){g||(g=!0,m())}function i(){f(),g=!1}function a(o){e.$broadcast("navbarTitle",o)}function c(e){o.show({templateUrl:"logInModal",controller:"loginController",targetEvent:e,escapeToClose:!1})}function l(){o.hide()}function s(){o.hide()}function u(e,o){t.show(t.alert().clickOutsideToClose(!0).title(o).textContent(e).ariaLabel("message popup").ok("Got it!").openFrom({left:-50,width:30,height:80}).closeTo({right:1500}))}function d(e){n.show(n.simple().textContent(e).position("top").hideDelay(4e3))}function f(){0==g||(g=!1,t.hide())}function m(){t.show({templateUrl:"loadingModal",onComplete:function(){g||t.hide()}})}var g=!1;return{startLoading:r,loadingFinished:i,updateTitle:a,showLoadingBottomSheet:c,hideLoadingBottomSheet:l,showMessageModal:u,showMessageToast:d,hideBottomSheet:s,showLoadingModal:m,hideLoadingModal:f}}]),angular.module("BossCollection.services").factory("socketProvider",[function(){var e=io("http://localhost:4001/guilds");return e}]),angular.module("BossCollection.services").factory("userLoginSrvc",["$resource","$q","$location","$cookies","$rootScope","siteServices","socketProvider",function(e,o,t,n,r,i,a){function c(){var e=n.get("user"),o=void 0;if(e){var t=e.substring(e.indexOf("{"),e.lastIndexOf("}")+1);o=JSON.parse(t)}return o}function l(e){var o;return h&&h.guild?(o=_.find(h.guild.members,{user:h.name}),h.rank=o.rank,o.rank):e&&e.guild?(o=_.find(h.guild.members,{user:h.name}),o.rank):0}var s=e("/auth/signup",{},{}),u=e("/auth/login",{},{}),d=e("/auth/logout",{},{}),f=(e("/auth/loggedin",{},{}),e("/auth/updateAccount",{},{})),m=e("/auth/currentUser",{},{}),g=e("/auth/lost-password",{},{}),h=null,p={lostPassword:function(e){var t=o.defer();return g.save({email:e}).$promise.then(function(e){t.resolve(e)},function(e){t.reject(e.data.message)}),t.promise},updateAccount:function(e){var t=o.defer();return i.startLoading(),f.save(e).$promise.then(function(e){t.resolve(e)},function(e){console.log(e),t.reject(e.data.message)})["finally"](function(){i.loadingFinished()}),t.promise},updateUser:function(){return h=c(),h&&h.guild&&l(h),r.$broadcast("loggedin",{user:h,loggedIn:!0}),h},getUser:function(){var e=o.defer();return h=c(),h?(h&&h.guild&&l(h),e.resolve(h)):e.reject("User doesn't exist"),e.promise},refreshUserFromServer:function(){var e=o.defer();return i.startLoading(),m.get().$promise.then(function(o){p.updateUser(),e.resolve()},function(o){console.log(o),e.reject(o)})["finally"](function(){i.loadingFinished()}),e.promise},logout:function(){var e=o.defer();return i.startLoading(),h=null,d.save({}).$promise.then(function(e){1==e.loggedOut&&r.$broadcast("loggedin",{loggedIn:!1}),t.path("/")},function(e){r.$broadcast("loggedin",{loggedIn:!1}),t.path("/")})["finally"](function(){i.loadingFinished()}),e.promise},registerNewUser:function(e){var n=o.defer();return console.log("Register new user"),i.startLoading(),s.save(e).$promise.then(function(e){h=c(),l(h),p.updateUser(),t.path("/")},function(e){console.log(e.data),n.reject(e.data)})["finally"](function(){i.loadingFinished()}),n.promise},login:function(e){var t=o.defer();return i.startLoading(),u.save(e).$promise.then(function(e){h=c(),l(h),r.$broadcast("loggedin",{user:h,loggedIn:!0}),i.hideLoadingBottomSheet()},function(e){t.reject(e.data)})["finally"](function(){i.loadingFinished()}),t.promise}};return p.refreshUserFromServer(),p}]);