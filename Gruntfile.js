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
        src: ['assets/js/<%= pkg.name %>.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    nodemon: {
      dev: {
        script: 'app.js'
      }
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
        files: ['assets/css/*.less', 'assets/css/modules/*.less', 'assets/js/*.js', '!Gruntfile.js'],
        tasks: ['less', 'uglify'],
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
  grunt.loadNpmTasks('grunt-nodemon');

  // Default task.
  grunt.registerTask('default', ['less', 'uglify']);
  grunt.registerTask('server', ['nodemon', 'watch']);
  grunt.registerTask('deploy', ['default', 'clean', 'concat',  'copy']);

};
