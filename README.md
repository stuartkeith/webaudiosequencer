Credits
-------

The icons used are part of the [Default Icon](http://www.defaulticon.com/)
set by [interactivemania](http://www.interactivemania.com/).

The tiled background is the 'Subtle Dots' pattern by
[Designova](http://www.designova.net/) (downloaded via
[Subtle Patterns](http://subtlepatterns.com/subtle-dots/)).


Required Server Configuration
-----------------------------

To get around cross domain AJAX restrictions, the following URLs should be handled:

- {index.html path}/freesound/{id} to http://www.freesound.org/data/previews/{id}
- {index.html path}/soundcloud/tracks/{id} to http://api.soundcloud.com/tracks/{id}/stream

The SoundCloud URL returns a 302 redirect to the actual MP3, so if the proxy
doesn't handle that itself then it will be necessary to handle that too.

Here is an example Nginx configuration:

    location /freesound/ {
        rewrite \/freesound\/(.*) /data/previews/$1 break;
        proxy_pass http://www.freesound.org;
    }

    location /soundcloud/tracks/ {
        rewrite \/soundcloud\/tracks\/(\d*) /tracks/$1/stream break;
        proxy_pass http://api.soundcloud.com;
        proxy_redirect ~^http://(.*)\.soundcloud\.com\/(.*)$ /soundcloud/media/$1/$2;

        # or I use this for WebFaction:
        # set_proxy_header X-Forwarded-Host $proxy_host;
        # proxy_redirect ~^http://(.*)\.soundcloud\.com\/(.*)$ http://$host/soundcloud/media/$1/$2;
    }

    location /soundcloud/media/ {
        resolver 8.8.8.8;
        rewrite \/soundcloud\/media\/(.*)\/(.*) /$2 break;
        proxy_pass http://$1.soundcloud.com;
    }
