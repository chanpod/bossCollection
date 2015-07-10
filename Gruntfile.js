module.exports = function (grunt) { 
     grunt.initConfig({ 
         pkg: grunt.file.readJSON('package.json'), 
         meta: { 
             appName: 'bosscollection', 
             content : 'public', 
             js: '<%= meta.content %>/js', 
             css : '<%= meta.content %>/css',
			 temp: '<%= meta.content %>/tmp'
         },  
         concat: { 
             options : { stripBanner : true },
             webJS: { 
                 src: [ 
                     '<%= meta.content %>/js/**/*.js',
                     '!<%= meta.content %>/js/lib/**/*.js'
                 ], 
                 dest: '<%= meta.temp %>/<%= meta.appName %>.js'
             }
              
         },
         clean: { 
             app: ['<%= meta.temp %>/**/*']
         },
         watch: {
             build: { 
                 files: ['content/**/*.js'], 
                 tasks: ['build'], 
                 options: { 
                     spawn: true, 
                     livereload: true 
                 } 
             }              
         }
     }); 
 
 
     grunt.loadNpmTasks('grunt-contrib-concat');
     grunt.loadNpmTasks('grunt-contrib-clean');
     grunt.loadNpmTasks('grunt-contrib-watch'); 
 
     grunt.registerTask("validate-web", 'Validate web application JS code using JSHint.', ["jshint:web"]); 
     grunt.registerTask("validate",'Validate web application JS code using JSHint.',["jshint"]);
 
     grunt.registerTask('build', 'Build web application for distribution.', [ 
         'clean:app',
         'concat:js'
     ]);
}; 
