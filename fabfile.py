from fabric.api import env, hosts, local
import fabric.contrib.project as project


REQUIREJS = 'require-2.0.4.js'

env.use_ssh_config = True


glue_each_template = """
.{{ class_name }} {
    background-position: {{ x }}px {{ y }}px;
    height: {{ height }}px;
    width: {{ width }}px;
    margin-left: {{ (-width / 2)|int }}px;
    margin-top: {{ (-height / 2)|int }}px;
}

${{ class_name }}-width: {{ width }}px;
${{ class_name }}-height: {{ height }}px;

"""

def clean():
    local('rm _build -rf')

def scss():
    local('sass ./source/scss/main.scss ./source/css/main.css \
           --style compressed')

def glue():
    local('glue ./source/sprites/buttons --img=./source/css/images \
           --css=./source/scss --extension=scss -u images/ \
          --each-template=\'%s\'' % glue_each_template)
    scss()

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

@hosts('stuartkeith')
def publish():
    rebuild()

    project.rsync_project(
        remote_dir='/home/stuartkeith/newject/',
        local_dir='./_build/',
        delete=True
    )
