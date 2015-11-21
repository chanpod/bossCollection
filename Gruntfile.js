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
         sass: {
           dist:{
             files:{
               '<%= meta.css %>/app.css': '<%= meta.css %>/compiled.scss'
             }
           }
         },
         concat: {

             webJS: {
                 src: [
                     '<%= meta.content %>/js/**/*.js',
                     '!<%= meta.content %>/js/lib/**/*.js'
                 ],
                 dest: '<%= meta.temp %>/<%= meta.appName %>.js'
             },
             sass:{
               src:[
                 '<%= meta.css %>/*.scss'
               ],
               dest: '<%= meta.css %>/compiled.scss'
             }

         },
         clean: {
             app: [
               '<%= meta.temp %>/**/*',
               '<%= meta.css %>/app.css',
               '<%= meta.css %>/compiled.scss'
             ]
         },
         watch: {
             build: {
                 files: ['public/js/**/*',
                         'public/css/*.scss',
                         '!public/tmp/**/*'
                     ],
                 tasks: ['build'],
                 options: {
                     spawn: true,
                     livereload: true
                 }
             }
         },
         uglify: {
             webJS:{
                 src: [
                     '<%= meta.temp %>/bosscollection.js'

                 ],
                 dest: '<%= meta.temp %>/<%= meta.appName %>.min.js'
             }
         },
         cssmin:{
             css:{
                 src:[
                     '<%= meta.content %>/css/**/*.css'
                 ],
                 dest:'<%= meta.temp %>/<%= meta.appName %>.min.css'
             }
         }
     });


     grunt.loadNpmTasks('grunt-contrib-concat');
     grunt.loadNpmTasks('grunt-contrib-clean');
     grunt.loadNpmTasks('grunt-contrib-watch');
     grunt.loadNpmTasks('grunt-contrib-uglify');
     grunt.loadNpmTasks('grunt-contrib-cssmin');
     grunt.loadNpmTasks('grunt-sass');

     grunt.registerTask('build', 'Build web application for distribution.', [
         'clean',
         'concat',
         'sass',
         'uglify',
         'cssmin'
     ]);
};
