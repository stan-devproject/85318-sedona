'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var config = {
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: ["build"]
    },

    copy: {
      build: {
        files: [{
         expand: true,
         cwd: "source",
         src: [
         "img/**",
         "js/**",
         "*.html"
         ],
         dest: "build"
         }],
      },
    },

    sass: {
      style: {
        files: {
          'build/css/style.css': 'source/sass/style.scss'
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'})
        ]
      },
      style: {
        src: 'build/css/*.css'
      }
    },

    cssmin: {
       options: {
         keepSpecialComments: 0,
         report: "gzip"
       },
       style: {
         files: {
           "build/css/style.min.css": ["build/css/style.css"]
         }
       }
    },

    imagemin: {
      images: {
        options: {
        optimizationLevel: 3
      },
      files: [{
        expand: true,
        src: ["build/img/**/*.{png,jpg,gif,svg}"]
        }]
      }
     },

    watch: {
      style: {
        files: ['source/sass/**/*.scss'],
        tasks: ['sass', 'postcss'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  };

  config = require('./.gosha')(grunt, config);

  grunt.initConfig(config);

  grunt.registerTask("build", [
   "clean",
   "copy",
   "sass",
   "postcss",
   "cssmin",
   "imagemin"
   ]);
};
