call npm init -y
call npm install --save-dev webpack webpack-cli webpack-dev-server pug pug-loader css-loader style-loader sass sass-loader html-webpack-plugin mini-css-extract-plugin resolve-url-loader uglifyjs-webpack-plugin
call npm install -g npm-add-script
call npmAddScript -k start -v "webpack serve --open"
call npmAddScript -k build -v "webpack"