module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd/mm/yyyy") %> */\n'
			},
			dist: {
				src: 'kafe.real.js',
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},

		jshint: {
			files: ['Gruntfile.js', 'money.js'],
			options: {
				globals: {
					jQuery: true
				},
				'-W040': true // Possible strict violation.
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('build', ['uglify']);
	grunt.registerTask('default', ['jshint']);

};