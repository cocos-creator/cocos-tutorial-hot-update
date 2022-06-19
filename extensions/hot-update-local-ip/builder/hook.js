
'use strict';

const os = require("os");
const path = require("path");
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

exports.onAfterBuild = function (options, result) {
    debugger

    let cmd = `node version_generator.js -v 1.0.0 -u http://${getIPAdress()}:${remote_port}/ -s ${path.join(result.dest, "assets")} -d ${path.join(Editor.Project.path, "assets")}`    
    console.warn(cmd);

    exec(cmd, { cwd: Editor.Project.path }, (err, stdout, stderr) => {
        if (!err) return;
        console.error(err);
    });
}
