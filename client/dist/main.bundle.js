webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<layout></layout>\r\n<div class=\"row center-xs\">\r\n    <div class=\"col-xs-12 center-xs\">\r\n        <router-outlet></router-outlet>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(userService, toastr, vRef) {
        this.userService = userService;
        this.toastr = toastr;
        this.title = 'app';
        this.userService.getUser();
        this.toastr.setRootViewContainerRef(vRef);
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr__["ToastsManager"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _c || Object])
], AppComponent);

var _a, _b, _c;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ngx_cookie__ = __webpack_require__("../../../../ngx-cookie/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angular2_markdown__ = __webpack_require__("../../../../angular2-markdown/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__home_newTab_component__ = __webpack_require__("../../../../../src/app/home/newTab.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__routing_routing_module__ = __webpack_require__("../../../../../src/app/routing/routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__layout_layout_component__ = __webpack_require__("../../../../../src/app/layout/layout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_api_service__ = __webpack_require__("../../../../../src/app/services/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_guild_service__ = __webpack_require__("../../../../../src/app/services/guild.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_blizzard_service__ = __webpack_require__("../../../../../src/app/services/blizzard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__application_application_module__ = __webpack_require__("../../../../../src/app/application/application.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





//3rd Party






//Components



//Routing


//Services




//Modules

var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_12__home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_13__home_newTab_component__["a" /* DialogOverviewExampleDialog */],
            __WEBPACK_IMPORTED_MODULE_15__layout_layout_component__["a" /* LayoutComponent */],
            __WEBPACK_IMPORTED_MODULE_11__login_login_component__["a" /* LoginComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_13__home_newTab_component__["a" /* DialogOverviewExampleDialog */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_14__routing_routing_module__["a" /* RoutingModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_9_ngx_cookie__["a" /* CookieModule */],
            __WEBPACK_IMPORTED_MODULE_10_angular2_markdown__["a" /* MarkdownModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_8_ng2_toastr_ng2_toastr__["ToastModule"].forRoot(),
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["j" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_20__application_application_module__["a" /* ApplicationModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_16__services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_17__services_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_18__services_guild_service__["a" /* GuildService */],
            __WEBPACK_IMPORTED_MODULE_19__services_blizzard_service__["a" /* BlizzardService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/application/application.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_application_create_application_component__ = __webpack_require__("../../../../../src/app/application/create-application/create-application.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routing_routing_module__ = __webpack_require__("../../../../../src/app/application/routing/routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_toastr_ng2_toastr__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




//Routing

//3rd Party




var ApplicationModule = (function () {
    function ApplicationModule() {
    }
    return ApplicationModule;
}());
ApplicationModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_4__routing_routing_module__["a" /* RoutingModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["j" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_8_ng2_toastr_ng2_toastr__["ToastModule"],
            __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MaterialModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__create_application_create_application_component__["a" /* CreateApplicationComponent */]]
    })
], ApplicationModule);

//# sourceMappingURL=application.module.js.map

/***/ }),

/***/ "../../../../../src/app/application/create-application/create-application.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".commentsInput{\r\n    min-height:200px;\r\n}\r\n\r\n.redIcon{\r\n    color:red;\r\n}\r\n\r\n.greenIcon{\r\n    color:green;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/application/create-application/create-application.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row center-xs\">\r\n    <div class=\"col-xs-8\">\r\n        <h2> Application for TBD </h2>\r\n\r\n        <hr />\r\n    </div>\r\n    <div class=\"col-xs-11 col-md-6 row\">\r\n\r\n        <form [formGroup]=\"CreateAppFormGroup\" class=\"row\">\r\n\r\n\r\n            <md-form-field class=\"col-xs-11 col-md-7\">\r\n                <input required (blur)=\"checkCharacterName()\" mdInput placeholder=\"Character Name\" name=\"name\" formControlName=\"character\"\r\n                />\r\n            </md-form-field>\r\n\r\n            <button style=\"padding-top:10px;\" md-icon-button>\r\n                    <md-icon [style.color] = \"iconColor\"> {{icon}} </md-icon>\r\n                </button>\r\n\r\n\r\n            <md-select formControlName=\"realm\" (blur)=\"checkCharacterName()\" class=\"col-xs-12 col-md-7\" placeholder=\"Select Realm\">\r\n                <md-option *ngFor=\"let realm of realms\" [value]=\"realm.name\">\r\n                    {{ realm.name }}\r\n                </md-option>\r\n            </md-select>\r\n\r\n            <md-form-field class=\"col-xs-12 col-md-7\">\r\n                <input mdInput placeholder=\"Previous Guild\" name=\"previousGuild\" formControlName=\"previousGuild\" />\r\n            </md-form-field>\r\n\r\n            <!-- <md-form-field class=\"col-xs-12 col-md-6\">\r\n                <input mdInput placeholder=\"Desired Role\" name=\"desiredRole\" formControlName=\"desiredRole\" />\r\n            </md-form-field> -->\r\n            <md-select formControlName=\"desiredRole\" placeholder=\"Desired Role\" class=\"col-xs-12 col-md-7\">\r\n\r\n                <md-option value=\"Ranged DPS\">\r\n                    Ranged DPS\r\n                </md-option>\r\n\r\n                <md-option value=\"Melee DPS\">\r\n                    Melee DPS\r\n                </md-option>\r\n\r\n                <md-option value=\"Tank\">\r\n                    Tank\r\n                </md-option>\r\n\r\n                <md-option value=\"Healer\">\r\n                    Healer\r\n                </md-option>\r\n\r\n            </md-select>\r\n            <md-form-field class=\"col-xs-12 col-md-12\">\r\n                <textarea class=\"commentsInput\" mdInput placeholder=\"Tell us about yourself\" name=\"desiredRole\" formControlName=\"comments\"> </textarea>\r\n\r\n            </md-form-field>\r\n\r\n            <div class=\"col-xs-12\">\r\n                <button [disabled]=\"!CreateAppFormGroup.valid\" md-raised-button color=\"primary\" (click) = \"submitApplication()\"> Submit </button>\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/application/create-application/create-application.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateApplicationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_blizzard_service__ = __webpack_require__("../../../../../src/app/services/blizzard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_guild_service__ = __webpack_require__("../../../../../src/app/services/guild.service.ts");
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CreateApplicationComponent = (function () {
    function CreateApplicationComponent(userService, blizzardService, guildService) {
        this.userService = userService;
        this.blizzardService = blizzardService;
        this.guildService = guildService;
        this.characterIsValid = false;
        this.characterIsValid = false;
        this.validateCharacter = this.validateCharacter.bind(this);
    }
    CreateApplicationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.iconColor = "red";
        this.icon = "cancel";
        this.application = {
            character: "",
            realm: "",
            desiredRole: "",
            guildName: "TBD",
            previousGuild: '',
            comments: ''
        };
        this.CreateAppFormGroup = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            character: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', this.validateCharacter),
            realm: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](),
            previousGuild: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](),
            desiredRole: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* Validators */].required),
            comments: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]()
        });
        this.blizzardService.getRealms()
            .subscribe(function (realms) {
            _this.realms = realms.realms;
        });
    };
    CreateApplicationComponent.prototype.checkCharacterName = function () {
        var _this = this;
        this.iconColor = "red";
        this.icon = "cancel";
        this.characterIsValid = false;
        var character = this.CreateAppFormGroup.controls.character.value;
        var realmName = this.CreateAppFormGroup.controls.realm.value;
        this.blizzardService.getCharacter(realmName, character)
            .subscribe(function (result) {
            console.log(result);
            _this.iconColor = "green";
            _this.icon = "check_circle";
            _this.characterIsValid = true;
            _this.CreateAppFormGroup.controls.character.updateValueAndValidity();
        }, function (error) {
            console.log(error);
        });
    };
    CreateApplicationComponent.prototype.validateCharacter = function (c) {
        if (this.characterIsValid == true) {
            return null;
        }
        else {
            return {
                validateCharacter: {
                    valid: false
                }
            };
        }
    };
    CreateApplicationComponent.prototype.submitApplication = function () {
        var formGroup = this.CreateAppFormGroup.value;
        this.application = __assign({ guildName: this.application.guildName }, formGroup);
        this.guildService.submitApplication(this.application)
            .subscribe(function (result) {
            console.log(result);
        }, function (error) {
            console.log(error);
        });
    };
    return CreateApplicationComponent;
}());
CreateApplicationComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-create-application',
        template: __webpack_require__("../../../../../src/app/application/create-application/create-application.component.html"),
        styles: [__webpack_require__("../../../../../src/app/application/create-application/create-application.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_blizzard_service__["a" /* BlizzardService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_blizzard_service__["a" /* BlizzardService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_guild_service__["a" /* GuildService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_guild_service__["a" /* GuildService */]) === "function" && _c || Object])
], CreateApplicationComponent);

var _a, _b, _c;
//# sourceMappingURL=create-application.component.js.map

/***/ }),

/***/ "../../../../../src/app/application/routing/routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_application_create_application_component__ = __webpack_require__("../../../../../src/app/application/create-application/create-application.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


//Components

var routes = [
    {
        path: 'createApplication', component: __WEBPACK_IMPORTED_MODULE_2__create_application_create_application_component__["a" /* CreateApplicationComponent */]
    }
];
var RoutingModule = (function () {
    function RoutingModule() {
    }
    return RoutingModule;
}());
RoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(routes)
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
    })
], RoutingModule);

//# sourceMappingURL=routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n.card-shadow{\r\n    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);\r\n}\r\n\r\n.logBackdrop{\r\n    background-color: black;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row col-xs-12 light-theme center-xs\">\r\n  <div class=\"col-xs-12 logBackdrop\">\r\n\r\n    <img src=\"assets/images/TBDLogo.png\" style=\"width: 50%;height:100%\" />\r\n  </div>\r\n\r\n  <button *ngIf=\"userService.isGM()\" md-raised-button color=\"accent\" (click)=\"openNewTabDialog()\"> New Tab </button>\r\n\r\n  <div class=\"col-md-8 col-xs-12\">\r\n\r\n\r\n    <md-tab-group class=\"card-shadow\">\r\n      <div *ngFor=\"let tab of tabs; let i = index\">\r\n\r\n        <md-tab [label]=\"tab.title\">\r\n          <md-card>\r\n            <md-card-content>\r\n\r\n              <markdown style=\"text-align: start;\" [data]=\"tab.content\"> </markdown>\r\n\r\n              <div *ngIf=\"editingTab\">\r\n                <md-toolbar color=\"accent\" class=\"row center-xs\">\r\n                  Modify Content - Preview Changes above\r\n                  <a target = \"_blank\" href=\"https://dimpu.github.io/angular2-markdown/\" md-icon-button>\r\n                    <md-icon mdTooltip=\"Markdown Help\" class=\"md-24\" aria-label=\"helpIcon\">help</md-icon>\r\n                  </a>\r\n\r\n                  HTML supported\r\n                </md-toolbar>\r\n                <textarea style=\"width:95%;min-height:250px;\" [(ngModel)]=\"tab.content\"> {{tab.content}}</textarea>\r\n              </div>\r\n\r\n            </md-card-content>\r\n\r\n            <md-card-actions *ngIf=\"userService.isGM()\">\r\n\r\n              <button md-icon-button *ngIf=\"!editingTab\">\r\n                      <md-icon class=\"md-24\" aria-label=\"edit icon\" (click) = \"toggleEditing()\">edit</md-icon>\r\n                    </button>\r\n\r\n              <button md-icon-button *ngIf=\"editingTab\" (click)=\"saveTabs()\">\r\n                          <md-icon class=\"md-24\" aria-label=\"save icon\">save</md-icon>\r\n                      </button>\r\n\r\n              <button md-icon-button *ngIf=\"editingTab\" (click)=\"toggleEditing()\">\r\n                          <md-icon mdTooltip=\"Cancel\" class=\"md-24\" aria-label=\"cancel icon\">cancel</md-icon>\r\n                      </button>\r\n\r\n              <button md-icon-button>\r\n                          <md-icon class=\"md-24\" aria-label=\"delete icon\" (click) = \"deleteTab(i)\">delete</md-icon>\r\n                      </button>\r\n\r\n\r\n            </md-card-actions>\r\n\r\n          </md-card>\r\n        </md-tab>\r\n\r\n      </div>\r\n\r\n\r\n    </md-tab-group>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_guild_service__ = __webpack_require__("../../../../../src/app/services/guild.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__newTab_component__ = __webpack_require__("../../../../../src/app/home/newTab.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomeComponent = (function () {
    function HomeComponent(userService, guildService, toastr, dialog) {
        this.userService = userService;
        this.guildService = guildService;
        this.toastr = toastr;
        this.dialog = dialog;
        this.user = {};
        this.tabs = [];
        this.editingTab = false;
        this.newTab = { title: '', content: '' };
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.editingTab = false;
        this.userService.user.subscribe(function (user) {
            _this.user = user;
            _this.getTabs();
        });
    };
    HomeComponent.prototype.openNewTabDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_5__newTab_component__["a" /* DialogOverviewExampleDialog */], {
            width: '250px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != null) {
                _this.createTab(result);
            }
        });
    };
    HomeComponent.prototype.saveTabs = function () {
        var _this = this;
        var guildName = this.user.guild.name;
        this.user.guild.tabs = this.tabs;
        this.guildService.updateTabs(this.user.guild, guildName)
            .subscribe(function (result) {
            _this.toastr.success("Successfully saved", "Saving Tabs");
            _this.toggleEditing();
        }, function (error) {
            _this.toastr.error("Uh oh. Something broke!", "Error");
        });
    };
    HomeComponent.prototype.deleteTab = function (index) {
        var tabs = this.tabs;
        this.user.guild.tabs = tabs.splice(index, 1);
        this.saveTabs();
    };
    HomeComponent.prototype.createTab = function (newTabName) {
        var tab = Object.assign(this.newTab);
        tab.title = newTabName;
        this.tabs.push(tab);
        this.saveTabs();
    };
    HomeComponent.prototype.getTabs = function () {
        var _this = this;
        var guildName = "";
        if (this.user.guild) {
            guildName = this.user.guild.name;
        }
        else {
            guildName = "TBD";
        }
        this.guildService.getTabs(guildName)
            .subscribe(function (response) {
            _this.tabs = response.guild.tabs;
        });
    };
    HomeComponent.prototype.toggleEditing = function () {
        this.editingTab = !this.editingTab;
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-home',
        template: __webpack_require__("../../../../../src/app/home/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/home/home.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_guild_service__["a" /* GuildService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_guild_service__["a" /* GuildService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__["ToastsManager"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MdDialog */]) === "function" && _d || Object])
], HomeComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/home/newTab.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogOverviewExampleDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DialogOverviewExampleDialog = (function () {
    function DialogOverviewExampleDialog(dialogRef) {
        this.dialogRef = dialogRef;
    }
    DialogOverviewExampleDialog.prototype.onNoClick = function () {
        this.dialogRef.close(null);
    };
    DialogOverviewExampleDialog.prototype.Cancel = function () {
        this.dialogRef.close(null);
    };
    DialogOverviewExampleDialog.prototype.Save = function () {
        this.dialogRef.close(this.title);
    };
    return DialogOverviewExampleDialog;
}());
DialogOverviewExampleDialog = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'newTabDialog',
        template: __webpack_require__("../../../../../src/app/home/newTabDialog.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialogRef */]) === "function" && _a || Object])
], DialogOverviewExampleDialog);

var _a;
//# sourceMappingURL=newTab.component.js.map

/***/ }),

/***/ "../../../../../src/app/home/newTabDialog.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"light-theme\">\r\n\r\n    <md-form-field>\r\n        <input mdInput placeholder=\"Tab Name\" [(ngModel)] = \"title\">\r\n    </md-form-field>\r\n\r\n    <button md-raised-button (click)=\"Save()\"> Save </button>\r\n    <button md-raised-button (click)=\"Cancel()\"> Cancel </button>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/layout.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/layout.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\r\n<div class=\"dark-theme\">\r\n\r\n  <md-toolbar color=\"primary\" class=\"row center-xs\">\r\n\r\n    <div class=\"col-xs-3 col-sm-4 hidden-xs row start-xs\">\r\n      <span *ngIf=\"user?.name != undefined\"> Welcome {{user.name}} </span>\r\n      <button *ngIf=\"user?.name == undefined\" md-button routerLink=\"\"> Home </button>\r\n    </div>\r\n\r\n    <div class=\"col-xs-3 hidden-sm hidden-md hidden-lg\">\r\n\r\n    </div>\r\n\r\n    <div class=\"col-xs-6 col-sm-4 center-xs\">\r\n      <a md-button routerLink = \"\" style = \"font-size: 20px;\"> TBD </a>\r\n    </div>\r\n\r\n    <div class=\"col-xs-3 col-sm-4\">\r\n\r\n      <div class=\"row end-xs\">\r\n        <button *ngIf=\"user?.name == undefined\" md-raised-button color=\"accent\" routerLink=\"login\"> Login </button>\r\n        <button *ngIf=\"user?.name != undefined\" md-raised-button color=\"accent\" (click)=\"logout()\"> Logout </button>\r\n        <button *ngIf=\"user?.name != undefined\" md-raised-button color=\"accent\" routerLink=\"createApplication\"> Apply </button>\r\n      </div>\r\n\r\n    </div>\r\n\r\n\r\n\r\n  </md-toolbar>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/layout.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//3rd party
var LayoutComponent = (function () {
    function LayoutComponent(userService) {
        var _this = this;
        this.userService = userService;
        this.user = undefined;
        userService.user.subscribe(function (user) {
            _this.updateBasedOnUser(user);
        });
    }
    LayoutComponent.prototype.ngOnInit = function () {
    };
    LayoutComponent.prototype.updateBasedOnUser = function (user) {
        this.user = user;
    };
    LayoutComponent.prototype.logout = function () {
        this.userService.logout();
    };
    return LayoutComponent;
}());
LayoutComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'layout',
        template: __webpack_require__("../../../../../src/app/layout/layout.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/layout.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === "function" && _a || Object])
], LayoutComponent);

var _a;
//# sourceMappingURL=layout.component.js.map

/***/ }),

/***/ "../../../../../src/app/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row center-xs\">\r\n\r\n\r\n  <md-card>\r\n    <md-card-header>\r\n      <md-card-title>\r\n        <h2>Login </h2>\r\n      </md-card-title>\r\n    </md-card-header>\r\n\r\n    <hr />\r\n\r\n    <md-card-content>\r\n\r\n      <div class=\"row \">\r\n\r\n        <div class=\"xs-col-12\">\r\n          <form class=\"row center-xs\" [formGroup]=\"LoginForm\">\r\n\r\n            <md-form-field class=\"col-xs-12\">\r\n              <input mdInput placeholder=\"username\" name=\"name\" formControlName=\"Name\" />\r\n            </md-form-field>\r\n\r\n            <md-form-field class=\"col-xs-12\">\r\n              <input mdInput placeholder=\"password\" type=\"password\" formControlName=\"Password\" />\r\n            </md-form-field>\r\n\r\n            <div class=\"col-xs-12 start-xs\">\r\n              <button md-raised-button (click)=\"login()\"> Login </button>\r\n            </div>\r\n          </form>\r\n        </div>\r\n\r\n      </div>\r\n    </md-card-content>\r\n  </md-card>\r\n\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = (function () {
    function LoginComponent(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.LoginForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            Name: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](''),
            Password: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('')
        });
        this.userService.user.subscribe(function (user) {
            if (user.name != undefined) {
                _this.router.navigate(['']);
            }
        });
    };
    LoginComponent.prototype.login = function () {
        this.userService.login(this.LoginForm.controls.Name.value, this.LoginForm.controls.Password.value);
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-login',
        template: __webpack_require__("../../../../../src/app/login/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/login/login.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _b || Object])
], LoginComponent);

var _a, _b;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/routing/routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


//Components


var routes = [
    {
        path: '', component: __WEBPACK_IMPORTED_MODULE_2__home_home_component__["a" /* HomeComponent */]
    },
    {
        path: 'login', component: __WEBPACK_IMPORTED_MODULE_3__login_login_component__["a" /* LoginComponent */]
    }
];
var RoutingModule = (function () {
    function RoutingModule() {
    }
    return RoutingModule;
}());
RoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(routes)
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
    })
], RoutingModule);

//# sourceMappingURL=routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/services/api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ApiService = (function () {
    function ApiService(http) {
        this.http = http;
        this.url = "/api";
    }
    ApiService.prototype.get = function (url) {
        return this.http.get(this.url + url)
            .map(function (res) { return res.json(); });
    };
    ApiService.prototype.post = function (url, body) {
        return this.http.post(this.url + url, body)
            .map(function (res) { return res.json(); });
    };
    return ApiService;
}());
ApiService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _a || Object])
], ApiService);

var _a;
//# sourceMappingURL=api.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/blizzard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlizzardService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BlizzardService = (function () {
    function BlizzardService(http) {
        this.http = http;
        this.api = "https://us.api.battle.net/wow";
        this.apiKey = "fqvadba9c8auw7brtdr72vv7hfntbx7d";
    }
    BlizzardService.prototype.getCharacter = function (realmName, characterName) {
        var url = "/character/" + realmName + "/" + characterName + "?" + this.getEndOfApiUrl();
        return this.get(this.api + url);
    };
    BlizzardService.prototype.getRealms = function () {
        var url = "/realm/status?" + this.getEndOfApiUrl();
        return this.get(this.api + url);
    };
    BlizzardService.prototype.getEndOfApiUrl = function () {
        return "locale=en_US&apikey=" + this.apiKey;
    };
    BlizzardService.prototype.get = function (url) {
        return this.http.get(url).map(function (response) { return response.json(); });
    };
    return BlizzardService;
}());
BlizzardService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _a || Object])
], BlizzardService);

var _a;
//# sourceMappingURL=blizzard.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/guild.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GuildService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_service__ = __webpack_require__("../../../../../src/app/services/api.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GuildService = (function () {
    function GuildService(apiService) {
        this.apiService = apiService;
        this.GUILD_API_BASE_URL = "/guild/guild";
        this.APP_API_BASE_URL = "/guild/applications";
    }
    GuildService.prototype.getTabs = function (guildName) {
        return this.apiService.get(this.GUILD_API_BASE_URL + "/guildHomepage/" + guildName);
    };
    GuildService.prototype.updateTabs = function (guildObject, guildName) {
        var body = {
            guild: guildObject
        };
        return this.apiService.post(this.GUILD_API_BASE_URL + "/guildHomepage/" + guildName, body);
    };
    GuildService.prototype.submitApplication = function (newApplication) {
        var body = { "newApplicant": newApplication };
        return this.apiService.post(this.APP_API_BASE_URL + "/applicationSubmission", body);
    };
    return GuildService;
}());
GuildService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__api_service__["a" /* ApiService */]) === "function" && _a || Object])
], GuildService);

var _a;
//# sourceMappingURL=guild.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_service__ = __webpack_require__("../../../../../src/app/services/api.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserService = (function () {
    function UserService(apiService) {
        this.apiService = apiService;
        this.user = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["BehaviorSubject"]({});
        this.ACCOUNT_API_URL_BASE = "/account";
    }
    UserService.prototype.getUser = function () {
        var _this = this;
        this.apiService.get(this.ACCOUNT_API_URL_BASE + "/currentUser")
            .subscribe(function (response) {
            console.log(response);
            _this.user.next(response);
        }, function (error) {
            console.log("API call failed");
            console.log(error);
        });
    };
    UserService.prototype.logout = function () {
        var _this = this;
        this.apiService.post(this.ACCOUNT_API_URL_BASE + "/logout", {})
            .subscribe(function (response) {
            console.log("Logged out successfully");
            _this.user.next({});
        });
    };
    UserService.prototype.login = function (username, password) {
        var _this = this;
        var body = {
            name: username,
            password: password
        };
        this.apiService.post(this.ACCOUNT_API_URL_BASE + "/login", body)
            .subscribe(function (response) {
            _this.getUser();
        });
    };
    UserService.prototype.isGM = function () {
        var isValidGM = false;
        var user = this.user.getValue();
        if (user.guild) {
            user.guild.members.forEach(function (member, index) {
                if (member.user == user.name) {
                    isValidGM = true;
                }
            });
        }
        return isValidGM;
    };
    return UserService;
}());
UserService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__api_service__["a" /* ApiService */]) === "function" && _a || Object])
], UserService);

var _a;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map