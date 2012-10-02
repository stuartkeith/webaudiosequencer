from fabric.api import env, hosts, local
import fabric.contrib.project as project


REQUIREJS = 'require-2.0.5.js'

env.use_ssh_config = True


glue_each_template = """
span.{{ class_name }}, .{{ class_name }}::-webkit-slider-thumb {
    background-image: url({{ sprite_url }});
    background-repeat: no-repeat;
}

span.{{ class_name }} {
    background-position: {{ x }}px {{ y }}px;
    height: {{ height }}px;
    width: {{ width }}px;
    margin-left: {{ (-width / 2)|int }}px;
    margin-top: {{ (-height / 2)|int }}px;
}

.{{ class_name }}::-webkit-slider-thumb {
    background-position: ({{ x }}px - $button-border) ({{ y }}px - $button-border);
}

${{ class_name }}-width: {{ width }}px;
${{ class_name }}-height: {{ height }}px;

"""

def _read_google_analytics_file_contents():
    try:
        with open("google-analytics.txt") as ga_file:
            contents = ga_file.read()
    except IOError:
            contents = ""

    return contents

def clean():
    local('rm _build -rf')

def scss():
    local('sass ./source/scss/main.scss ./source/css/main.css \
           --style compressed')

def glue():
    local('glue ./source/sprites/buttons --img=./source/css/images \
           --css=./source/scss --extension=scss -u images/ \
           --global-template='' \
           --each-template=\'%s\'' % glue_each_template)
    scss()

def build():
    local('mkdir -p _build')
    local('r.js -o build.js')
    local('cp -r ./source/css ./_build/css')
    local('mkdir -p ./_build/javascript/libraries/require')
    local('uglifyjs -nc -o ./_build/javascript/libraries/require/%s \
           ./source/javascript/libraries/require/%s' % (REQUIREJS, REQUIREJS))

    ga_file_contents = _read_google_analytics_file_contents().strip()

    with open("./source/index.html") as index_file:
        index_contents = index_file.read()

    index_contents = index_contents.replace("<!--- google analytics -->", ga_file_contents)

    with open("./_build/index.html", "w") as index_output_file:
        index_output_file.write(index_contents)


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
