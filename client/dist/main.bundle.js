webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
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
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/CoreModule.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

//3rd Party

var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MatAutocompleteModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MatDatepickerModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["w" /* MatTableModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["m" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["r" /* MatRadioModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["s" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["v" /* MatSliderModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["u" /* MatSlideToggleModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatButtonToggleModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["q" /* MatProgressSpinnerModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["z" /* MatTooltipModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["x" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["l" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["n" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["y" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["t" /* MatSidenavModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["o" /* MatMenuModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["p" /* MatProgressBarModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MatAutocompleteModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MatDatepickerModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["w" /* MatTableModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["m" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["r" /* MatRadioModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["s" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["v" /* MatSliderModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["u" /* MatSlideToggleModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatButtonToggleModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["q" /* MatProgressSpinnerModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["z" /* MatTooltipModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["x" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["l" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["n" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["y" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["t" /* MatSidenavModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["o" /* MatMenuModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["p" /* MatProgressBarModule */]
            ],
        })
    ], CoreModule);
    return CoreModule;
}());



/***/ }),

/***/ "../../../../../src/app/account/account.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/account/account.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"noPadding row center-xs\">\r\n  <form [formGroup]=\"AccountFormGroup\" class=\"row center-xs\">\r\n\r\n    <mat-card>\r\n\r\n      <mat-card-title>\r\n        <span mat-headline> Account </span>\r\n      </mat-card-title>\r\n      <hr/>\r\n      <mat-card-content>\r\n\r\n        <div class=\"row\">\r\n\r\n          <mat-form-field class=\"fullWidthField col-xs-12\">\r\n            <input matInput placeholder=\"User Name\" name=\"name\" formControlName=\"name\" />\r\n          </mat-form-field>\r\n\r\n          <mat-form-field class=\"fullWidthField col-xs-12\">\r\n            <input matInput placeholder=\"Email\" name=\"email\" formControlName=\"email\" />\r\n          </mat-form-field>\r\n\r\n          <mat-form-field class=\"fullWidthField col-xs-12\" *ngIf = \"user.guild?.name\">\r\n            <input matInput placeholder=\"Guild\" name=\"Guild\" formControlName=\"guild\" />\r\n          </mat-form-field>\r\n\r\n        </div>\r\n\r\n        <div class=\"row\" *ngIf = \"!user.googleId\">\r\n\r\n          <mat-form-field class=\"fullWidthField col-xs-12\">\r\n            <input matInput placeholder=\"Current Password\" name=\"currentPassword\" formControlName=\"currentPassword\" />\r\n          </mat-form-field>\r\n\r\n          <mat-form-field class=\"fullWidthField col-xs-12\">\r\n            <input matInput placeholder=\"Change Password\" name=\"newPassword\" formControlName=\"newPassword\" />\r\n          </mat-form-field>\r\n\r\n          <mat-form-field class=\"fullWidthField col-xs-12\">\r\n            <input matInput placeholder=\"Confirm Password\" name=\"confirmPassword\" formControlName=\"confirmPassword\" />\r\n          </mat-form-field>\r\n\r\n        </div>\r\n\r\n        <div class = \"row space-between\">\r\n          <button *ngIf = \"!user.googleId\" mat-raised-button color = \"primary\" (click) = \"changePassword()\">Change Password</button>\r\n          <button mat-raised-button color = \"primary\" (click) = \"leaveGuild()\" *ngIf = \"user.guild?.name\">Leave Guild</button>\r\n        </div>\r\n\r\n      </mat-card-content>\r\n    </mat-card>\r\n  </form>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/account/account.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_guild_service__ = __webpack_require__("../../../../../src/app/services/guild.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__);
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




//3rd party

var AccountComponent = /** @class */ (function () {
    function AccountComponent(userService, toastr, guildService) {
        var _this = this;
        this.userService = userService;
        this.toastr = toastr;
        this.guildService = guildService;
        this.userService.user.subscribe(function (user) {
            _this.user = user;
            console.log(_this.user);
            _this.initForm();
        });
    }
    AccountComponent.prototype.ngOnInit = function () {
    };
    AccountComponent.prototype.changePassword = function () {
        var _this = this;
        var currentPasswordControl = this.AccountFormGroup.controls.currentPassword;
        var newPasswordControl = this.AccountFormGroup.controls.newPassword;
        var confirmPasswordControl = this.AccountFormGroup.controls.confirmPassword;
        var body = __assign({ currentPassword: currentPasswordControl.value, newPassword: newPasswordControl.value, passwordVerify: confirmPasswordControl.value }, this.user);
        this.userService.changePassword(body)
            .subscribe(function (result) {
            _this.toastr.success("Password Updated successfully", "Password Update");
            currentPasswordControl.setValue("");
            newPasswordControl.setValue("");
            confirmPasswordControl.setValue("");
        }, function (error) {
            var errorMessage = error.json();
            _this.toastr.error(errorMessage.message, "Password Update");
            console.log(error);
        });
    };
    AccountComponent.prototype.leaveGuild = function () {
        var _this = this;
        this.guildService.leaveGuild(this.user.guild.name)
            .subscribe(function (result) {
            _this.toastr.success("Removed from the guild");
            _this.userService.getUser();
        });
    };
    AccountComponent.prototype.initForm = function () {
        if (this.userService.hasGuild() == false) {
            this.user.guild = {};
        }
        this.AccountFormGroup = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            name: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]({ value: (this.user.name || ''), disabled: true }),
            newPassword: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](''),
            confirmPassword: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](''),
            currentPassword: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](''),
            email: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]({ value: (this.user.email || ''), disabled: false }),
            battleTag: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](''),
            avatarUrl: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](''),
            guild: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]({ value: (this.user.guild.name || ''), disabled: true })
        });
    };
    AccountComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-account',
            template: __webpack_require__("../../../../../src/app/account/account.component.html"),
            styles: [__webpack_require__("../../../../../src/app/account/account.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__["ToastsManager"],
            __WEBPACK_IMPORTED_MODULE_3__services_guild_service__["a" /* GuildService */]])
    ], AccountComponent);
    return AccountComponent;
}());



/***/ }),

/***/ "../../../../../src/app/account/guards/account.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AccountGuard = /** @class */ (function () {
    function AccountGuard(user, toastr, router) {
        this.user = user;
        this.toastr = toastr;
        this.router = router;
    }
    AccountGuard.prototype.canActivate = function () {
        var _this = this;
        return this.user.getUserPromise().map(function (response) {
            var canActivate = _this.user.isLoggedIn();
            if (!_this.user.isLoggedIn()) {
                canActivate = false;
                _this.toastr.error("Must be logged in.");
                _this.router.navigate(['/']);
            }
            return canActivate;
        });
    };
    AccountGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__["ToastsManager"],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]])
    ], AccountGuard);
    return AccountGuard;
}());



/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".sidenav{\r\n    height:100%;\r\n}\r\n\r\n.sidenav-container{\r\n    min-height:400px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-sidenav-container class=\"sidenav-container\">\r\n\r\n    <mat-sidenav #sidenav class=\"sidenav\">\r\n\r\n        <div class=\"dark-theme\">\r\n\r\n            <mat-toolbar color=\"primary\">\r\n                Menu\r\n            </mat-toolbar>\r\n\r\n        </div>\r\n        <mat-nav-list>\r\n            <mat-list-item routerLink=\"\" (click)=\"sidenav.close()\">\r\n                <button mat-icon-button><mat-icon>home</mat-icon></button>\r\n                <a mat-list-item > Home </a>\r\n            </mat-list-item>\r\n\r\n            <mat-list-item routerLink=\"createApplication\" (click)=\"sidenav.close()\">\r\n                <button mat-icon-button><mat-icon>games</mat-icon></button>\r\n                <a mat-list-item> Apply </a>\r\n            </mat-list-item>\r\n\r\n\r\n            <mat-list-item *ngIf = \"userService.isGM()\" routerLink=\"viewApplications\" (click)=\"sidenav.close()\">\r\n                <button mat-icon-button><mat-icon>view_list</mat-icon></button>\r\n                <a mat-list-item> View Apps </a>\r\n            </mat-list-item>\r\n\r\n            <mat-list-item *ngIf=\"!loggedIn()\" (click)=\"sidenav.close()\" routerLink=\"login\">\r\n                <button mat-icon-button><mat-icon>account_circle</mat-icon></button>\r\n                <a mat-list-item> Login </a>\r\n            </mat-list-item>\r\n\r\n            <mat-list-item *ngIf=\"loggedIn()\" (click)=\"logout()\">\r\n                <button mat-icon-button><mat-icon>exit_to_app</mat-icon></button>\r\n                <a mat-menu-item> Logout </a>\r\n            </mat-list-item>\r\n\r\n        </mat-nav-list>\r\n    </mat-sidenav>\r\n\r\n    <layout [sidenav]=\"sidenav\"></layout>\r\n    <div class=\"row center-xs noPadding\">\r\n        <div class=\"col-xs-12 center-xs noPadding\">\r\n            <router-outlet></router-outlet>\r\n        </div>\r\n    </div>\r\n</mat-sidenav-container>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_guild_service__ = __webpack_require__("../../../../../src/app/services/guild.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular_oauth2_oidc__ = __webpack_require__("../../../../angular-oauth2-oidc/angular-oauth2-oidc.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular_oauth2_oidc___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular_oauth2_oidc__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__authConfig__ = __webpack_require__("../../../../../src/app/authConfig.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppComponent = /** @class */ (function () {
    function AppComponent(userService, toastr, vRef, guildService, oauthService) {
        this.userService = userService;
        this.toastr = toastr;
        this.oauthService = oauthService;
        this.title = 'app';
        this.userService.getUser();
        this.toastr.setRootViewContainerRef(vRef);
        document.title = guildService.getGuildContext();
        document.domain = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].domain;
        this.oauthService.configure(__WEBPACK_IMPORTED_MODULE_5__authConfig__["a" /* authConfig */]);
        this.oauthService.setStorage(localStorage);
        this.oauthService.strictDiscoveryDocumentValidation = false;
        this.oauthService.oidc = false;
        this.oauthService.loginUrl = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].loginUrl;
        this.oauthService.logoutUrl = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].logoutUrl;
    }
    AppComponent.prototype.initGoogle = function () {
        gapi.auth2.init({
            client_id: '1099140712491-esphn576cqr56kiqvsqi4kjd683jc9fm.apps.googleusercontent.com',
            scope: 'profile',
        });
    };
    AppComponent.prototype.logout = function () {
        this.userService.logout();
    };
    AppComponent.prototype.loggedIn = function () {
        return this.userService.user.value.name != undefined;
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__["ToastsManager"],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"],
            __WEBPACK_IMPORTED_MODULE_2__services_guild_service__["a" /* GuildService */],
            __WEBPACK_IMPORTED_MODULE_3_angular_oauth2_oidc__["OAuthService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__CoreModule__ = __webpack_require__("../../../../../src/app/CoreModule.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angular2_markdown__ = __webpack_require__("../../../../angular2-markdown/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angular_oauth2_oidc__ = __webpack_require__("../../../../angular-oauth2-oidc/angular-oauth2-oidc.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angular_oauth2_oidc___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_angular_oauth2_oidc__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__login_resetPasswordDialog_component__ = __webpack_require__("../../../../../src/app/login/resetPasswordDialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__home_newTab_component__ = __webpack_require__("../../../../../src/app/home/newTab.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__home_imageUrl_component__ = __webpack_require__("../../../../../src/app/home/imageUrl.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__routing_routing_module__ = __webpack_require__("../../../../../src/app/routing/routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__layout_layout_component__ = __webpack_require__("../../../../../src/app/layout/layout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__services_api_service__ = __webpack_require__("../../../../../src/app/services/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__services_guild_service__ = __webpack_require__("../../../../../src/app/services/guild.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_blizzard_service__ = __webpack_require__("../../../../../src/app/services/blizzard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__application_application_module__ = __webpack_require__("../../../../../src/app/application/application.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__account_account_component__ = __webpack_require__("../../../../../src/app/account/account.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__confirm_dialog_confirm_dialog_component__ = __webpack_require__("../../../../../src/app/confirm-dialog/confirm-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__guild_guild_module__ = __webpack_require__("../../../../../src/app/guild/guild.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__account_guards_account_guard__ = __webpack_require__("../../../../../src/app/account/guards/account.guard.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













//Components





//Routing


//Services




//Modules




//Guards

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_14__home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_15__home_newTab_component__["a" /* NewTabDialog */],
                __WEBPACK_IMPORTED_MODULE_16__home_imageUrl_component__["a" /* ImageUrlDialog */],
                __WEBPACK_IMPORTED_MODULE_18__layout_layout_component__["a" /* LayoutComponent */],
                __WEBPACK_IMPORTED_MODULE_12__login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_13__login_resetPasswordDialog_component__["a" /* ResetPasswordDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_24__account_account_component__["a" /* AccountComponent */],
                __WEBPACK_IMPORTED_MODULE_25__confirm_dialog_confirm_dialog_component__["a" /* ConfirmDialogComponent */]
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_15__home_newTab_component__["a" /* NewTabDialog */],
                __WEBPACK_IMPORTED_MODULE_16__home_imageUrl_component__["a" /* ImageUrlDialog */],
                __WEBPACK_IMPORTED_MODULE_25__confirm_dialog_confirm_dialog_component__["a" /* ConfirmDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_13__login_resetPasswordDialog_component__["a" /* ResetPasswordDialogComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__["b" /* NoopAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_17__routing_routing_module__["a" /* RoutingModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["HttpClientModule"],
                //Material Modules ===
                __WEBPACK_IMPORTED_MODULE_7__CoreModule__["a" /* CoreModule */],
                //====
                __WEBPACK_IMPORTED_MODULE_10_angular2_markdown__["a" /* MarkdownModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_9_ng2_toastr_ng2_toastr__["ToastModule"].forRoot(),
                __WEBPACK_IMPORTED_MODULE_11_angular_oauth2_oidc__["OAuthModule"].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["j" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_23__application_application_module__["a" /* ApplicationModule */],
                __WEBPACK_IMPORTED_MODULE_26__guild_guild_module__["a" /* GuildModule */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_19__services_user_service__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_20__services_api_service__["a" /* ApiService */],
                __WEBPACK_IMPORTED_MODULE_21__services_guild_service__["a" /* GuildService */],
                __WEBPACK_IMPORTED_MODULE_22__services_blizzard_service__["a" /* BlizzardService */],
                __WEBPACK_IMPORTED_MODULE_27__account_guards_account_guard__["a" /* AccountGuard */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/application/application.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_application_create_application_component__ = __webpack_require__("../../../../../src/app/application/create-application/create-application.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routing_routing_module__ = __webpack_require__("../../../../../src/app/application/routing/routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__view_applications_view_applications_component__ = __webpack_require__("../../../../../src/app/application/view-applications/view-applications.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__view_app_view_app_component__ = __webpack_require__("../../../../../src/app/application/view-app/view-app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__CoreModule__ = __webpack_require__("../../../../../src/app/CoreModule.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




//Routing

//3rd Party






var ApplicationModule = /** @class */ (function () {
    function ApplicationModule() {
    }
    ApplicationModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_4__routing_routing_module__["a" /* RoutingModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["j" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_7_ng2_toastr_ng2_toastr__["ToastModule"],
                __WEBPACK_IMPORTED_MODULE_10__CoreModule__["a" /* CoreModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__create_application_create_application_component__["a" /* CreateApplicationComponent */],
                __WEBPACK_IMPORTED_MODULE_8__view_applications_view_applications_component__["a" /* ViewApplicationsComponent */],
                __WEBPACK_IMPORTED_MODULE_9__view_app_view_app_component__["a" /* ViewAppComponent */]
            ]
        })
    ], ApplicationModule);
    return ApplicationModule;
}());



/***/ }),

/***/ "../../../../../src/app/application/create-application/create-application.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n\r\n\r\n.commentsInput{\r\n    min-height:150px;\r\n    min-width:100%;\r\n}\r\n\r\n.formPadding{\r\n    padding:15px;\r\n}\r\n\r\n.redIcon{\r\n    color:red;\r\n}\r\n\r\n.greenIcon{\r\n    color:green;\r\n}\r\n\r\n.classBackgroundBase{\r\n    width:100%; \r\n    background-size: cover;\r\n    background-repeat: no-repeat;\r\n}\r\n\r\n.shamanBackground{\r\n    background-image: url(" + __webpack_require__("../../../../../src/assets/images/classBackdrops/shaman.jpg") + "); \r\n}\r\n\r\n.hunterBackground{\r\n    background-image: url(" + __webpack_require__("../../../../../src/assets/images/classBackdrops/hunter.jpg") + "); \r\n}\r\n\r\n.demonhunterBackground{\r\n    background-image: url(" + __webpack_require__("../../../../../src/assets/images/classBackdrops/demon_hunter.jpg") + "); \r\n}\r\n\r\n.druidBackground{\r\n    background-image: url(" + __webpack_require__("../../../../../src/assets/images/classBackdrops/druid.jpg") + "); \r\n}\r\n\r\n.paladinBackground{\r\n    background-image: url(" + __webpack_require__("../../../../../src/assets/images/classBackdrops/paladin.jpg") + "); \r\n}\r\n\r\n.deathknightBackground{\r\n    background-image: url(" + __webpack_require__("../../../../../src/assets/images/classBackdrops/death_knight.jpg") + "); \r\n}\r\n\r\n.monkBackground{\r\n    background-image: url(" + __webpack_require__("../../../../../src/assets/images/classBackdrops/monk.jpg") + "); \r\n}\r\n\r\n.mageBackground{\r\n    background-image: url(" + __webpack_require__("../../../../../src/assets/images/classBackdrops/mage.jpg") + "); \r\n}\r\n\r\n.priestBackground{\r\n    background-image: url(" + __webpack_require__("../../../../../src/assets/images/classBackdrops/priest.jpg") + "); \r\n}\r\n\r\n.rogueBackground{\r\n    background-image: url(" + __webpack_require__("../../../../../src/assets/images/classBackdrops/rogue.jpg") + "); \r\n}\r\n\r\n.warlockBackground{\r\n    background-image: url(" + __webpack_require__("../../../../../src/assets/images/classBackdrops/warlock.jpg") + "); \r\n}\r\n\r\n.warriorBackground{\r\n    background-image: url(" + __webpack_require__("../../../../../src/assets/images/classBackdrops/warrior.jpg") + "); \r\n}\r\n\r\n.fullWidthField{\r\n    width:100%;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/application/create-application/create-application.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"noPadding row center-xs classBackgroundBase {{classBackground}}\">\r\n    <div class=\"col-xs-12 dark-theme noPadding\">\r\n        <mat-card>\r\n\r\n            <h2> Application for {{guildName}} </h2>\r\n        </mat-card>\r\n\r\n\r\n    </div>\r\n    <div class=\"col-xs-11 col-md-12 row center-xs\">\r\n\r\n        <mat-card class=\"col-xs-12 col-md-6 \">\r\n            <mat-card-content>\r\n\r\n                <form [formGroup]=\"CreateAppFormGroup\" class=\"row center-xs\">\r\n\r\n                    <mat-form-field class=\"fullWidthField col-xs-12\">\r\n                        <input required (blur)=\"checkCharacterName()\" matInput placeholder=\"Character Name\" name=\"name\" formControlName=\"character\"\r\n                        />\r\n                    </mat-form-field>\r\n\r\n                    <mat-form-field class=\"col-xs-12 formPadding\">\r\n                        <mat-select formControlName=\"realm\" (blur)=\"checkCharacterName()\" class=\"fullWidthField \" placeholder=\"Select Realm\">\r\n                            <mat-option *ngFor=\"let realm of realms\" [value]=\"realm.name\">\r\n                                {{ realm.name }}\r\n                            </mat-option>\r\n                        </mat-select>\r\n                    </mat-form-field>\r\n\r\n                    <mat-form-field class=\"col-xs-12 formPadding\">\r\n                        <mat-select formControlName=\"desiredRole\" placeholder=\"Desired Role\" class=\"fullWidthField\">\r\n\r\n                            <mat-option value=\"Ranged DPS\">\r\n                                Ranged DPS\r\n                            </mat-option>\r\n\r\n                            <mat-option value=\"Melee DPS\">\r\n                                Melee DPS\r\n                            </mat-option>\r\n\r\n                            <mat-option value=\"Tank\">\r\n                                Tank\r\n                            </mat-option>\r\n\r\n                            <mat-option value=\"Healer\">\r\n                                Healer\r\n                            </mat-option>\r\n\r\n                        </mat-select>\r\n\r\n                    </mat-form-field>\r\n\r\n\r\n                    <mat-form-field class=\"fullWidthField col-xs-12 formPadding\">\r\n                        <input matInput placeholder=\"Guild History\" name=\"previousGuild\" formControlName=\"previousGuild\" />\r\n                    </mat-form-field>\r\n\r\n                    <mat-form-field class=\"fullWidthField col-xs-12 formPadding\">\r\n                        <input placeholder=\"Screenshot of your UI\" matInput name=\"batteltag\" formControlName=\"uiScreenshot\" />\r\n                    </mat-form-field>\r\n\r\n                    <mat-form-field class=\"fullWidthField col-xs-12 formPadding\">\r\n                        <input placeholder=\"Link recent tier logs\" matInput name=\"batteltag\" formControlName=\"logsLink\" />\r\n                    </mat-form-field>\r\n\r\n                    <mat-form-field class=\"fullWidthField col-xs-12 formPadding\">\r\n                        <input placeholder=\"Battle.net tag\" matInput name=\"batteltag\" formControlName=\"batteltag\" />\r\n                    </mat-form-field>\r\n\r\n                    <mat-form-field class=\"fullWidthField col-xs-12 formPadding\">\r\n                        <input placeholder=\"What spec do you currently play?\" matInput name=\"spec\" formControlName=\"spec\" />\r\n                    </mat-form-field>\r\n\r\n\r\n\r\n                    <section class=\"fullWidthField col-xs-12 formPadding start-xs\">\r\n                        <mat-checkbox formControlName=\"aboutPage\">I've read the about page</mat-checkbox>\r\n                    </section>\r\n\r\n                    <section class=\"fullWidthField col-xs-12 formPadding start-xs\">\r\n                        <mat-checkbox formControlName=\"canYouMakeRaidTimes\">I can make raid times at near 100%</mat-checkbox>\r\n                    </section>\r\n\r\n                    <section class=\"fullWidthField col-xs-12 formPadding start-xs\">\r\n                        <mat-checkbox formControlName=\"voiceCommunications\">We expect raiders to be able to speak clearly and effectively via voice (Discord) to discuss strategies,\r\n                            ask questions, and communicate during fights. Do you have a working mic with minimal noise/interference\r\n                            and the ability/willingness to interact with the rest of the guild during raid?</mat-checkbox>\r\n                    </section>\r\n\r\n                    <mat-form-field class=\"fullWidthField col-xs-12 formPadding\">\r\n                        <h4> Do you utilize your other specs/talents on a fight by fight basis? Are you willing to maintain multiple\r\n                            sets of gear that are advantageous for your different specializations?</h4>\r\n\r\n                        <textarea class=\"commentsInput\" matInput name=\"flexibility\" formControlName=\"flexibility\"> </textarea>\r\n                    </mat-form-field>\r\n\r\n                    <mat-form-field class=\"fullWidthField col-xs-12 formPadding\">\r\n                        <h4> List and detail which gems and enchants that you currently utilize for your spec. Are they optimal\r\n                            for your current spec? What are your stat priorities? Why?</h4>\r\n\r\n                        <textarea class=\"commentsInput\" matInput name=\"statPriority\" formControlName=\"statPriority\"> </textarea>\r\n                    </mat-form-field>\r\n\r\n                    <mat-form-field class=\"fullWidthField col-xs-12 formPadding\">\r\n                        <h4> Please describe your opener and rotation in detail. How does your rotation differ on a movement-heavy\r\n                            encounter from a Patchwerk-style fight?</h4>\r\n\r\n                        <textarea class=\"commentsInput\" matInput name=\"rotation\" formControlName=\"rotation\"> </textarea>\r\n                    </mat-form-field>\r\n\r\n                    <mat-form-field class=\"fullWidthField formPadding\">\r\n                        <textarea class=\"commentsInput\" matInput placeholder=\"How do you prepare for a new encounter?\" name=\"prepareForNewEncounter\"\r\n                            formControlName=\"prepareForNewEncounter\"> </textarea>\r\n                    </mat-form-field>\r\n\r\n                    <mat-form-field class=\"fullWidthField formPadding\">\r\n                        <textarea class=\"commentsInput\" matInput placeholder=\"Tell us about yourself\" name=\"aboutYourself\" formControlName=\"aboutYourself\"> </textarea>\r\n                    </mat-form-field>\r\n\r\n                    <mat-form-field class=\"fullWidthField formPadding\">\r\n                        <textarea class=\"commentsInput\" matInput placeholder=\"Past Raiding experience?\" name=\"raidExperience\" formControlName=\"raidExperience\"> </textarea>\r\n                    </mat-form-field>\r\n\r\n                    <mat-form-field class=\"fullWidthField formPadding\">\r\n                        <textarea class=\"commentsInput\" matInput placeholder=\"Anything else you'd like to add?\" name=\"comments\" formControlName=\"comments\"> </textarea>\r\n                    </mat-form-field>\r\n\r\n\r\n\r\n                    <button [disabled]=\"!CreateAppFormGroup.valid\" mat-raised-button color=\"primary\" (click)=\"submitApplication()\"> Submit </button>\r\n\r\n                </form>\r\n\r\n            </mat-card-content>\r\n        </mat-card>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/application/create-application/create-application.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateApplicationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_blizzard_service__ = __webpack_require__("../../../../../src/app/services/blizzard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_guild_service__ = __webpack_require__("../../../../../src/app/services/guild.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_toastr_ng2_toastr__);
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







var CreateApplicationComponent = /** @class */ (function () {
    function CreateApplicationComponent(userService, blizzardService, guildService, toastr, router) {
        this.userService = userService;
        this.blizzardService = blizzardService;
        this.guildService = guildService;
        this.toastr = toastr;
        this.router = router;
        this.characterIsValid = false;
        this.characterIsValid = false;
        this.validateCharacter = this.validateCharacter.bind(this);
        this.guildName = this.guildService.getGuildContext();
    }
    CreateApplicationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.iconColor = "red";
        this.icon = "cancel";
        this.classBackground = "druidBackground";
        this.application = {
            character: "",
            realm: "",
            desiredRole: "",
            guildName: this.guildService.getGuildContext(),
            previousGuild: '',
            comments: '',
            class: ''
        };
        this.CreateAppFormGroup = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            character: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', this.validateCharacter),
            realm: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* Validators */].required),
            previousGuild: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* Validators */].required),
            desiredRole: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* Validators */].required),
            comments: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* Validators */].required),
            batteltag: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* Validators */].required),
            aboutPage: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* Validators */].required),
            canYouMakeRaidTimes: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* Validators */].required),
            voiceCommunications: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* Validators */].required),
            uiScreenshot: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* Validators */].required),
            logsLink: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* Validators */].required),
            aboutYourself: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* Validators */].required),
            raidExperience: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* Validators */].required),
            prepareForNewEncounter: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* Validators */].required),
            spec: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* Validators */].required),
            flexibility: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* Validators */].required),
            statPriority: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* Validators */].required),
            rotation: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* Validators */].required)
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
            _this.characterObject = result;
            _this.iconColor = "green";
            _this.icon = "check_circle";
            _this.characterIsValid = true;
            _this.application.class = _this.blizzardService.getClass(_this.characterObject.class);
            _this.classBackground = _this.application.class + "Background";
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
        var _this = this;
        var formGroup = this.CreateAppFormGroup.value;
        this.application = __assign({ guildName: this.application.guildName, class: this.application.class }, formGroup);
        this.guildService.submitApplication(this.application)
            .subscribe(function (result) {
            _this.toastr.success("Application submitted successfully!", "Success");
            _this.router.navigate(['/']);
        }, function (error) {
            console.log(error);
            _this.toastr.error("Hmm. Something didn't work. Please try again", "It broke!");
        });
    };
    CreateApplicationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-create-application',
            template: __webpack_require__("../../../../../src/app/application/create-application/create-application.component.html"),
            styles: [__webpack_require__("../../../../../src/app/application/create-application/create-application.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_4__services_blizzard_service__["a" /* BlizzardService */],
            __WEBPACK_IMPORTED_MODULE_5__services_guild_service__["a" /* GuildService */],
            __WEBPACK_IMPORTED_MODULE_6_ng2_toastr_ng2_toastr__["ToastsManager"],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]])
    ], CreateApplicationComponent);
    return CreateApplicationComponent;
}());



/***/ }),

/***/ "../../../../../src/app/application/routing/routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_application_create_application_component__ = __webpack_require__("../../../../../src/app/application/create-application/create-application.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__view_applications_view_applications_component__ = __webpack_require__("../../../../../src/app/application/view-applications/view-applications.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_app_view_app_component__ = __webpack_require__("../../../../../src/app/application/view-app/view-app.component.ts");
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
    },
    {
        path: 'viewApplications', component: __WEBPACK_IMPORTED_MODULE_3__view_applications_view_applications_component__["a" /* ViewApplicationsComponent */]
    },
    {
        path: 'viewApp/:appId', component: __WEBPACK_IMPORTED_MODULE_4__view_app_view_app_component__["a" /* ViewAppComponent */]
    }
];
var RoutingModule = /** @class */ (function () {
    function RoutingModule() {
    }
    RoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(routes)
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
        })
    ], RoutingModule);
    return RoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/application/view-app/view-app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/application/view-app/view-app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row center-xs\">\r\n  <div class=\"row col-xs-12 center-xs\">\r\n    <mat-spinner *ngIf=\"loading\"></mat-spinner>\r\n  </div>\r\n\r\n  <mat-card class = \"col-md-6 col-xs-12\">\r\n\r\n\r\n    <mat-card-header>\r\n\r\n      <img mat-card-avatar src=\"http://us.battle.net/static-render/us/{{armoryData?.thumbnail}}\" />\r\n\r\n      <mat-card-title>{{app?.character}}</mat-card-title>\r\n      <mat-card-subtitle>{{app?.class}}</mat-card-subtitle>\r\n    </mat-card-header>\r\n\r\n    <mat-card-content class=\"col-xs-12 start-xs\">\r\n\r\n      <mat-list>\r\n        <mat-list-item>\r\n          <b>Item Level:</b>&nbsp; {{armoryData?.items.averageItemLevelEquipped}}\r\n        </mat-list-item>\r\n\r\n        <mat-list-item>\r\n          <b>Current Realm:</b>&nbsp; {{app?.realm}}\r\n        </mat-list-item>\r\n\r\n        <mat-list-item>\r\n          <b>Battle Tag:</b>&nbsp; {{app?.batteltag}}\r\n        </mat-list-item>\r\n\r\n        <mat-list-item>\r\n          <mat-checkbox [(ngModel)]=\"app.aboutPage\" disabled> Read About</mat-checkbox>\r\n        </mat-list-item>\r\n\r\n        <mat-list-item>\r\n          <mat-checkbox [(ngModel)]=\"app.voiceCommunications\" disabled> Voice Communications Question</mat-checkbox>\r\n        </mat-list-item>\r\n\r\n        <mat-list-item>\r\n          <mat-checkbox [(ngModel)]=\"app.canYouMakeRaidTimes\" disabled> Agreed to Raid Times</mat-checkbox>\r\n        </mat-list-item>\r\n\r\n        <mat-list-item>\r\n          <b>Spec: </b>&nbsp; {{app?.spec}}\r\n        </mat-list-item>\r\n\r\n        <mat-list-item>\r\n          <b>Role: </b>&nbsp; {{app?.desiredRole}}\r\n        </mat-list-item>\r\n\r\n        <mat-list-item>\r\n          <b>Logs: </b>&nbsp; {{app?.logsLink}}\r\n        </mat-list-item>\r\n\r\n        <mat-list-item>\r\n          <b>UI: </b>&nbsp; {{app?.uiScreenshot}}\r\n        </mat-list-item>\r\n\r\n      </mat-list>\r\n\r\n      <hr/>\r\n\r\n      <h3> Guild History </h3>\r\n      <span> {{app?.previousGuild}} </span>\r\n\r\n      <h3> Raid Experience </h3>\r\n      <span> {{app?.raidExperience}} </span>\r\n\r\n      <h3> Preparing for Encounter </h3>\r\n      <span> {{app?.prepareForNewEncounter}} </span>\r\n\r\n      <h3> Rotation </h3>\r\n      <span> {{app?.rotation}} </span>\r\n\r\n      <h3> Stat Priority </h3>\r\n      <span> {{app?.statPriority}} </span>\r\n\r\n      <h3> Spec Flexibility </h3>\r\n      <span> {{app?.flexibility}} </span>\r\n\r\n      <h3> About</h3>\r\n      <span> {{app?.aboutYourself}} </span>\r\n\r\n      <h3> Comments</h3>\r\n      <span> {{app?.comments}} </span>\r\n\r\n      <br/>\r\n\r\n    </mat-card-content>\r\n\r\n    <mat-card-actions>\r\n      <a color=\"primary\" mat-raised-button href=\"{{armoryUrl(app?.realm, app?.character)}}\" target=\"_blank\">Armory</a>\r\n\r\n    </mat-card-actions>\r\n\r\n  </mat-card>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/application/view-app/view-app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewAppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_guild_service__ = __webpack_require__("../../../../../src/app/services/guild.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_blizzard_service__ = __webpack_require__("../../../../../src/app/services/blizzard.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ViewAppComponent = /** @class */ (function () {
    function ViewAppComponent(route, guildService, blizzardService) {
        this.route = route;
        this.guildService = guildService;
        this.blizzardService = blizzardService;
    }
    ViewAppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.app = {
            character: '',
            class: '',
            realm: '',
            previousGuild: '',
            role: '',
            comments: '',
            desiredRole: '',
            dateApplied: '',
            guild: '',
            status: '',
            batteltag: '',
            aboutPage: false,
            canYouMakeRaidTimes: false,
            voiceCommunications: false,
            uiScreenshot: '',
            logsLink: '',
            aboutYourself: '',
            raidExperience: '',
            prepareForNewEncounter: '',
            spec: '',
            flexibility: '',
            statPriority: '',
            rotation: ''
        };
        this.route.params.subscribe(function (routeParams) {
            _this.appId = routeParams['appId'];
            _this.guildService.getApplication(_this.appId)
                .subscribe(function (app) {
                console.log(app);
                _this.app = app[0];
                _this.blizzardService.getCharacterArmory(_this.app.realm, _this.app.character)
                    .subscribe(function (armoryDetails) {
                    _this.armoryData = armoryDetails;
                });
            }, function (error) {
                console.log(error);
            });
        });
    };
    ViewAppComponent.prototype.armoryUrl = function (realm, character) {
        var url = "http://us.battle.net/wow/en/character/" + realm + "/" + character + "/simple";
        return url;
    };
    ViewAppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-view-app',
            template: __webpack_require__("../../../../../src/app/application/view-app/view-app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/application/view-app/view-app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__services_guild_service__["a" /* GuildService */],
            __WEBPACK_IMPORTED_MODULE_3__services_blizzard_service__["a" /* BlizzardService */]])
    ], ViewAppComponent);
    return ViewAppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/application/view-applications/view-applications.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/application/view-applications/view-applications.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row center-xs\">\r\n  <mat-card *ngIf=\"loading\" class=\"col-md-3 col-xs-12 center-xs\">\r\n    <mat-spinner ></mat-spinner>\r\n  </mat-card>\r\n  <div *ngIf=\"!loading\" class=\"col-xs-12 col-md-6\">\r\n\r\n\r\n    <mat-table [dataSource]=\"applications\">\r\n\r\n      <ng-container matColumnDef=\"Character\">\r\n        <mat-header-cell *matHeaderCellDef> Character </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let application\">\r\n          <div class=\"row start-xs middle-xs\">\r\n\r\n            <img [src]=\"getUrl(application)\" /> &nbsp; {{application.character}}\r\n\r\n          </div>\r\n        </mat-cell>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"Date Applied\">\r\n        <mat-header-cell *matHeaderCellDef> Date Applied </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let application\">{{application.dateApplied | date:'shortDate'}}  </mat-cell>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"View Application\">\r\n        <mat-header-cell *matHeaderCellDef> View Application </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let application\">\r\n          <button (click)=\"viewApp(application)\" mat-raised-button color=\"primary\"> View </button>\r\n          <button (click)=\"deleteApplication(application)\" mat-icon-button color=\"warning\"> <mat-icon>delete</mat-icon> </button>\r\n        </mat-cell>\r\n      </ng-container>\r\n\r\n\r\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n\r\n    </mat-table>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/application/view-applications/view-applications.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewApplicationsComponent; });
/* unused harmony export ApplicationsDataSource */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_cdk_collections__ = __webpack_require__("../../../cdk/esm5/collections.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_guild_service__ = __webpack_require__("../../../../../src/app/services/guild.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__confirm_dialog_confirm_dialog_component__ = __webpack_require__("../../../../../src/app/confirm-dialog/confirm-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_toastr_ng2_toastr__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//Components

//3rd party

var ViewApplicationsComponent = /** @class */ (function () {
    function ViewApplicationsComponent(guildService, router, toastr, dialog) {
        this.guildService = guildService;
        this.router = router;
        this.toastr = toastr;
        this.dialog = dialog;
    }
    ViewApplicationsComponent.prototype.ngOnInit = function () {
        this.displayedColumns = ["Character", "Date Applied", "View Application"];
        this.getGuildApplications();
    };
    ViewApplicationsComponent.prototype.getGuildApplications = function () {
        var _this = this;
        this.loading = true;
        this.guildService.getApplications()
            .subscribe(function (applications) {
            _this.loading = false;
            _this.applications = new ApplicationsDataSource(applications.applications);
        }, function (error) {
            _this.loading = false;
        });
    };
    ViewApplicationsComponent.prototype.deleteApplication = function (application) {
        var _this = this;
        var body = {
            application: application
        };
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_6__confirm_dialog_confirm_dialog_component__["a" /* ConfirmDialogComponent */], {});
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == true) {
                _this.guildService.deleteApplication(body)
                    .subscribe(function (result) {
                    _this.getGuildApplications();
                    _this.toastr.success("Successfully deleted the application");
                });
            }
        });
    };
    ViewApplicationsComponent.prototype.getUrl = function (application) {
        return "assets/images/classIcons/images/class/64/" + application.class + ".png";
    };
    ViewApplicationsComponent.prototype.viewApp = function (app) {
        this.router.navigateByUrl("/viewApp/" + app._id);
    };
    ViewApplicationsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-view-applications',
            template: __webpack_require__("../../../../../src/app/application/view-applications/view-applications.component.html"),
            styles: [__webpack_require__("../../../../../src/app/application/view-applications/view-applications.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_guild_service__["a" /* GuildService */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_7_ng2_toastr_ng2_toastr__["ToastsManager"],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["h" /* MatDialog */]])
    ], ViewApplicationsComponent);
    return ViewApplicationsComponent;
}());

var ApplicationsDataSource = /** @class */ (function (_super) {
    __extends(ApplicationsDataSource, _super);
    function ApplicationsDataSource(tableData) {
        var _this = _super.call(this) || this;
        _this.tableData = tableData;
        return _this;
    }
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    ApplicationsDataSource.prototype.connect = function () {
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(this.tableData);
    };
    ApplicationsDataSource.prototype.disconnect = function () { };
    return ApplicationsDataSource;
}(__WEBPACK_IMPORTED_MODULE_1__angular_cdk_collections__["a" /* DataSource */]));



/***/ }),

/***/ "../../../../../src/app/authConfig.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return authConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");

var authConfig = {
    // Url of the Identity Provider
    // URL of the SPA to redirect the user to after login
    redirectUri: __WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].redirectUri,
    // The SPA's id. The SPA is registerd with this id at the auth-server
    clientId: __WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].clientId,
    scope: "wow.profile",
    responseType: 'code',
};


/***/ }),

/***/ "../../../../../src/app/confirm-dialog/confirm-dialog.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/confirm-dialog/confirm-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"light-theme\">\r\n  <mat-card>\r\n    <mat-card-title>\r\n      <span mat-headline>Are you sure you want to delete this?</span>\r\n    </mat-card-title>\r\n\r\n    <mat-card-actions class = \"row\">\r\n\r\n      <button mat-raised-button color=\"primary\" (click)=\"Save()\"> Yes! </button>\r\n      <button mat-raised-button color=\"red\" (click)=\"Cancel()\"> No </button>\r\n    </mat-card-actions>\r\n  </mat-card>\r\n\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/confirm-dialog/confirm-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConfirmDialogComponent = /** @class */ (function () {
    function ConfirmDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    ConfirmDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close(false);
    };
    ConfirmDialogComponent.prototype.Cancel = function () {
        this.dialogRef.close(false);
    };
    ConfirmDialogComponent.prototype.Save = function () {
        this.dialogRef.close(true);
    };
    ConfirmDialogComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-confirm-dialog',
            template: __webpack_require__("../../../../../src/app/confirm-dialog/confirm-dialog.component.html"),
            styles: [__webpack_require__("../../../../../src/app/confirm-dialog/confirm-dialog.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MatDialogRef */]])
    ], ConfirmDialogComponent);
    return ConfirmDialogComponent;
}());



/***/ }),

/***/ "../../../../../src/app/guild/create-guild/create-guild.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/guild/create-guild/create-guild.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row center-xs\">\r\n  <mat-card>\r\n    <mat-card-header>\r\n      <mat-card-title>\r\n        <h2>No guild exist for this page yet </h2>\r\n      </mat-card-title>\r\n    </mat-card-header>\r\n\r\n    <mat-card-content>\r\n      <form [formGroup]=\"CreateGuildFormGroup\" class=\"row center-xs\">\r\n\r\n        <mat-form-field class = \"col-xs-12 col-md-6\">\r\n          <input matInput placeholder=\"Guild Name\" name = \"guildName\" formControlName=\"GuildName\" />\r\n        </mat-form-field>\r\n      </form>\r\n\r\n      <button mat-raised-button (click) = \"createGuild()\"> Create Guild</button>\r\n    </mat-card-content>\r\n  </mat-card>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/guild/create-guild/create-guild.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateGuildComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_guild_service__ = __webpack_require__("../../../../../src/app/services/guild.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//Services

var CreateGuildComponent = /** @class */ (function () {
    function CreateGuildComponent(guildService) {
        this.guildService = guildService;
        this.CreateGuildFormGroup = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            GuildName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* Validators */].required)
        });
    }
    CreateGuildComponent.prototype.ngOnInit = function () {
    };
    CreateGuildComponent.prototype.createGuild = function () {
        this.guildService.createGuild(this.CreateGuildFormGroup.controls.GuildName.value)
            .subscribe(function (result) {
            alert("it worked");
        }, function (error) {
            alert(error);
        });
    };
    CreateGuildComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-create-guild',
            template: __webpack_require__("../../../../../src/app/guild/create-guild/create-guild.component.html"),
            styles: [__webpack_require__("../../../../../src/app/guild/create-guild/create-guild.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_guild_service__["a" /* GuildService */]])
    ], CreateGuildComponent);
    return CreateGuildComponent;
}());



/***/ }),

/***/ "../../../../../src/app/guild/guards/CreateGuild.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateGuildGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CreateGuildGuard = /** @class */ (function () {
    function CreateGuildGuard(user, toastr, router) {
        this.user = user;
        this.toastr = toastr;
        this.router = router;
    }
    CreateGuildGuard.prototype.canActivate = function () {
        var _this = this;
        return this.user.getUserPromise().map(function (response) {
            var canActivate = _this.user.isLoggedIn();
            if (!_this.user.isLoggedIn()) {
                canActivate = false;
                _this.toastr.error("Must be logged in.");
                _this.router.navigate(['/']);
            }
            else if (_this.user.hasGuild()) {
                canActivate = false;
                _this.toastr.error("You can only create 1 guild per account");
            }
            return canActivate;
        });
    };
    CreateGuildGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__["ToastsManager"],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]])
    ], CreateGuildGuard);
    return CreateGuildGuard;
}());



/***/ }),

/***/ "../../../../../src/app/guild/guild.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GuildModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_guild_create_guild_component__ = __webpack_require__("../../../../../src/app/guild/create-guild/create-guild.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__routing_routing_module__ = __webpack_require__("../../../../../src/app/guild/routing/routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__guards_CreateGuild_guard__ = __webpack_require__("../../../../../src/app/guild/guards/CreateGuild.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__CoreModule__ = __webpack_require__("../../../../../src/app/CoreModule.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




//3rd Party



//Routing

//Guards


var GuildModule = /** @class */ (function () {
    function GuildModule() {
    }
    GuildModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_7__routing_routing_module__["a" /* RoutingModule */],
                __WEBPACK_IMPORTED_MODULE_6_ng2_toastr_ng2_toastr__["ToastModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["j" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_9__CoreModule__["a" /* CoreModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__create_guild_create_guild_component__["a" /* CreateGuildComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__guards_CreateGuild_guard__["a" /* CreateGuildGuard */]
            ]
        })
    ], GuildModule);
    return GuildModule;
}());



/***/ }),

/***/ "../../../../../src/app/guild/routing/routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_guild_create_guild_component__ = __webpack_require__("../../../../../src/app/guild/create-guild/create-guild.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__guards_CreateGuild_guard__ = __webpack_require__("../../../../../src/app/guild/guards/CreateGuild.guard.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


//Components

//Guards

var routes = [
    {
        path: 'guild/createGuild',
        component: __WEBPACK_IMPORTED_MODULE_2__create_guild_create_guild_component__["a" /* CreateGuildComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_3__guards_CreateGuild_guard__["a" /* CreateGuildGuard */]]
    }
];
var RoutingModule = /** @class */ (function () {
    function RoutingModule() {
    }
    RoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(routes)
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
        })
    ], RoutingModule);
    return RoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n.card-shadow{\r\n    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);\r\n}\r\n\r\n.logBackdrop{\r\n    background-color: black; \r\n    height:100%;\r\n}\r\n\r\n.logoBanner{\r\n    max-width: 100%;\r\n    max-height: 100%;\r\n}\r\n\r\n.demonhunterBackground{\r\n    background: url(" + __webpack_require__("../../../../../src/assets/images/classBackdrops/demon_hunter.jpg") + "); \r\n    min-height:100vh;\r\n}\r\n\r\n.classBackgroundBase{\r\n    width:100%; \r\n    background-size: cover;\r\n    background-repeat: no-repeat;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"demonhunterBackground classBackgroundBase\">\r\n\r\n\r\n  <div class=\"row col-xs-12 light-theme center-xs  noPadding\">\r\n\r\n\r\n    <div class=\"col-xs-12 logBackdrop noPadding\">\r\n      <img class=\"logoBanner\" *ngIf=\"guildSettings && guildSettings.bannerImage\" src=\"{{guildSettings.bannerImage}}\" />\r\n      <img class=\"logoBanner\" *ngIf=\"guildSettings && !guildSettings.bannerImage\" src=\"assets/images/bcLogo.png\" />\r\n      <button *ngIf=\"userService.isGM()\" mat-raised-button color=\"primary\" style=\"position:absolute;left:0;\" (click)=\"openImageDialog()\">\r\n      Update Image</button>\r\n    </div>\r\n\r\n    <button *ngIf=\"userService.isGM()\" mat-raised-button color=\"accent\" (click)=\"openNewTabDialog()\"> New Tab </button>\r\n\r\n    <div class=\"col-md-8 col-xs-12\">\r\n\r\n      <mat-card *ngIf=\"guildNotOwned\">\r\n        <mat-card-header>\r\n          <mat-card-title>\r\n            <h2>Seems this guild has been abandoned. Would you like to claim it? </h2>\r\n          </mat-card-title>\r\n        </mat-card-header>\r\n\r\n        <mat-card-content>\r\n\r\n        </mat-card-content>\r\n\r\n        <mat-card-actions>\r\n          <button (click)=\"claimGuild()\" mat-raised-button color=\"accent\">Claim {{guildContext}}</button>\r\n        </mat-card-actions>\r\n\r\n      </mat-card>\r\n      <mat-card *ngIf=\"guildNotFound\">\r\n        <mat-card-header>\r\n          <mat-card-title>\r\n            <h2>No guild exist for this page yet </h2>\r\n          </mat-card-title>\r\n        </mat-card-header>\r\n\r\n        <mat-card-content>\r\n\r\n        </mat-card-content>\r\n\r\n        <mat-card-actions>\r\n          <button routerLink=\"/guild/createGuild\" mat-raised-button color=\"primary\">Create a new Guild for this url</button>\r\n        </mat-card-actions>\r\n\r\n      </mat-card>\r\n      <mat-card *ngIf=\"!guildNotFound\">\r\n\r\n        <mat-tab-group class=\"card-shadow\">\r\n          <div *ngFor=\"let tab of tabs; let i = index\">\r\n\r\n            <mat-tab [label]=\"tab.title\">\r\n              <mat-card>\r\n                <mat-card-content>\r\n\r\n                  <markdown style=\"text-align: start;\" [data]=\"tab.content\"> </markdown>\r\n\r\n                  <div *ngIf=\"editingTab\">\r\n                    <mat-toolbar color=\"accent\" class=\"row center-xs\">\r\n                      Modify Content - Preview Changes above\r\n                      <a target=\"_blank\" href=\"https://dimpu.github.io/angular2-markdown/\" mat-icon-button>\r\n                        <mat-icon mdTooltip=\"Markdown Help\" class=\"mat-24\" aria-label=\"helpIcon\">help</mat-icon>\r\n                      </a>\r\n\r\n                      HTML supported\r\n                    </mat-toolbar>\r\n                    <textarea style=\"width:95%;min-height:250px;\" [(ngModel)]=\"tab.content\"> {{tab.content}}</textarea>\r\n                  </div>\r\n\r\n                </mat-card-content>\r\n\r\n                <mat-card-actions *ngIf=\"userService.isGM()\">\r\n\r\n                  <button aria-label=\"editButton\" id=\"editButton\" mat-icon-button *ngIf=\"!editingTab\" (click)=\"toggleEditing()\">\r\n                    <mat-icon class=\"mat-24\" aria-label=\"edit icon\">edit</mat-icon>\r\n                  </button>\r\n\r\n                  <button mat-icon-button *ngIf=\"editingTab\" (click)=\"saveTabs()\">\r\n                    <mat-icon class=\"mat-24\" aria-label=\"save icon\">save</mat-icon>\r\n                  </button>\r\n\r\n                  <button mat-icon-button *ngIf=\"editingTab\" (click)=\"toggleEditing()\">\r\n                    <mat-icon mdTooltip=\"Cancel\" class=\"mat-24\" aria-label=\"cancel icon\">cancel</mat-icon>\r\n                  </button>\r\n\r\n                  <button mat-icon-button (click)=\"deleteTab(i)\">\r\n                    <mat-icon class=\"mat-24\" aria-label=\"delete icon\">delete</mat-icon>\r\n                  </button>\r\n\r\n\r\n                </mat-card-actions>\r\n\r\n              </mat-card>\r\n            </mat-tab>\r\n\r\n          </div>\r\n\r\n\r\n        </mat-tab-group>\r\n      </mat-card>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_guild_service__ = __webpack_require__("../../../../../src/app/services/guild.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__newTab_component__ = __webpack_require__("../../../../../src/app/home/newTab.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__imageUrl_component__ = __webpack_require__("../../../../../src/app/home/imageUrl.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomeComponent = /** @class */ (function () {
    function HomeComponent(userService, guildService, toastr, dialog) {
        this.userService = userService;
        this.guildService = guildService;
        this.toastr = toastr;
        this.dialog = dialog;
        this.user = {};
        this.tabs = [];
        this.editingTab = false;
        this.newTab = { title: '', content: '' };
        this.guildNotFound = false;
        this.guildNotOwned = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.editingTab = false;
        this.guildContext = this.guildService.getGuildContext();
        this.userService.user.subscribe(function (user) {
            _this.user = user;
            _this.getGuildSettings();
            _this.getTabs();
        });
        this.checkIfGuildOwned();
    };
    HomeComponent.prototype.updateGuildBanner = function (newUrl) {
        var _this = this;
        this.guildSettings.bannerImage = newUrl;
        this.guildService.updateGuildSettings(this.guildSettings)
            .subscribe(function (guildSettings) {
            _this.guildSettings = guildSettings.guild;
        }, function (error) {
            _this.toastr.error("Update failed. Try again later.");
        });
    };
    HomeComponent.prototype.getGuildSettings = function () {
        var _this = this;
        this.guildService.getGuildSettings(this.guildContext)
            .subscribe(function (guildSettings) {
            _this.guildSettings = guildSettings.guild;
        }, function (error) {
            _this.toastr.error("Could not retrieve guild settings. Try again later.");
        });
    };
    HomeComponent.prototype.openImageDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_6__imageUrl_component__["a" /* ImageUrlDialog */], {
            width: '100%',
            data: this.guildSettings.bannerImage
        });
        dialogRef.afterClosed().subscribe(function (newUrl) {
            if (newUrl != null) {
                _this.updateGuildBanner(newUrl);
            }
        });
    };
    HomeComponent.prototype.openNewTabDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_5__newTab_component__["a" /* NewTabDialog */], {
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
    HomeComponent.prototype.claimGuild = function () {
        var _this = this;
        this.guildService.claimGuild(this.guildContext)
            .subscribe(function (result) {
            _this.toastr.success("You now own the guild " + _this.guildContext);
            _this.guildNotOwned = false;
            _this.userService.getUser();
        });
    };
    HomeComponent.prototype.checkIfGuildOwned = function () {
        var _this = this;
        this.guildService.guildOwned()
            .subscribe(function (result) {
            if (result == true) {
                _this.guildNotOwned = false;
            }
            else {
                _this.guildNotOwned = true;
            }
        });
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
        guildName = this.guildService.getGuildContext();
        this.guildService.getTabs(guildName)
            .subscribe(function (response) {
            _this.tabs = response.guild.tabs;
        }, function (error) {
            var errorMessage = JSON.parse(error._body);
            if (errorMessage.message == "Guild Not Found") {
                _this.guildNotFound = true;
            }
        });
    };
    HomeComponent.prototype.toggleEditing = function () {
        this.editingTab = !this.editingTab;
    };
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home',
            template: __webpack_require__("../../../../../src/app/home/home.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/home.component.css")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_3__services_guild_service__["a" /* GuildService */],
            __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__["ToastsManager"],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatDialog */]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "../../../../../src/app/home/imageUrl.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageUrlDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var ImageUrlDialog = /** @class */ (function () {
    function ImageUrlDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.url = data;
    }
    ImageUrlDialog.prototype.onNoClick = function () {
        this.dialogRef.close(null);
    };
    ImageUrlDialog.prototype.Cancel = function () {
        this.dialogRef.close(null);
    };
    ImageUrlDialog.prototype.Save = function () {
        this.dialogRef.close(this.url);
    };
    ImageUrlDialog = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'imageUrl',
            template: __webpack_require__("../../../../../src/app/home/imageUrl.html"),
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MatDialogRef */], Object])
    ], ImageUrlDialog);
    return ImageUrlDialog;
}());



/***/ }),

/***/ "../../../../../src/app/home/imageUrl.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"light-theme row center-xs\" style=\"width:100%;\">\r\n\r\n    <div class=\"row col-xs-12 center-xs\">\r\n\r\n        <mat-form-field class = \"col-md-6 col-xs-12\">\r\n            <input matInput placeholder=\"Image URL (EG Imgur)\" [(ngModel)]=\"url\">\r\n        </mat-form-field>\r\n\r\n    </div>\r\n\r\n    <div class=\"row col-xs-12 center-xs\">\r\n\r\n\r\n        <button mat-raised-button color=\"primary\" (click)=\"Save()\"> Save </button>\r\n        <button mat-raised-button color=\"red\" (click)=\"Cancel()\"> Cancel </button>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/home/newTab.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewTabDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NewTabDialog = /** @class */ (function () {
    function NewTabDialog(dialogRef) {
        this.dialogRef = dialogRef;
    }
    NewTabDialog.prototype.onNoClick = function () {
        this.dialogRef.close(null);
    };
    NewTabDialog.prototype.Cancel = function () {
        this.dialogRef.close(null);
    };
    NewTabDialog.prototype.Save = function () {
        this.dialogRef.close(this.title);
    };
    NewTabDialog = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'newTabDialog',
            template: __webpack_require__("../../../../../src/app/home/newTabDialog.html"),
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MatDialogRef */]])
    ], NewTabDialog);
    return NewTabDialog;
}());



/***/ }),

/***/ "../../../../../src/app/home/newTabDialog.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"light-theme\">\r\n\r\n    <mat-form-field>\r\n        <input matInput placeholder=\"Tab Name\" [(ngModel)] = \"title\">\r\n    </mat-form-field>\r\n\r\n    <button mat-raised-button (click)=\"Save()\"> Save </button>\r\n    <button mat-raised-button (click)=\"Cancel()\"> Cancel </button>\r\n</div>"

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

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\r\n<div class=\"dark-theme\">\r\n\r\n  <mat-toolbar color=\"primary\" class=\"row noPadding\">\r\n\r\n\r\n    <div class=\"col-xs-3 col-sm-4 hidden-xs row start-xs\">\r\n      <span *ngIf=\"user?.name != undefined\"> </span>\r\n      <button *ngIf=\"user?.name == undefined\" mat-button routerLink=\"\"> Home </button>\r\n    </div>\r\n\r\n    <div class=\"col-xs-2 hidden-sm hidden-md hidden-lg start-xs\">\r\n      <a mat-icon-button (click)=\"sidenav.open()\" style=\"font-size: 20px;\">\r\n        <mat-icon>menu</mat-icon>\r\n      </a>\r\n    </div>\r\n\r\n    <div class=\"col-xs-8 col-sm-4 center-xs \">\r\n\r\n      <a mat-button routerLink=\"\" style=\"font-size: 20px;\">\r\n        <mat-icon style = \"padding-bottom:5px;\">home</mat-icon>\r\n        {{guildName | uppercase}} </a>\r\n    </div>\r\n\r\n    <div class=\"col-xs-3 col-sm-4 hidden-xs\">\r\n\r\n      <div class=\"row end-xs\">\r\n\r\n        <button *ngIf=\"user?.name != undefined\" style=\"margin:5px;\" mat-raised-button [matMenuTriggerFor]=\"menu\" color=\"accent\">\r\n          {{user.name}}\r\n          <mat-icon>keyboard_arrow_down</mat-icon>\r\n        </button>\r\n        <mat-menu #menu=\"matMenu\">\r\n          <button mat-menu-item routerLink=\"account\"> Account </button>\r\n          <button mat-menu-item routerLink=\"viewApplications\"> View Apps </button>\r\n          <button mat-menu-item (click)=\"logout()\"> Logout </button>\r\n        </mat-menu>\r\n\r\n        <button style=\"margin:5px;\" *ngIf=\"user?.name == undefined\" mat-raised-button color=\"accent\" routerLink=\"login\"> Login </button>\r\n        <button style=\"margin:5px;\" mat-raised-button color=\"accent\" routerLink=\"createApplication\"> Apply </button>\r\n      </div>\r\n\r\n    </div>\r\n\r\n\r\n\r\n  </mat-toolbar>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/layout.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_guild_service__ = __webpack_require__("../../../../../src/app/services/guild.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LayoutComponent = /** @class */ (function () {
    function LayoutComponent(userService, guildService) {
        var _this = this;
        this.userService = userService;
        this.guildService = guildService;
        this.user = undefined;
        this.guildName = this.guildService.getGuildContext();
        userService.user.subscribe(function (user) {
            _this.updateBasedOnUser(user);
        });
    }
    LayoutComponent.prototype.ngOnInit = function () {
        this.loadGoogleAuthAPI();
    };
    LayoutComponent.prototype.loadGoogleAuthAPI = function () {
        gapi.load('auth2', function () {
            gapi.auth2.init();
        });
    };
    LayoutComponent.prototype.updateBasedOnUser = function (user) {
        this.user = user;
    };
    LayoutComponent.prototype.logout = function () {
        this.userService.logout();
    };
    LayoutComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'layout',
            template: __webpack_require__("../../../../../src/app/layout/layout.component.html"),
            inputs: ['sidenav'],
            styles: [__webpack_require__("../../../../../src/app/layout/layout.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_2__services_guild_service__["a" /* GuildService */]])
    ], LayoutComponent);
    return LayoutComponent;
}());



/***/ }),

/***/ "../../../../../src/app/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".blizzardButton{\r\n    background-color: #0e86ca;\r\n    border-color: #10a1de;\r\n    color: #fff;\r\n    font-size: 1.0625rem;\r\n\r\n    -ms-flex-align: center;\r\n    -webkit-box-align: center;\r\n            align-items: center;\r\n    border-color: transparent;\r\n    border-radius: 0;\r\n    border-style: solid;\r\n    border-width: 1px;\r\n    cursor: pointer;\r\n    display: -ms-flexbox;\r\n    display: -webkit-box;\r\n    display: flex;\r\n    font-family: Blizzard,sans-serif;\r\n    font-size: 1.0625rem;\r\n    font-weight: 400;\r\n    height: 2.5rem;\r\n    line-height: 1.5;\r\n    padding: 0 1rem;\r\n    text-align: center;\r\n    -ms-touch-action: manipulation;\r\n    touch-action: manipulation;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n    vertical-align: middle;\r\n    white-space: nowrap;\r\n    width:120px;\r\n    height:36px;\r\n}\r\n\r\n.blizzardLogo{\r\n    width:40%;\r\n    height:100%;\r\n    padding-right: 5px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row center-xs\" style=\"margin:0;\">\r\n\r\n    <mat-card>\r\n        <mat-card-header>\r\n            <mat-card-title>\r\n                <h2>Login </h2>\r\n            </mat-card-title>\r\n        </mat-card-header>\r\n\r\n        <hr />\r\n\r\n        <div class=\"row \">\r\n\r\n            <div class=\"col-xs-11\">\r\n                <mat-progress-bar *ngIf=\"loading\" mode=\"indeterminate\"></mat-progress-bar>\r\n               \r\n                <form class=\"row center-xs\" [formGroup]=\"LoginForm\">\r\n\r\n                    <mat-form-field class=\"col-xs-12\">\r\n                        <input matInput placeholder=\"User Name\" name=\"name\" formControlName=\"Name\" />\r\n                    </mat-form-field>\r\n\r\n                    <mat-form-field class=\"col-xs-12\">\r\n                        <input matInput placeholder=\"Password\" type=\"password\" formControlName=\"Password\" />\r\n                    </mat-form-field>\r\n\r\n                    <div class=\"col-xs-12 start-xs\">\r\n                        <button mat-raised-button (click)=\"login()\" color=\"primary\"> Login </button>\r\n                        <button mat-raised-button (click)=\"openResetEmailDialog()\" color=\"primary\"> Reset Password </button>\r\n                        <button mat-raised-button (click)=\"getBlizzardccessToken()\" color=\"primary\"> Blizz Login Temp </button>\r\n\r\n                    </div>\r\n                    <div class=\"row col-xs-12 start-xs\"> &nbsp; </div>\r\n                    <div class=\"row col-xs-12 start-xs\">\r\n\r\n                        <div class=\"col-xs-2\" style=\"padding:0;\">\r\n\r\n                            <button (click)=\"blizzardLogin()\" class=\"blizzardButton\">\r\n                                <img class = \"blizzardLogo\" src = \"../../../assets/images/blizzardIcon.png\" />\r\n                                Login </button>\r\n                        </div>\r\n\r\n                        <div class=\"col-xs-2\">\r\n\r\n                            <div id=\"googleButton\" class=\"g-signin2\" (click)=\"googleLogin()\"></div>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n      \r\n            </div>\r\n\r\n        </div>\r\n\r\n    </mat-card>\r\n\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular_oauth2_oidc__ = __webpack_require__("../../../../angular-oauth2-oidc/angular-oauth2-oidc.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular_oauth2_oidc___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular_oauth2_oidc__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__resetPasswordDialog_component__ = __webpack_require__("../../../../../src/app/login/resetPasswordDialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LoginComponent = /** @class */ (function () {
    function LoginComponent(userService, activatedRoute, router, oAuthService, zone, dialog, toastr) {
        this.userService = userService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.oAuthService = oAuthService;
        this.zone = zone;
        this.dialog = dialog;
        this.toastr = toastr;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        gapi.signin2.render("googleButton");
        this.loading = false;
        this.LoginForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            Name: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](''),
            Password: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('')
        });
        this.userService.user.subscribe(function (user) {
            if (user.name != undefined) {
                _this.router.navigate(['']);
            }
        });
        this.checkBlizzardCode();
    };
    LoginComponent.prototype.googleLogin = function () {
        var _this = this;
        gapi.auth2.getAuthInstance()
            .signIn({
            scope: 'profile'
        })
            .then(function (googleUser) {
            _this.googleProfile = googleUser.getBasicProfile();
            _this.checkIfNewAccount(_this.googleProfile);
        });
    };
    LoginComponent.prototype.checkBlizzardCode = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            if (params.code) {
                _this.blizzardCode = params.code;
                _this.getBlizzardccessToken();
            }
        });
        this.activatedRoute.params.subscribe(function (params) {
            console.log(params);
        });
    };
    LoginComponent.prototype.getBlizzardccessToken = function () {
        var _this = this;
        this.userService.getBlizzardAccessToken(this.blizzardCode)
            .subscribe(function (response) {
            if (response) {
                _this.userService.getBlizzardProfile()
                    .subscribe(function (profile) {
                    console.log(profile);
                    _this.userService.setBlizzardUser(profile);
                });
            }
        });
    };
    LoginComponent.prototype.checkIfNewAccount = function (googleUser) {
        var _this = this;
        var email = this.googleProfile.getEmail();
        this.userService.getGoogleUser(email)
            .subscribe(function (result) {
            if (result.message != "Not Found") {
                _this.googleSignIn();
            }
            else {
                var user = {
                    name: _this.googleProfile.getName(),
                    email: _this.googleProfile.getEmail(),
                    googleId: _this.googleProfile.getId(),
                    googleSignup: true
                };
                _this.userService.signUp(user)
                    .subscribe(function (result) {
                    _this.googleSignIn();
                });
            }
        });
    };
    LoginComponent.prototype.googleSignIn = function () {
        var _this = this;
        var email = this.googleProfile.getEmail();
        this.userService.googleLogin(email)
            .subscribe(function (result) {
            if (result) {
                _this.loginSuccess();
            }
        });
    };
    LoginComponent.prototype.getGoogleProfile = function (googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    };
    LoginComponent.prototype.blizzardLogin = function () {
        console.log(encodeURIComponent(__WEBPACK_IMPORTED_MODULE_8__environments_environment__["a" /* environment */].redirectUri));
        var blizzardLoginUrl = __WEBPACK_IMPORTED_MODULE_8__environments_environment__["a" /* environment */].loginUrl
            + "?"
            + "grant_type=authorization_code"
            + "&response_type=code"
            + "&redirect_uri=" + encodeURIComponent(__WEBPACK_IMPORTED_MODULE_8__environments_environment__["a" /* environment */].redirectUri)
            + "&scope=wow.profile"
            + "&client_id=" + __WEBPACK_IMPORTED_MODULE_8__environments_environment__["a" /* environment */].clientId;
        window.location.replace(blizzardLoginUrl);
        this.oAuthService.responseType = "code";
        // this.oAuthService.initImplicitFlow();
        //https://us.battle.net/oauth/authorize?response_type=code&client_id=fqvadba9c8auw7brtdr72vv7hfntbx7d&redirect_uri=https%3A%2F%2Flocalhost%3A4200%2Flogin&scope=wow.profile
    };
    LoginComponent.prototype.openResetEmailDialog = function () {
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_6__resetPasswordDialog_component__["a" /* ResetPasswordDialogComponent */], {});
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != null) {
            }
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.userService.login(this.LoginForm.controls.Name.value, this.LoginForm.controls.Password.value)
            .subscribe(function (response) {
            _this.loginSuccess();
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
            _this.toastr.error(error.json().message);
        });
    };
    LoginComponent.prototype.loginSuccess = function () {
        var _this = this;
        this.userService.getUser();
        this.zone.run(function () { return _this.router.navigate(['/']); });
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__("../../../../../src/app/login/login.component.html"),
            styles: [__webpack_require__("../../../../../src/app/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_4_angular_oauth2_oidc__["OAuthService"],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
            __WEBPACK_IMPORTED_MODULE_7__angular_material__["h" /* MatDialog */],
            __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__["ToastsManager"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "../../../../../src/app/login/resetPasswordDialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPasswordDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr__);
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




var ResetPasswordDialogComponent = /** @class */ (function () {
    function ResetPasswordDialogComponent(dialogRef, userService, toastr
        // @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.dialogRef = dialogRef;
        this.userService = userService;
        this.toastr = toastr;
    }
    ResetPasswordDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close(null);
    };
    ResetPasswordDialogComponent.prototype.Cancel = function () {
        this.dialogRef.close(null);
    };
    ResetPasswordDialogComponent.prototype.Save = function () {
        this.dialogRef.close(this.title);
    };
    ResetPasswordDialogComponent.prototype.sendResetEmail = function () {
        var _this = this;
        this.userService.resetPassword(this.email)
            .subscribe(function (response) {
            _this.toastr.success("An email has been sent with your new temporary password.", "Password reset");
            _this.dialogRef.close();
        }, function (error) {
            _this.toastr.error(error.json().message);
        });
    };
    ResetPasswordDialogComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'resetPasswordDialog',
            template: __webpack_require__("../../../../../src/app/login/resetPasswordDialog.html"),
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MatDialogRef */],
            __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr__["ToastsManager"]
            // @Inject(MAT_DIALOG_DATA) public data: any
        ])
    ], ResetPasswordDialogComponent);
    return ResetPasswordDialogComponent;
}());



/***/ }),

/***/ "../../../../../src/app/login/resetPasswordDialog.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"light-theme\">\r\n\r\n    <mat-form-field>\r\n        <input matInput placeholder=\"Email\" [(ngModel)]=\"email\">\r\n    </mat-form-field>\r\n\r\n    <div class=\"row between-xs\">\r\n        <button mat-raised-button color=\"primary\" (click)=\"sendResetEmail()\"> Reset Password </button>\r\n        <button mat-raised-button color=\"primary\" (click)=\"Cancel()\"> Cancel </button>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/routing/routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__account_account_component__ = __webpack_require__("../../../../../src/app/account/account.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__account_guards_account_guard__ = __webpack_require__("../../../../../src/app/account/guards/account.guard.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


//Components



//Guards

var routes = [
    {
        path: '', component: __WEBPACK_IMPORTED_MODULE_2__home_home_component__["a" /* HomeComponent */]
    },
    {
        path: 'login', component: __WEBPACK_IMPORTED_MODULE_3__login_login_component__["a" /* LoginComponent */]
    },
    {
        path: 'account', component: __WEBPACK_IMPORTED_MODULE_4__account_account_component__["a" /* AccountComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_5__account_guards_account_guard__["a" /* AccountGuard */]]
    }
];
var RoutingModule = /** @class */ (function () {
    function RoutingModule() {
    }
    RoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(routes)
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
        })
    ], RoutingModule);
    return RoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/services/api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ApiService = /** @class */ (function () {
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
    ApiService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], ApiService);
    return ApiService;
}());



/***/ }),

/***/ "../../../../../src/app/services/blizzard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlizzardService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BlizzardService = /** @class */ (function () {
    function BlizzardService(http) {
        this.http = http;
        this.api = "https://us.api.battle.net/wow";
        this.apiKey = "fqvadba9c8auw7brtdr72vv7hfntbx7d";
        this.classes = ["placeholder", "warrior", "paladin", "hunter", "rogue", "priest", "deathknight", "shaman", "mage", "warlock", "monk", "druid", "demonhunter"];
    }
    BlizzardService.prototype.getCharacter = function (realmName, characterName) {
        var url = "/character/" + realmName + "/" + characterName + "?" + this.getEndOfApiUrl();
        return this.get(this.api + url);
    };
    BlizzardService.prototype.getCharacterArmory = function (realmName, characterName) {
        var getCharacterUrl = this.api + "/character/" + realmName + "/" + characterName + "?fields=items,progression&" + this.getEndOfApiUrl();
        return this.get(getCharacterUrl);
    };
    BlizzardService.prototype.getRealms = function () {
        var url = "/realm/status?" + this.getEndOfApiUrl();
        return this.get(this.api + url);
    };
    BlizzardService.prototype.getClass = function (classId) {
        return this.classes[classId];
    };
    BlizzardService.prototype.getEndOfApiUrl = function () {
        return "locale=en_US&apikey=" + this.apiKey;
    };
    BlizzardService.prototype.get = function (url) {
        return this.http.get(url).map(function (response) { return response.json(); });
    };
    BlizzardService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], BlizzardService);
    return BlizzardService;
}());



/***/ }),

/***/ "../../../../../src/app/services/guild.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GuildService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_service__ = __webpack_require__("../../../../../src/app/services/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GuildService = /** @class */ (function () {
    function GuildService(apiService, userService) {
        this.apiService = apiService;
        this.userService = userService;
        this.GUILD_API_BASE_URL = "/guild/guild";
        this.APP_API_BASE_URL = "/guild/applications";
    }
    GuildService.prototype.createGuild = function (guildName) {
        var body = {
            guildName: guildName
        };
        return this.apiService.post(this.GUILD_API_BASE_URL + "/addGuild", body);
    };
    GuildService.prototype.leaveGuild = function (guildName) {
        var body = {
            guildName: guildName
        };
        return this.apiService.post(this.GUILD_API_BASE_URL + "/removeMember", body);
    };
    GuildService.prototype.guildOwned = function () {
        var guildContext = this.getGuildContext();
        return this.apiService.get(this.GUILD_API_BASE_URL + "/guildOwned/" + guildContext);
    };
    GuildService.prototype.claimGuild = function (guildName) {
        var body = {
            guildName: guildName
        };
        return this.apiService.post(this.GUILD_API_BASE_URL + "/claimGuild", body);
    };
    GuildService.prototype.getGuildSettings = function (guildName) {
        return this.apiService.get(this.GUILD_API_BASE_URL + "/guildSettings/" + guildName);
    };
    GuildService.prototype.updateGuildSettings = function (guildSettings) {
        var body = {
            guild: guildSettings
        };
        return this.apiService.post(this.GUILD_API_BASE_URL + "/guildSettings", body);
    };
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
    GuildService.prototype.getApplications = function () {
        return this.apiService.get(this.APP_API_BASE_URL + "/getApplications/" + this.getGuildContext());
    };
    GuildService.prototype.getApplication = function (appId) {
        return this.apiService.get(this.APP_API_BASE_URL + "/getApplication/" + appId);
    };
    GuildService.prototype.deleteApplication = function (body) {
        return this.apiService.post(this.APP_API_BASE_URL + "/rejectApplication", body);
    };
    GuildService.prototype.getGuildContext = function () {
        var hostname = window.location.hostname;
        var splitHostName = hostname.split(".");
        var guildContext = splitHostName[0];
        if (guildContext == "localhost") {
            guildContext = "test";
        }
        return guildContext;
    };
    GuildService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */]])
    ], GuildService);
    return GuildService;
}());



/***/ }),

/***/ "../../../../../src/app/services/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_service__ = __webpack_require__("../../../../../src/app/services/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
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






var UserService = /** @class */ (function () {
    function UserService(apiService, http, router) {
        this.apiService = apiService;
        this.http = http;
        this.router = router;
        this.user = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* BehaviorSubject */]({});
        this.ACCOUNT_API_URL_BASE = "/account";
    }
    UserService.prototype.getBlizzardProfile = function () {
        var accountURI = "https://us.api.battle.net/account/user?access_token=" + this.blizzardAccess.access_token;
        return this.http.get(accountURI).map(function (res) { return res.json(); });
    };
    UserService.prototype.setBlizzardUser = function (user) {
        user.name = user.battletag;
        user.blizzardAccount = true;
        localStorage.setItem('blizzardProfile', JSON.stringify(user));
        this.user.next(user);
    };
    UserService.prototype.getBlizzardAccessToken = function (code) {
        var _this = this;
        return this.apiService.post('/oauth/getblizzardaccesstoken', { code: code })
            .map(function (accesstoken) {
            // console.log(accesstoken);
            _this.blizzardAccess = accesstoken;
            _this.blizzardAccess;
            localStorage.setItem(_this.blizzardAccessTokenStorageItem, JSON.stringify(accesstoken));
            return true;
        });
    };
    UserService.prototype.isLoggedIn = function () {
        var user = this.user.getValue();
        var isLoggedIn = true;
        var blizzardAccess = JSON.parse(localStorage.getItem(this.blizzardAccessTokenStorageItem));
        if (user.name == "" || user.name == undefined || blizzardAccess) {
            isLoggedIn = false;
        }
        return isLoggedIn;
    };
    UserService.prototype.checkBlizzardToken = function () {
        // /oauth/check_token?token=<token>
        // this.apiService.post('/oauth/validateBlizzardToken', { access_token: this.blizzardAccess.access_token })
        //     .subscribe(
        //     (response) => {
        //         console.log(response);
        //     }
        //     )
        this.http.get("https://us.api.battle.net/oauth/check_token?access_token=" + this.blizzardAccess.access_token
            + "&client_id=" + __WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].clientId)
            .subscribe(function (response) {
            console.log(response);
        });
    };
    UserService.prototype.changePassword = function (body) {
        return this.apiService.post(this.ACCOUNT_API_URL_BASE + "/updateAccount", body);
    };
    UserService.prototype.getUserPromise = function () {
        return this.apiService.get(this.ACCOUNT_API_URL_BASE + "/currentUser");
    };
    UserService.prototype.getGoogleUser = function (email) {
        return this.apiService.get(this.ACCOUNT_API_URL_BASE + "/googleUser/" + email);
    };
    UserService.prototype.signUp = function (user) {
        var body = __assign({}, user);
        return this.apiService.post(this.ACCOUNT_API_URL_BASE + "/signup", body);
    };
    UserService.prototype.getUser = function () {
        var _this = this;
        var blizzardAccess = JSON.parse(localStorage.getItem(this.blizzardAccessTokenStorageItem));
        if (blizzardAccess) {
            var blizzardProfile = JSON.parse(localStorage.getItem('blizzardProfile'));
            if (blizzardProfile) {
                this.setBlizzardUser(blizzardProfile);
                this.blizzardAccess = blizzardAccess;
                this.checkBlizzardToken();
            }
        }
        else {
            this.apiService.get(this.ACCOUNT_API_URL_BASE + "/currentUser")
                .subscribe(function (user) {
                _this.user.next(user);
            }, function (error) {
                console.log("API call failed");
                console.log(error);
                _this.router.navigate(['/login']);
            });
        }
    };
    UserService.prototype.logout = function () {
        var _this = this;
        if (this.user.getValue().googleId) {
            gapi.auth2.getAuthInstance().signOut();
        }
        this.apiService.post(this.ACCOUNT_API_URL_BASE + "/logout", {})
            .subscribe(function (response) {
            console.log("Logged out successfully");
            _this.user.next({});
        });
    };
    UserService.prototype.googleLogin = function (email) {
        var body = {
            email: email
        };
        return this.apiService.post(this.ACCOUNT_API_URL_BASE + "/googleLogin", body);
    };
    UserService.prototype.login = function (username, password) {
        var body = {
            name: username,
            password: password
        };
        return this.apiService.post(this.ACCOUNT_API_URL_BASE + "/login", body);
    };
    UserService.prototype.resetPassword = function (email) {
        var body = {
            email: email
        };
        return this.apiService.post(this.ACCOUNT_API_URL_BASE + '/lost-password', body);
    };
    UserService.prototype.hasGuild = function () {
        var user = this.user.getValue();
        var hasGuild = false;
        if (user.guild != undefined && user.guild.name != "" && user.guild.name != undefined) {
            hasGuild = true;
        }
        return hasGuild;
    };
    UserService.prototype.isGM = function () {
        var isValidGM = false;
        var user = this.user.getValue();
        if (this.hasGuild() && user.guild.name == this.getGuildContext()) {
            user.guild.members.forEach(function (member, index) {
                if (member.user == user.name) {
                    isValidGM = member.GM;
                }
            });
        }
        return isValidGM;
    };
    UserService.prototype.getGuildContext = function () {
        var hostname = window.location.hostname;
        var splitHostName = hostname.split(".");
        var guildContext = splitHostName[0];
        if (guildContext == "localhost") {
            guildContext = "test";
        }
        return guildContext;
    };
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "../../../../../src/assets/images/classBackdrops/death_knight.jpg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "death_knight.5d493f87a6383934eefd.jpg";

/***/ }),

/***/ "../../../../../src/assets/images/classBackdrops/demon_hunter.jpg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "demon_hunter.460d696d77273c02fb06.jpg";

/***/ }),

/***/ "../../../../../src/assets/images/classBackdrops/druid.jpg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "druid.c87a90a3fd4d92e534b1.jpg";

/***/ }),

/***/ "../../../../../src/assets/images/classBackdrops/hunter.jpg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "hunter.100891d4fb71171b860a.jpg";

/***/ }),

/***/ "../../../../../src/assets/images/classBackdrops/mage.jpg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "mage.782b1bd35068c1845141.jpg";

/***/ }),

/***/ "../../../../../src/assets/images/classBackdrops/monk.jpg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "monk.80384e18ec77308aa9d3.jpg";

/***/ }),

/***/ "../../../../../src/assets/images/classBackdrops/paladin.jpg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "paladin.9b28cfba5e591afcbf5e.jpg";

/***/ }),

/***/ "../../../../../src/assets/images/classBackdrops/priest.jpg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "priest.04df7ca87303f78b914a.jpg";

/***/ }),

/***/ "../../../../../src/assets/images/classBackdrops/rogue.jpg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "rogue.63885ff9308a1e9dd31a.jpg";

/***/ }),

/***/ "../../../../../src/assets/images/classBackdrops/shaman.jpg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "shaman.9fbdcf55c3c9bd032bfb.jpg";

/***/ }),

/***/ "../../../../../src/assets/images/classBackdrops/warlock.jpg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "warlock.d3de6574179a20b469b9.jpg";

/***/ }),

/***/ "../../../../../src/assets/images/classBackdrops/warrior.jpg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "warrior.b6e410d91e0a4f5f5f34.jpg";

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
//https://us.battle.net/oauth/authorize
var environment = {
    production: false,
    Issuer: '',
    redirectUri: 'https://localhost:4200/login',
    clientId: 'fqvadba9c8auw7brtdr72vv7hfntbx7d',
    loginUrl: 'https://us.battle.net/oauth/authorize',
    logoutUrl: '',
    domain: "localhost"
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__("../../../../../src/polyfills.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");





if (__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "../../../../../src/polyfills.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__("../../../../core-js/es6/symbol.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__("../../../../core-js/es6/object.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__("../../../../core-js/es6/function.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__("../../../../core-js/es6/parse-int.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__("../../../../core-js/es6/parse-float.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__("../../../../core-js/es6/number.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__("../../../../core-js/es6/math.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__("../../../../core-js/es6/string.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__("../../../../core-js/es6/date.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__("../../../../core-js/es6/array.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__("../../../../core-js/es6/regexp.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__("../../../../core-js/es6/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_weak_map__ = __webpack_require__("../../../../core-js/es6/weak-map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_weak_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_weak_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_set__ = __webpack_require__("../../../../core-js/es6/set.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es6_reflect__ = __webpack_require__("../../../../core-js/es6/reflect.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_core_js_es7_reflect__ = __webpack_require__("../../../../core-js/es7/reflect.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_zone_js_dist_zone__ = __webpack_require__("../../../../zone.js/dist/zone.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_zone_js_dist_zone__);
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
/** IE9, IE10 and IE11 requires all of the following polyfills. **/














/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.
/** Evergreen browsers require these. **/


/**
 * Required to support Web Animations `@angular/animation`.
 * Needed for: All but Chrome, Firefox and Opera. http://caniuse.com/#feat=web-animation
 **/
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
 // Included with Angular CLI.
/***************************************************************************************************
 * APPLICATION IMPORTS
 */
/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
// import 'intl';  // Run `npm install --save intl`.
/**
 * Need to import at least one locale-data with intl.
 */
// import 'intl/locale-data/jsonp/en';


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map