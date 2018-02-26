module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      ignore_warning: {
        options: {
          'esversion': 6,
          '-W015': true,
        },
        src: ['app.js'],
        filter: 'isFile'
      },
    },
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint']);
};
