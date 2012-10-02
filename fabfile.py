from fabric.api import env, execute, hosts, local
import fabric.contrib.project as project


env.use_ssh_config = True

SOURCE_DIR = './source/'
BUILD_DIR = './_build/'
BUILD_JS_FILENAME = 'build.js'
REQUIREJS_FILENAME = 'require-2.0.5.js'
GOOGLE_ANALYTICS_FILENAME = 'google-analytics.txt'
PUBLISH_HOST = 'stuartkeith'
PUBLISH_REMOTE_DIR = '/home/stuartkeith/webapps/static/html/webaudiosequencer/'

GLUE_EACH_TEMPLATE = """
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
        with open(GOOGLE_ANALYTICS_FILENAME) as ga_file:
            contents = ga_file.read()
    except IOError:
            contents = ''

    return contents

def clean():
    local('rm %s -rf' % BUILD_DIR)

def scss():
    local('sass %sscss/main.scss %scss/main.css \
           --style compressed' % (SOURCE_DIR, SOURCE_DIR))

def glue():
    local('glue %(source_dir)ssprites/buttons --img=%(source_dir)scss/images \
           --css=%(source_dir)sscss --extension=scss -u images/ \
           --global-template='' \
           --each-template=\'%(glue_each_template)s\'' % { 'source_dir': SOURCE_DIR, 'glue_each_template': GLUE_EACH_TEMPLATE })

def build():
    local('mkdir -p %s' % BUILD_DIR)
    local('r.js -o %s' % BUILD_JS_FILENAME)
    local('cp -r %scss %scss' % (SOURCE_DIR, BUILD_DIR))
    local('mkdir -p %sjavascript/libraries/require' % BUILD_DIR)
    local('uglifyjs -nc -o %sjavascript/libraries/require/%s \
           %sjavascript/libraries/require/%s' % (BUILD_DIR, REQUIREJS_FILENAME, SOURCE_DIR, REQUIREJS_FILENAME))

    ga_file_contents = _read_google_analytics_file_contents().strip()

    with open('%sindex.html' % SOURCE_DIR) as index_file:
        index_contents = index_file.read()

    index_contents = index_contents.replace('<!--- google analytics -->', ga_file_contents)

    with open('%sindex.html' % BUILD_DIR, 'w') as index_output_file:
        index_output_file.write(index_contents)

def rebuild():
    execute(clean)
    execute(glue)
    execute(scss)
    execute(build)

@hosts(PUBLISH_HOST)
def publish():
    project.rsync_project(
        remote_dir=PUBLISH_REMOTE_DIR,
        local_dir=BUILD_DIR,
        delete=True
    )
