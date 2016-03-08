/**
 * Babel will have changed all JSX files, and will have
 * changed their extension to JS, but will not have changed
 * the `require()` calls, so we need to make sure those now
 * ask for .js files, not .jsx files.
 */

var fs = require("fs");
var path = require("path");
var dir = "es5";
var data = fs.readdirSync(dir);

data.forEach(function(file) {
  var fname = path.join(dir, file);
  var fdata = fs.readFileSync(fname).toString();
  var lines = fdata.split('\n');
  lines.forEach(function(line, pos) {
    lines[pos] = line.replace(/\.jsx(['"])\)/g, '.js$1)');
  });
  fs.writeFileSync(fname, lines.join('\n'));
});
