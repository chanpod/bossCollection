var ModuleName = "BossCollection.services"
angular.module(ModuleName, []);

require('./googleSheetsService.js');
require('./permissionsService.js');
require('./pushNotifications.js');
require('./realmsService.js');
require('./siteServices.js');

export default ModuleName;