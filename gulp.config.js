const config = {};

config.variables = () => {
    const files = {
        env: 'development',
        alljs: [
            './api/**/*.js',
            './service/*.js',
            './middleware/*.js',
            './config/*.js',
            './*.js',
            './.env',
        ]
    };
    return files;
};

module.exports = config.variables;