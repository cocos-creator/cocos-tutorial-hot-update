System.register(['./instantiated-332bb9e9.js'], function (exports) {
    'use strict';
    var legacyCC;
    return {
        setters: [function (module) {
            legacyCC = module.a_;
            exports('default', module.ge);
        }],
        execute: function () {

            function atob(input) {
              const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
              let output = '';
              let chr1 = 0;
              let chr2 = 0;
              let chr3 = 0;
              let enc1 = 0;
              let enc2 = 0;
              let enc3 = 0;
              let enc4 = 0;
              let i = 0;
              input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

              do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
                chr1 = enc1 << 2 | enc2 >> 4;
                chr2 = (enc2 & 15) << 4 | enc3 >> 2;
                chr3 = (enc3 & 3) << 6 | enc4;
                output += String.fromCharCode(chr1);

                if (enc3 !== 64) {
                  output += String.fromCharCode(chr2);
                }

                if (enc4 !== 64) {
                  output += String.fromCharCode(chr3);
                }
              } while (i < input.length);

              return output;
            }

            legacyCC._global.atob = atob;

        }
    };
});
