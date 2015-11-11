/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-01-21 13:32:54
 * @version $Id$
 */

 module.exports = function(grunt) {
  //配置参数
  grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
     srcfiles:[
                    'src/emap/emap.js',

                    'src/emap/base/emap.lnglat.js',
                    'src/emap/base/emap.extent.js',
                    'src/emap/base/emap.bounds.js',

                    'src/emap/common/emap.tool.js',
                    'src/emap/common/emap.icon.js',

                    'src/emap/control/emap.control.maptypecontrol.js',
                    'src/emap/control/emap.control.js',

                    'src/emap/layers/baselayers/tile/source/emap.baselayer.emaparcgissource.js',
                    'src/emap/layers/baselayers/tile/emap.baselayer.tile.js',
                    'src/emap/layers/baselayers/tile/emap.baselayer.emapplanetile.js',
                    'src/emap/layers/baselayers/tile/emap.baselayer.emapsatellitetile.js',

                    'src/emap/layers/baselayers/tile/emap.baselayer.wmts.emapplanetile.js',
                    'src/emap/layers/baselayers/tile/emap.baselayer.wmts.emapsatellitetile.js',
                    'src/emap/layers/baselayers/emap.baselayers.manager.js',

                    'src/emap/layers/feature/emap.layer.vector.js',

                    'src/emap/feature/emap.feature.marker.js',
                    'src/emap/feature/emap.feature.polyline.js',
                    'src/emap/feature/emap.feature.polygon.js',
                    'src/emap/feature/emap.feature.circle.js',

                    'src/emap/feature/draw/emap.feature.drawpolyline.js',
                    'src/emap/feature/draw/emap.feature.drawpolygon.js',
                    'src/emap/feature/draw/emap.feature.drawrect.js',
                    'src/emap/feature/draw/emap.feature.drawcircle.js',

                    'src/emap/overlay/emap.overlay.marker.js',
                    'src/emap/overlay/emap.overlay.labelmarker.js',
                    'src/emap/overlay/emap.overlay.popuwindow.js',

                    'src/emap/events/emap.eventtype.js',
                    'src/emap/emap.map.js',
                    'src/emap/base/emap.bounds.js'
              ],
      clean: {//清除目录
        all: ['dest/**']
      },
      copy: {//复制文件
        image: {
          files: [
            {expand: true, cwd: 'images', src: ['*.{png,jpg,jpeg,gif}'], dest: 'dest/images'}
          ]
        }
      },
     concat: {//合并文件
         options: {
             separator: ';',
             stripBanners: true
         },
         dest: {
             src: '<%= srcfiles %>',
             dest: "dest/<%= pkg.name %>.js"
         }
     },
     concat_css: {//合并css
	    options: {},
	    all: {
	      src: ["css/*.css"],
	      dest: "dest/<%= pkg.name %>.css"
	    },
	  },
     uglify: {//压缩插件
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= srcfiles %>',
        dest: 'dest/<%= pkg.name %>.min.js'
      }
    },
     cssmin: {//css压缩
         options: {
             keepSpecialComments: 0
         },
         compress: {
             files: {
                 'dest/<%= pkg.name %>.min.css': [
                     "css/*.css"
                 ]
             }
         }
     },
    jshint: {//js检查
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    }
  });
 
  //载入concat和uglify插件，分别对于合并和压缩
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
 
  //注册任务
  grunt.registerTask('default', [
  	'clean',
  	'copy',
  	//'jshint',
  	'concat',
  	'concat_css', 
  	'uglify', 
  	'cssmin'
  	]);
}