exports.configs = {
    'ios': {
        hooks: './builder/hook.js',
        options: {
            remoteAddress: {
                label: 'Remote',
                render: {
                    ui: 'input',
                    attributes: {
                        placeholder: 'Enter remote address...',
                    },
                },
                verifyRules: ['require', 'http'],
            },
        },
    },
};

