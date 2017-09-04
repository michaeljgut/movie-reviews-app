module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      ignore_warning: {
        options: {
          '-W015': true,
        },
        src: ['app.js'],
        filter: 'isFile'
      },
    },
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
};
