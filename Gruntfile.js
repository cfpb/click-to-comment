/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    clean: ['dist'],

    copy: {
      all: {
         src: ['*.css', '*.html', 'images/**/*', 'img/**/*', 'assets/**/*'],
        dest: 'dist/',
      },
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    connect: {
      options: {
        port: process.env.PORT || 3131,
        base: 'dist/',
      },

      all: {},
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },

    less: {
      main: {
        options: {
          paths: ['assets/css'],
        },
        files: {
          'assets/css/main.css': ['assets/css/main.less']
        }
      }
    },

    watch: {
      assets: {
        files: ['assets/**/*', '*.css', '*.js', 'images/**/*', 'img/**/*', '!Gruntfile.js'],
        tasks: ['copy'],
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task.
  grunt.registerTask('default', ['concat', 'uglify']);
  grunt.registerTask('server', ['default', 'connect', 'watch']);
  grunt.registerTask('deploy', ['clean', 'copy']);

};
