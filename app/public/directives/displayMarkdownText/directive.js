angular.module('BossCollection.directives')
    .directive('displayMarkdown', ['$sce', function($sce){
        
        return {
            restrict: 'E',
            scope: {
                markdown: '=markdown'
            },
            link: function(scope){
                
                var converter = new showdown.Converter();
                
                scope.converToHtml = function (){
                    
                    scope.html = $sce.trustAsHtml(converter.makeHtml(scope.markdown));
                }
                
                scope.$watch('markdown', function(){
                    scope.converToHtml(scope.markdown);
                })
                
                scope.converToHtml(scope.markdown);    
            }, 
            templateUrl: 'displayMarkdownDirective'
        } 
        
    }])