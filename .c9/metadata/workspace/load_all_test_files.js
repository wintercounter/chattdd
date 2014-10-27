{"filter":false,"title":"load_all_test_files.js","tooltip":"/load_all_test_files.js","undoManager":{"mark":0,"position":0,"stack":[[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":0,"column":0},"end":{"row":0,"column":23}},"text":"var fs = require('fs'),"},{"action":"insertText","range":{"start":{"row":0,"column":23},"end":{"row":1,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":1,"column":0},"end":{"row":37,"column":0}},"lines":["\tasync = require('async');","","var result = [],","\tfileRegex = /^(?!.*setup).*\\.js$/;","","var queue = async.queue(function(item, done) {","\tfs.stat(item, function(err, stat) {","\t\tif (stat && stat.isDirectory()) {","\t\t\tfiles = fs.readdir(item, function(err, files) {","\t\t\t\tif (err) {","\t\t\t\t\treturn done();","\t\t\t\t}","","\t\t\t\tfiles.forEach(function(file) {","\t\t\t\t\tqueue.push(item + '/' +file);","\t\t\t\t});","\t\t\t});","\t\t}","\t\telse if (fileRegex.test(item)) {","\t\t\tconsole.log('Loading file ' + item);","\t\t\tresult.push(item);","\t\t}","","\t\tdone();","\t});","});","","queue.drain = function() {","\tvar data = '';","\tresult.forEach(function(file) {","\t\tdata += 'require(\"' + file + '\");';","\t});","","\tfs.writeFileSync('./all_test_file.js', data);","};",""]},{"action":"insertText","range":{"start":{"row":37,"column":0},"end":{"row":37,"column":22}},"text":"queue.push('./tests');"}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":37,"column":22},"end":{"row":37,"column":22},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1414348618138,"hash":"e1cb1e29054a00036b5278bb2a6c776a1bbbd755"}