module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      build: {
        src: 'js/script.js',
        dest: 'js/script.min.js'
      }
    },//uglify

    watch: {
      all: {
        files: ['sass/style.scss','css/style.css','js/script.js'],
        tasks: ['sass', 'csslint','jshint'],
      }
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'css/style.css': 'sass/style.scss', // instead of koala, 'destination': 'source'
          // 'widgets.css': 'widgets.scss'
        }
      }
    },//sass

    csslint: {
      // strict: {
      //   options: {
      //     import: 2
      //   },
      //   src: ['css/*.css', '!*.min.css'] //we don't include minified
      // },
      lax: {
        options: {
          import: false,
          'order-alphabetical': false
        },
        src: ['css/*.css', '!*.min.css']
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'js/*.js']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-w3c-html-validation');

  // Default task(s).
  grunt.registerTask('ugly', ['uglify']); //we don't need to minify version every time
  grunt.registerTask('default', ['watch']);

};
