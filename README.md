cdn2local
==========


`cdn2local` automatically downloads externally loaded scripts and stylesheets from an HTML file and creates a new HTML file with '-local' appended to the name to load them locally.

-------------------------------
## Usage

```bash
$ cdn2local [html_file]
```

**NOTE:** Right now it will only work properly if you run it in the same directory as the file you are trying to convert.


## TODO:

* Grab icons and background images from CSS too 
* Run on directory level of project
* Add option to grab all images
* Add more options for user
    * Specify assets directory and subdirectory for different types of assets
* Add option to only fallback to local



This is something I just made since right now I'm frequently travelling between places with internet and without internet.