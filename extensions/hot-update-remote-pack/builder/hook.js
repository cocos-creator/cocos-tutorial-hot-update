
'use strict';

const os = require("os");
const fs = require("fs");
const path = require("path");
const http = require("http");
const { exec } = require('child_process');

const remote_port = 7879;

function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

let remote_server = null;
function createServer(home, ip, port) {
    try {
        if (null != remote_server) {
            remote_server.close();
        }

        console.warn("http://" + ip + ":" + port + "/version.manifest");
        remote_server = http.createServer(
            function (request, response) {
                if (request.method != "GET" && request.method != "HEAD") {
                    response.writeHead(403);
                    response.end();
                    return null;
                }

                var sep = request.url.indexOf('?');
                var filePath = sep < 0 ? request.url : request.url.slice(0, sep);

                var fileStat = fs.stat(path.join(home, "." + filePath),
                    function (err, stats) {
                        console.warn("GET file: " + path.join(home, "." + filePath));

                        if (err) {
                            response.writeHead(404);
                            response.end();
                            return null;
                        }

                        response.writeHead(200, { "Content-Type": "text/plain", "Content-Length": stats.size });
                        var stream = fs.createReadStream(path.join(home, "." + filePath));

                        stream.on('data', function (chunk) {
                            response.write(chunk);
                        });

                        stream.on('end', function () {
                            response.end();
                        });

                        stream.on('error', function () {
                            response.end();
                        });
                    }
                );
            }
        ).listen(port);
    }
    catch (e) {
        console.error(e);
    }
}

exports.onAfterBuild = function (options, result) {
    let resdir = 'assets';

    if (fs.existsSync(path.join(result.dest, 'data'))) {
        resdir = 'data';
    }

    let cmd = `node version_generator.js -v 1.0.1 -u http://${getIPAdress()}:${remote_port}/ -s ${path.join(result.dest, resdir)} -d ${path.join(result.dest,resdir)}`    
    console.warn(cmd);

    exec(cmd, { cwd: Editor.Project.path }, (err, stdout, stderr) => {
        if (!err) return;
        console.error(err);
    });
    createServer(path.join(result.dest, resdir), getIPAdress(), remote_port);
}
