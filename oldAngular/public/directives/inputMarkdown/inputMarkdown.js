var showdown = require('showdown');

angular.module('BossCollection.directives')
    .directive('inputMarkdown', ['$sce', function($sce){
        
        return {
            restrict: 'E',
            scope: {
                input: '=input'
            },
            link: function(scope){
                
                var converter = new showdown.Converter();                
                scope.markdown = scope.input;
                scope.showPreview = true;
                
                scope.goToExternal = function (path) {
                    window.open(
                        path,
                        '_blank' // <- This is what makes it open in a new window.
                        );
                }

                scope.$watch('input', function (input) {

                    scope.input = input;

                })
                
                scope.converToHtml = function (){
                    
                    scope.html = $sce.trustAsHtml(converter.makeHtml(scope.markdown));   
                    scope.input = scope.markdown;
                }
                
                scope.hideShowPreview = function(){
                    
                    scope.showPreview = !scope.showPreview
                }
                
                scope.converToHtml(scope.markdown);    
            }, 
            templateUrl: 'inputField'
        } 
        
    }])