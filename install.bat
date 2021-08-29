call npm init -y
call npm install uuid acorn
call npm install webpack webpack-cli webpack-dev-server pug simple-pug-loader css-loader style-loader sass sass-loader html-webpack-plugin mini-css-extract-plugin resolve-url-loader terser-webpack-plugin jquery --save-dev
call npm install -g npm-add-script
call npmAddScript -k start -v "webpack serve --open"
call npmAddScript -k build -v "webpack"
call echo FINISH