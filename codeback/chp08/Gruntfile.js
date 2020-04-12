module.exports = function (grunt) {
    // 加载插件
    ['grunt-mocha-test', 'grunt-contrib-jshint', 'grunt-exec'].forEach(
        function (task) {
            grunt.loadNpmTasks(task);
        }
    );
    // 配置插件
    grunt.initConfig({
        mochaTest: {
            test: {
                src: ['public/qa/tests-*.js'],
                options: {
                    ui: 'tdd',
                    reporter: 'spec',
                    captureFile: 'results.txt',
                }
            }
        },
        jshint: {
            app: [
                'meadowlark.js', 'public/js/*.js', 'lib/*.js'
            ],
            qa: ['Gruntfile.js', 'public/qa/*.js']
        },
        exec: {
            linkscanner: {
                cmd: 'linkscanner http://localhost:3000'
            }
        }
    });
    // 注册任务
    grunt.registerTask('default', ['mochaTest', 'jshint', 'exec']);
};