"use strict";angular.module("BossCollection",["BossCollection.controllers","BossCollection.services","BossCollection.directives","ngRoute","ngResource","btford.socket-io","ngCookies","ngMaterial"]).factory("mySocket",["socketFactory",function(e){return e()}]).config(["$routeProvider","$locationProvider","$httpProvider","$sceDelegateProvider",function(e,o,t,n){e.when("/",{templateUrl:"home",controller:"homeController"}).when("/strategyRoom/:raid",{templateUrl:"strategyRoom",controller:"strategyRoomController"}).when("/roster",{templateUrl:"roster",controller:"rosterController"}).when("/auth/login",{templateUrl:"login",controller:"loginController"}).when("/auth/signup",{templateUrl:"signup",controller:"signupController"}).when("/forum",{templateUrl:"forums",controller:"forumsController"}).when("/auth/updateAccount",{templateUrl:"editAccount",controller:"editAccountController"}).when("/auth/application",{templateUrl:"application",controller:"applicationController"}).when("/auth/absence",{templateUrl:"absence",controller:"absenceController"}).when("/reviewApplications",{templateUrl:"reviewApplications",controller:"applicationsReviewController"}).when("/whosOut",{templateUrl:"absenceSubmissions",controller:"absenceController"}).otherwise({redirectTo:"/"}),o.hashPrefix("!"),n.resourceUrlWhitelist(["self","https://www.youtube.com/**","https://pagead2.googlesyndication.com"]),o.html5Mode(!0)}]),angular.module("BossCollection.controllers",[]),angular.module("BossCollection.controllers").controller("homeController",["$scope","$location","$http","$timeout","siteServices",function(e,o,t,n,r){try{(adsbygoogle=window.adsbygoogle||[]).push({})}catch(i){}$(".parallax").parallax();var l=[{selector:"#staggered-test",offset:50,callback:'Materialize.toast("This is our ScrollFire Demo!", 1500 )'},{selector:"#staggered-test",offset:205,callback:'Materialize.toast("Please continue scrolling!", 1500 )'},{selector:"#staggered-test",offset:400,callback:'Materialize.showStaggeredList("#staggered-test")'},{selector:"#image-test",offset:500,callback:'Materialize.fadeInImage("#image-test")'}];Materialize.scrollFire(l),r.updateTitle("Home")}]),angular.module("BossCollection.controllers").controller("navbar",["$scope","$location","$http","userLoginSrvc","$rootScope","$mdSidenav","siteServices",function(e,o,t,n,r,i,l){function a(e){return function(){i(e).toggle()}}var s;e.user={},e.user.name="",e.loggedIn=!1,e.guildRank={},e.title="",e.init=function(){e.areWeLoggedIn(),n.getUser().then(function(o){o&&(e.user=o)},function(o){e.user.name=""})},e.showLoginBottomSheet=function(e){l.showLoadingBottomSheet(e)},e.openMenu=function(e,o){s=o,e(o)},e.goTo=function(t){o.url(t),e.toggle()},e.goToExternal=function(e){window.open(e,"_blank")},r.$on("navbarTitle",function(o,t){e.title=t}),r.$on("loggedin",function(o,t){console.log(t),t.loggedIn===!0?e.user=t:e.user="",e.loggedIn=t.loggedIn}),e.logout=function(){n.logout().then(function(e){},function(e){console.log(e)})},e.areWeLoggedIn=function(){n.currentlyLoggedIn().then(function(o){console.log(o),e.loggedIn=o})},e.toggle=a("left"),e.init()}]),angular.module("BossCollection.controllers").controller("rosterController",["$scope","filterFilter","socketProvider","guildServices","$http","$cookies","$location","siteServices",function(e,o,t,n,r,i,l,a){function s(){var o=i.getObject("ranksList");o&&(e.raiderRanks=o.raiderRanks,e.trialRanks=o.trialRanks,e.guild=o.guild,e.realm=o.realm)}try{(adsbygoogle=window.adsbygoogle||[]).push({})}catch(c){}a.updateTitle("Guild Roster"),e.currentRosterDropdown=!0,e.applicantsDropdown=!1;var u=["placeholder","warrior","paladin","hunter","rogue","priest","death knight","shaman","mage","warlock","monk","druid"];e.raiders=[],e.trials=[],e.trialRanks=[9],e.raiderRanks=[0,2,6],e.guild="mkdir bosscollection",e.realm="zul'jin",e.loading=!0,e.genders=["Male","Female"],s(),$("ul.tabs").tabs(),e.getMembers=function(){e.raiders=[],e.trials=[],e.loading=!0,n.getGuild(e.realm,e.guild).then(function(o){console.log(o),e.loading=!1,g(o)},function(o){e.loading=!1,console.log(o)})},e.getUser=function(){r({method:"POST",url:"/getUser"}).success(function(e){console.log(e)})},e.openArmoryProfile=function(e,o){var t="http://us.battle.net/wow/en/character/"+o+"/"+e+"/simple";window.open(t)},e.saveRanksList=function(){var o={guild:e.guild,realm:e.realm,trialRanks:e.trialRanks,raiderRanks:e.raiderRanks};i.putObject("ranksList",o)};var d=function(o,t,n){try{var r={name:o.character.name,"class":n.charAt(0).toUpperCase()+n.slice(1),rank:t,gender:e.genders[o.character.gender],race:o.character.race,spec:o.character.spec.name,achievementPoints:o.character.achievementPoints,avatar:"http://us.battle.net/static-render/us/"+o.character.thumbnail};return r}catch(i){console.log(o)}},g=function(o){for(var t=0;t<o.length;t++){var n=o[t].rank,r=_.find(e.raiderRanks,function(e){return n==e}),i=_.find(e.trialRanks,function(e){return n==e}),l=u[o[t].character["class"]];r&&e.raiders.push(d(o[t],n,l)),i&&e.trials.push(d(o[t],n,l))}e.raiders.sort(function(e,o){return e.rank-o.rank})};e.lowLvlTrials=[],e.getMembers()}]),angular.module("BossCollection.controllers").controller("absenceController",["$scope","$location","userLoginSrvc","absenceService","siteServices",function(e,o,t,n,r){e.newAbsence={},e.absences={},e.loading=!1,e.typePicked=!1,"/auth/absence"==o.url()?r.updateTitle("Report Absence"):r.updateTitle("Upcoming Absences"),e.getAbsences=function(){e.loading=!0,n.getAbsences().then(function(o){e.loading=!1,e.absences=o.absences},function(o){r.showMessageToast(o),e.loading=!1,console.log(o)})},e.submitNewAbsence=function(){null==e.newAbsence.date?r.showMessageModal("Must select a date"):null==e.newAbsence.type?r.showMessageModal("Must select a type: Late or Absent"):n.submitNewAbsence(e.newAbsence).then(function(e){o.path("/whosOut")},function(e){Materialize.toast(e),console.log(e)})}}]),angular.module("BossCollection.controllers").controller("editAccountController",["$scope","$location","$http","userLoginSrvc","siteServices",function(e,o,t,n,r){r.updateTitle("Account"),n.getUser().then(function(o){console.log("Got the user"),e.user=o}),e.updateAccount=function(){console.log("Updating account"),n.updateAccount(e.user).then(function(e){r.showMessageToast("User updated")},function(o){e.openFromLeft(o)})},e.alreadyLoggedIn=function(){1!=n.loggedIn()&&o.path("/auth/login")},e.openFromLeft=function(e){r.showMessageModal(e)}}]),angular.module("BossCollection.controllers").controller("loginController",["$scope","$location","$http","userLoginSrvc","siteServices",function(e,o,t,n,r){e.user={},e.user.name="","/auth/login"==o.url()&&r.updateTitle("Login"),console.log("Login Controller"),e.user=n.getUser().then(function(e){return"string"!=typeof e.name&&(e.name=""),e},function(e){return{}}),e.alreadyLoggedIn=function(){1==n.loggedIn()&&o.path("/")},e.login=function(){n.login(e.user).then(function(e){console.log(e),"/auth/application"==o.path()?$("#logInModal").closeModal():o.path("/")},function(e){Materialize.toast(e),console.log(e)})},e.cancelNavigation=function(){$("#logInModal").closeModal(),o.path("/")}}]),angular.module("BossCollection.controllers").controller("signupController",["$scope","$location","$http","$timeout","userLoginSrvc","siteServices",function(e,o,t,n,r,i){e.user={},e.passwordsMatch=!1,$("#logInModal").closeModal(),e.register=function(){r.registerNewUser(e.user).then(function(e){console.log(e)},function(o){e.passwordsMatch=!0,e.openFromLeft(o),console.log(o)})},e.openFromLeft=function(e){i.showMessageModal(e)}}]),angular.module("BossCollection.controllers").controller("applicationController",["$scope","$location","$http","$timeout","realmServices","guildServices","userLoginSrvc","siteServices",function(e,o,t,n,r,i,l,a){a.updateTitle("Applications"),console.log("Loading application ctrl..."),e.application={};try{(adsbygoogle=window.adsbygoogle||[]).push({})}catch(s){}e.validCharacterName=!1,r.getRealms().then(function(o){e.realms=o,n(function(){$("select").material_select()},100)}),e.areWeLoggedIn=function(){l.currentlyLoggedIn().then(function(e){1==e||$("#logInModal").openModal({dismissible:!1,opacity:.5,in_duration:300,out_duration:200,complete:function(){}})})},e.validateCharactername=function(){e.validCharacterName=!1,e.searchingForUser=!0,i.validateCharacterName(e.application.characterName,e.application.realm.name).then(function(o){e.validCharacterName=!0,e.application.character=o},function(o){e.validCharacterName=!1})["finally"](function(){e.searchingForUser=!1})},e.submitApplication=function(){0==e.validCharacterName?Materialize.toast("Sorry, we couldn't find your character. Please verify your Realm and Character are correct."):i.submitApplication(e.application).then(function(e){o.path("/reviewApplications")},function(e){Materialize.toast(e)})},e.areWeLoggedIn()}]),angular.module("BossCollection.controllers").controller("applicationsReviewController",["$scope","$location","$http","$timeout","guildServices","siteServices",function(e,o,t,n,r,i){function l(){for(var o=0;o<e.applications.length;o++){var t=s[e.applications[o].character["class"]];e.applications[o].character["class"]=t.charAt(0).toUpperCase()+t.slice(1)}}i.updateTitle("View Applications");try{(adsbygoogle=window.adsbygoogle||[]).push({})}catch(a){}var s=["placeholder","warrior","paladin","hunter","rogue","priest","death knight","shaman","mage","warlock","monk","druid"];e.loading=!0,r.getApplications().then(function(o){e.loading=!1,e.applications=o.applications,console.log(e.applications),l()},function(o){e.loading=!1,console.log(o),Materialize.toast("Seems something broke. Try again in a few...")})}]),angular.module("BossCollection.controllers").controller("forumsController",["$scope","$location","$http","userLoginSrvc","$rootScope",function(e,o,t,n,r){e.user.name=n.getUser(),void 0==e.user.name&&o.path("/")}]),angular.module("BossCollection.controllers").controller("strategyRoomController",["$scope",function(e){}]),angular.module("BossCollection.controllers").controller("bossStrategyController",["$scope","bossStrats","socketProvider","$routeParams",function(e,o,t,n){function r(){for(var o in e.raidToDisplay)e.raidToDisplay[o].isSelected=!1}function i(){document.getElementById("sideNavID").style.height=window.outerHeight/2+"px"}function l(e){return/(?:https?:\/\/|www\.|m\.|^)youtu(?:be\.com\/watch\?(?:.*?&(?:amp;)?)?v=|\.be\/)([\w‌​\-]+)(?:&(?:amp;)?[\w\?=]*)?/.test(e)}e.highmaulBossSelected=!1,e.brfBossSelected=!1,e.hfcBossSelected=!1,$(".modal-trigger").leanModal();try{(adsbygoogle=window.adsbygoogle||[]).push({})}catch(a){console.log("Google broke again")}var s=n.raid;e.highmaul="hm",e.brf="brf",e.hfc="hfc",e.bossInfo={},e.loadChat=!1,e.difficultySelected="",e.currentEmbedUrl="",e.addNewBoss=!1,e.currentRaid={},e.raidToDisplay={},e.name="",e.url="",e.init=function(){i(),o.getStrats(s).then(function(o){e.raidToDisplay=o.bosses,e.raidData=o,r()})},e.addVideo=function(o,t,n){e.currentBoss=o,e.currentDifficulty=t,e.currentRaid=n},e.saveNewBossInfo=function(t,n,r,i){if(console.log(r),l(n)){var a=n.split("&");a=a[0].split("="),n=a[1],"heroic"==i?r.heroic.videos[r.heroic.videos.length]={name:t,url:n}:"mythic"==i&&(r.mythic.videos[r.mythic.videos.length]={name:t,url:n}),e.raidData.bosses=e.raidToDisplay,console.log(e.raidData),o.saveStrats(e.raidData,n),e.addNewBoss=!1,e.name="",e.url="",e.addNewBoss=!e.addNewBoss}else $("#urlInput").popover("show")},e.changeBossInfo=function(o,t){o.isSelected=!o.isSelected,e.bossSelected=o.name,e.addNewBoss=!1},e.changeDifficulty=function(e,o){e.difficultySelected=o,"- Heroic"==o?(e.heroic.isSelected=!e.heroic.isSelected,e.mythic.isSelected=!1):(e.mythic.isSelected=!e.mythic.isSelected,e.heroic.isSelected=!1)},e.setUrl=function(o){e.currentEmbedUrl=o},e.open=function(o){e.setUrl(o),console.log(o),$("#bossVideo").openModal()},e.init()}]),angular.module("BossCollection.controllers").controller("bossStrategyController",["$scope","bossStrats","$modal","socketProvider","$routeParams",function(e,o,t,n,r){function i(){for(var o in e.raidToDisplay)e.raidToDisplay[o].isSelected=!1}function l(){document.getElementById("sideNavID").style.height=window.outerHeight/2+"px"}function a(e){return/(?:https?:\/\/|www\.|m\.|^)youtu(?:be\.com\/watch\?(?:.*?&(?:amp;)?)?v=|\.be\/)([\w‌​\-]+)(?:&(?:amp;)?[\w\?=]*)?/.test(e)}e.highmaulBossSelected=!1,e.brfBossSelected=!1,e.hfcBossSelected=!1;try{(adsbygoogle=window.adsbygoogle||[]).push({})}catch(s){console.log("Google broke again")}var c=r.raid;e.highmaul="hm",e.brf="brf",e.hfc="hfc",e.bossInfo={},e.loadChat=!1,e.difficultySelected="",e.currentEmbedUrl="",e.addNewBoss=!1,e.currentRaid={},e.raidToDisplay={},e.name="",e.url="",e.init=function(){l(),o.getStrats(c).then(function(o){e.raidToDisplay=o.bosses,e.raidData=o,i()})},e.addVideo=function(o,t,n){e.currentBoss=o,e.currentDifficulty=t,e.currentRaid=n},e.saveNewBossInfo=function(t,n,r,i){if(console.log(r),a(n)){var l=n.split("&");l=l[0].split("="),n=l[1],"heroic"==i?r.heroic.videos[r.heroic.videos.length]={name:t,url:n}:"mythic"==i&&(r.mythic.videos[r.mythic.videos.length]={name:t,url:n}),e.raidData.bosses=e.raidToDisplay,console.log(e.raidData),o.saveStrats(e.raidData,n),e.addNewBoss=!1,e.name="",e.url="",e.addNewBoss=!e.addNewBoss}else $("#urlInput").popover("show")},e.changeBossInfo=function(o,t){o.isSelected=!o.isSelected,e.bossSelected=o.name,e.addNewBoss=!1},e.changeDifficulty=function(e,o){e.difficultySelected=o,"- Heroic"==o?(e.heroic.isSelected=!e.heroic.isSelected,e.mythic.isSelected=!1):(e.mythic.isSelected=!e.mythic.isSelected,e.heroic.isSelected=!1)},e.setUrl=function(o){e.currentEmbedUrl=o},e.open=function(o){e.setUrl(o),console.log(o);t.open({templateUrl:"videoModal",controller:"videoController",size:"lg",windowClass:"videoModal",resolve:{currentUrl:function(){return e.currentEmbedUrl}}})},e.init()}]),angular.module("BossCollection.controllers").controller("videoController",["$scope","currentUrl","$modalInstance",function(e,o,t){e.url=o,e.getIframeSrc=function(){return"https://www.youtube.com/embed/"+e.url},e.close=function(){t.dismiss("cancel")},e.embedUrl=e.url}]),angular.module("BossCollection.directives",[]),angular.module("BossCollection.directives").directive("bossstrategies",[function(){return{restrict:"E",templateUrl:"bossStrategy",controller:"bossStrategyController",link:function(e,o,t){}}}]),angular.module("BossCollection.directives").directive("logIn",[function(){return{restrict:"E",templateUrl:"login",controller:"loginController",link:function(e,o,t){}}}]),angular.module("BossCollection.filters",[]),angular.module("BossCollection.filters").filter("interpolate",function(e){return function(o){return String(o).replace(/\%VERSION\%/gm,e)}}),angular.module("BossCollection.services",[]),angular.module("BossCollection.services").factory("absenceService",["$resource","$q","$location","$cookies","$rootScope","siteServices",function(e,o,t,n,r,i){var l=e("/api/absence",{},{}),a={submitNewAbsence:function(e){var t=o.defer();return i.startLoading(),l.save(e).$promise.then(function(e){t.resolve(e)},function(e){console.log(e),t.reject(e.data)})["finally"](function(){i.loadingFinished()}),t.promise},getAbsences:function(){var e=o.defer();return l.get().$promise.then(function(o){e.resolve(o)},function(o){console.log(o),e.reject(o.data)})["finally"](function(){i.loadingFinished()}),e.promise}};return a}]),angular.module("BossCollection.services").factory("bossStrats",["socketProvider","$resource","$q",function(e,o,t){var n=o("/api/bossStrats",{},{update:{method:"PUT"}}),r={getStrats:function(e){var o=t.defer();console.log("Request Boss Info");var r={name:e};return n.save(r).$promise.then(function(e){console.log("Result: "),console.log(e),o.resolve(e.result)}),o.promise},saveStrats:function(e,o){console.log("Saving info now");var t={raidData:e,url:o};t=angular.toJson(t),console.log(t),n.data=t,n.update(t,function(e){console.log("Result: "+e)})}};return r}]),angular.module("BossCollection.services").factory("guildServices",["$http","$q","$resource","siteServices",function(e,o,t,n){var r="https://us.api.battle.net/wow/guild/",i="?fields=members&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d",l=t("/api/applicationSubmission",{},{}),a=t("/api/getApplications",{},{}),s={getApplications:function(){var e=o.defer();return n.startLoading(),a.get().$promise.then(function(o){e.resolve(o)},function(o){e.reject(o)})["finally"](function(){n.loadingFinished()}),e.promise},validateCharacterName:function(e,n){var r=o.defer(),i="https://us.api.battle.net/wow/character/"+n+"/"+e+"?locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d",l=t(i,{},{});return l.get().$promise.then(function(e){r.resolve(e)},function(e){r.reject("Character not found")}),r.promise},getGuild:function(t,l){var a=o.defer();if(n.startLoading(),""!=t&&""!=l)var s=r+encodeURIComponent(t)+"/"+encodeURIComponent(l)+i;return e({method:"GET",url:s}).then(function(e){a.resolve(e.data.members)},function(e){a.reject(e)})["finally"](function(){n.loadingFinished()}),a.promise},submitApplication:function(e){var r=o.defer(),i="https://us.api.battle.net/wow/character/"+e.realm.name+"/"+e.character.name+"?fields=talents&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d",a=t(i,{},{});return n.startLoading(),a.get().$promise.then(function(e){return e},function(e){r.reject("Character not found")}).then(function(o){e.character.specs=o.talents,l.save({newApplicant:e}).$promise.then(function(e){n.loadingFinished(),r.resolve(e)},function(e){r.reject(e)})})["finally"](function(){n.loadingFinished()}),r.promise}};return s}]),angular.module("BossCollection.services").factory("realmServices",["$http","$q",function(e,o){function t(){}var n="https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d",r=[];t();var i={getRealms:function(){var t=o.defer();return 0==r.length?e({method:"GET",url:n}).success(function(e){r=e.realms,t.resolve(r),r=r}):t.resolve(r),t.promise}};return i}]),angular.module("BossCollection.services").factory("siteServices",["$rootScope","$mdBottomSheet","$mdDialog","$mdToast",function(e,o,t,n){function r(){$("#loadingModal").openModal({dismissible:!1})}function i(){$("#loadingModal").closeModal()}function l(o){e.$broadcast("navbarTitle",o)}function a(e){o.show({templateUrl:"logInModal",controller:"loginController",targetEvent:e})}function s(){o.hide()}function c(e){t.show(t.alert().clickOutsideToClose(!0).title("Error").textContent(e).ariaLabel("message popup").ok("Got it!").openFrom({left:-50,width:30,height:80}).closeTo({right:1500}))}function u(e){n.show(n.simple().textContent(e).position("top").hideDelay(4e3))}return{startLoading:r,loadingFinished:i,updateTitle:l,showLoadingBottomSheet:a,hideLoadingBottomSheet:s,showMessageModal:c,showMessageToast:u}}]),angular.module("BossCollection.services").factory("socketProvider",[function(){var e=io("http://bosscollection.net:4001");return e}]),angular.module("BossCollection.services").factory("userLoginSrvc",["$resource","$q","$location","$cookies","$rootScope","siteServices",function(e,o,t,n,r,i){var l=e("/auth/signup",{},{}),a=e("/auth/login",{},{}),s=e("/auth/logout",{},{}),c=e("/auth/loggedin",{},{}),u=e("/auth/updateAccount",{},{}),d=e("/auth/currentUser",{},{}),g={updateAccount:function(e){var t=o.defer();return i.startLoading(),u.save(e).$promise.then(function(e){t.resolve(e)},function(e){console.log(e),t.reject(e.data)})["finally"](function(){i.loadingFinished()}),t.promise},getUser:function(){var e=o.defer();return d.get().$promise.then(function(o){console.log(o),e.resolve(o)},function(o){e.reject(o)})["finally"](function(){i.loadingFinished()}),e.promise},currentlyLoggedIn:function(){var e=o.defer(),t=!1;return c.save({}).$promise.then(function(o){1==o.loggedIn?(n.put("name",o.user.name),t=!0,r.$broadcast("loggedin",{name:o.user.name,loggedIn:!0})):t=!1,console.log(o),e.resolve(t)},function(o){console.log(o),e.reject(o)})["finally"](function(){i.loadingFinished()}),e.promise},logout:function(){var e=o.defer();return i.startLoading(),s.save({}).$promise.then(function(e){1==e.loggedOut&&r.$broadcast("loggedin",{loggedIn:!1}),t.path("/")},function(e){r.$broadcast("loggedin",{loggedIn:!1}),i.loadingFinished(),t.path("/")})["finally"](function(){i.loadingFinished()}),e.promise},registerNewUser:function(e){var n=o.defer();return console.log("Register new user"),i.startLoading(),l.save(e).$promise.then(function(e){console.log("Registration successfull. Redirecting to login page"),console.log(e),t.path("/auth/login")},function(e){console.log(e.data),n.reject(e.data)})["finally"](function(){i.loadingFinished()}),n.promise},login:function(e){var t=o.defer();return i.startLoading(),a.save(e).$promise.then(function(e){g.currentlyLoggedIn().then(function(e){t.resolve(!0)},function(e){console.log(e),t.reject(!1)})},function(e){t.reject(e.data)})["finally"](function(){i.hideLoadingBottomSheet(),i.loadingFinished()}),t.promise}};return g}]);