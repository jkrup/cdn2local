#!/usr/bin/env node

var program = require('commander');
var jsdom = require('jsdom')
var Download = require('download');

var path = require('path')
var fs = require('fs');

program.version('0.1.0');

program
.command('*')
.action(function(file_and_path) {
  var result;
  var fap = path.normalize(file_and_path) //TODO: RIGHT NOW ONLY SUPPORTS FILE [NO PATH]
  result = fap;
  jsdom.env(
    fap, 
    ["http://code.jquery.com/jquery.js"],
    function(errors,window){
      var assets_dir = "assets"; //Where to DL assets to

      var replace_with_local = function(tagname, attr, assets_dir, callback) {
        window.$(tagname).each( function(index, element) {
          var src = window.$(element).attr(attr).toLowerCase();

          // If no protocol provided use http (to DL)
          // Also check if local/relative path
          if(src.split('//').length > 1) {
            if(src.split('//')[0] === "") {
              src = 'http:' + src;
            }
            else if (!(src.split('//')[0] == "http:" || src.split('//')[0] == "https:")) {
              return true; //just a relative path with two slashes somewhere (eg. 'test/app//again.js')
            }
          }
          else {
            return true;
          }
          var dest_name = src.split('/')[src.split('/').length-1]
          var download = new Download({})
          download.get(src).dest(assets_dir).rename(dest_name).run(function(err, files, stream) {
            if(err) {
              console.log( err)
            }
            console.log("DL Success!");
            //Change src to local
          });
          console.log("from: " +window.$(element).attr(attr));
          window.$(element).attr(attr, assets_dir + '/' + dest_name);
          console.log("to: " + window.$(element).attr(attr));
        });
        callback();
      }

      replace_with_local("script", "src", "assets/js", function() {
        replace_with_local("link", "href", "assets/css", function() {
          console.log("Writing...");
          var faparr = fap.split(".");
          faparr[faparr.length - 2]= faparr[faparr.length-2] + '-local'
          var newFap = faparr.join(".");
          var node = window.document.doctype;
          var doctype_html = "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>';

          fs.writeFile(newFap, doctype_html + window.document.documentElement.outerHTML, function(err) {
            if (err) {
              throw err;
            }
            console.log("SAVED");
          });
        });
      });
    });
});

program.parse(process.argv);
