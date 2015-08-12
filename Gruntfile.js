module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %>.js <%= grunt.template.today("dd/mm/yyyy") %> */\n',
				preserveComments: false,
				screwIE8: true,
				sourceMap: true,
				sourceMapName: 'dist/<%= pkg.name %>.map',
				report: "gzip",
				compress: {
					drop_console: true,
					global_defs: {
						DEBUG: false
					}
				}
			},
			dist: {
				src: 'kafe.real.js',
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},

		jshint: {
			files: ['Gruntfile.js', 'kafe.real.js', "package.json"],
			options: {
				eqeqeq: true,
				nonbsp: true,
				notypeof: true,
				shadow: true,
				maxdepth: 1,
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