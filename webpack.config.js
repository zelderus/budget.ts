module.exports = {
    entry: "./src/scripts/index",
    output: {
        filename: "bundle.js",
        path: __dirname + "/src/scripts/_prebuild"
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // 'awesome-typescript-loader' - сборщик из TypeScript в JavaScript
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // 'source-map-loader'
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // исключаем модули из общего бандла (незачем это все таскать хвостом, и пускай браузер кэширует это отдельно)
    // ради этой фишки и использую Webpack
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};