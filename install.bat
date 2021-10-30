call npm init -y
call npm install --save-dev uuid acorn webpack webpack-cli webpack-dev-server pug simple-pug-loader css-loader style-loader sass sass-loader html-webpack-plugin mini-css-extract-plugin resolve-url-loader terser-webpack-plugin jquery jsdom eslint npm-add-script
call npx npmAddScript -k start -v "webpack serve --open"
call npx npmAddScript -k build -v "webpack"
call echo FINISH