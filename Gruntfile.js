/*jshint node:true*/
module.exports = function(grunt)
{
	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		uglify: {
			options: {
				preserveComments: false,
				export: ["min", "gzip"],
				screwIE8: true,
				banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - " +
					"<%= grunt.template.today('m/d/yyyy') %>\n" +
					" * <%= pkg.homepage %>\n" +
					" * Copyright (c) <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>;" +
					" Licensed <%= _.pluck(pkg.licenses, 'type').join(', ') %> */\n"
			},
			dist: {
				files: {
					'dist/kafe.real.min.js': ['src/kafe.real.js']
				}
			}
		},

		qunit: {
			files: "tests/index.html"
		},

		connect: {
			server: {
			  options: {
			    port: 8000,
			    base: '.'
			  }
			}
		},

		jshint: {
			options: {
				jshintrc: true
			},
			core: {
				src: "src/**/*.js"
			},
			test: {
				src: "test/*.js"
			},
			grunt: {
				src: "Gruntfile.js"
			}
		},

		jscs: {
			all: [ "<%= jshint.core.src %>", "<%= jshint.test.src %>", "<%= jshint.grunt.src %>" ]
		}
	});

	grunt.loadNpmTasks("grunt-contrib-compress");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-jscs");
	grunt.loadNpmTasks("grunt-text-replace");
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask("ugly", [ "uglify" ]);
	grunt.registerTask("lint", [ "jscs" ]);
	grunt.registerTask("test", [ "connect", "qunit" ]);

	grunt.registerTask('default', 'say hello', function(name){
	  if(!name || !name.length)
	    grunt.warn('you need to provide a name.');

	  console.log('hello ' + name);
	});

};