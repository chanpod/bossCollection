'use strict';

/* Filters */

angular.module('BossCollection.filters').
  filter('interpolate', function (version) {
    return function (text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  });
