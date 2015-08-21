module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %>.js <%= grunt.template.today("dd/mm/yyyy") %> */\n',
				preserveComments: false,
				report: 'gzip',
				screwIE8: true,
				sourceMap: true,
				sourceMapName: 'dist/<%= pkg.name %>.map',
				strict: true,
				compress: {
					drop_console: true,
					global_defs: {
						'this.options.debug': false
					}
				}
			},
			dist: {
				src: 'kafe.real.js',
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},

		clean: {
			release: ['dist/*']
		},

		watch: {
			scripts: {
				files: ['kafe.real.js', '.jscsrc', 'Gruntfile.js'],
				tasks: ['jscs', 'jshint']
			}
		},

		jscs: {
			options: {
				config: '.jscsrc',
				verbose: true,
				force: true,
				reporter: require('jscs-stylish').path
			},
			core: {
				src: ['kafe.real.js', 'Gruntfile.js']
			}
		},

		jshint: {
			files: ['kafe.real.js'],
			options: {
				eqeqeq: true,
				loopfunc: true,
				maxdepth: 1,
				nonbsp: true,
				notypeof: true,
				plusplus: true,
				shadow: true,
				unused: true,
				globals: {
					jQuery: true
				},
				'-W040': true // Possible strict violation.
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jscs');

	grunt.registerTask('clear', ['clean']);
	grunt.registerTask('build', ['uglify']);
	grunt.registerTask('verify', ['jscs','jshint']);
	grunt.registerTask('dev', ['watch']);
};
