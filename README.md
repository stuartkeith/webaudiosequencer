Required Server Configuration
-----------------------------

To get around cross domain AJAX restrictions, the following URLs should mapped:

- {index.html path}/freesound/{id}
  - http://www.freesound.org/data/previews/{id}
- {index.html path}/soundcloud/tracks/{id}
  - http://api.soundcloud.com/tracks/{id}/stream

The SoundCloud URL redirects to ak-media.soundcloud.com, so if the proxy
doesn't follow that itself then it will be necessary to handle that too.

An example Nginx configuration:

	location /freesound/ {
		rewrite \/freesound\/(.*) /data/previews/$1 break;
		proxy_set_header Host www.freesound.org;
		proxy_pass http://www.freesound.org;
	}

	location /soundcloud/tracks/ {
		rewrite \/soundcloud\/tracks\/(\d*) /tracks/$1/stream break;
		proxy_set_header Host api.soundcloud.com;
		proxy_pass http://api.soundcloud.com;
		proxy_redirect http://ak-media.soundcloud.com http://$host/soundcloud/media;
	}

	location /soundcloud/media/ {
		rewrite \/soundcloud\/media\/(.*) /$1 break;
		proxy_set_header Host ak-media.soundcloud.com;
		proxy_pass http://ak-media.soundcloud.com;
	}
