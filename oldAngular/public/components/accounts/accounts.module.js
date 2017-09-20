var ModuleName = "BossCollection.accounts";

angular.module(ModuleName, ['BossCollection.services']);

require("./userLoginService.js")
require("./accounts/editAccountController.js")
require("./accounts/loginController.js")
require("./accounts/signupCtrl.js")
require("./loginDirective.js")

export default ModuleName;

