from fabric.api import env, hosts, local
import fabric.contrib.project as project


REQUIREJS = 'require-2.0.2.js'

env.use_ssh_config = True


def clean():
    local('rm _build -rf')

def glue():
    local('glue ./source/sprites/buttons --img=./source/css/images \
           --css=./source/scss --extension=scss -u images/')

def scss():
    local('sass ./source/scss/main.scss | cleancss -o ./source/css/main.css')

def build():
    local('mkdir -p _build')
    local('r.js -o build.js')
    local('cp -r ./source/css ./_build/css')
    local('cp ./source/index.html ./_build')
    local('mkdir -p ./_build/javascript/libraries/require')
    local('uglifyjs -nc -o ./_build/javascript/libraries/require/%s \
           ./source/javascript/libraries/require/%s' % (REQUIREJS, REQUIREJS))

def rebuild():
    clean()
    glue()
    scss()
    build()

@hosts('loopmesh')
def publish():
    rebuild()

    project.rsync_project(
        remote_dir='/home/loopmesh/newject/',
        local_dir='./_build/',
        delete=True
    )
