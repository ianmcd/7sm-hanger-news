/* global module, require */

module.exports = function(grunt) {
  'use strict';

  //	loads grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  //	times tasks for future optimization
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //	grunt server
    connect: {
      options: {
        port: 4444,
        hostname: 'localhost',
        open: true,
        livereload: 35729
      },
      dev: {
        options: {
          base: ''
        }
      }
    },

    // scss linter
    scsslint: {
      options: {
        config: '.scss-lint.yml',
        reporterOutput: 'scss-lint-report.xml',
        colorizeOutput: true
      },
      build: [ '_source-files/scss/**/*.scss' ]
    },

    //	sass
    sass: {
      options: {
        sourcemap: 'auto',
        style: 'expanded',
      },
      build: {
        files: {
          'css/styles.css': '_source-files/scss/styles.scss'
        }
      }
    },

    // postcss w/ autoprefixer
    postcss: {
      options: {
        processors: [
          require('autoprefixer')
        ],
        map: true
      },
      build: { src: ['css/styles.css', 'css/styles.css'] }
    },

    //	watches files / runs tasks as needed
    watch: {
      scss: {
        files: ['_source-files/scss/**/*.scss'],
        tasks: ['scsslint:build', 'sass', 'postcss:build']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '**/*.html',
          '**/*.css',
          '**/*.js'
        ]
      }
    }
  });

  //	TASKS

  grunt.registerTask('serve', [
    'scsslint',
    'sass',
    'postcss',
    'connect',
    'watch',
  ]);


  grunt.registerTask('default', [
    'serve'
  ]);
};
