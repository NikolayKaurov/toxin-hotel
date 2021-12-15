call npm init -y
call npm install --save-dev uuid acorn ajv webpack webpack-cli webpack-dev-server pug simple-pug-loader css-loader style-loader sass sass-loader html-webpack-plugin mini-css-extract-plugin resolve-url-loader file-loader terser-webpack-plugin
call npm install --save-prod jquery jsdom
call npx install-peerdeps --dev eslint-config-airbnb-base
call npx eslint --init
call npm install --global npm-add-script
call npmAddScript -k start -v "webpack serve --open"
call npmAddScript -k build -v "webpack --mode=production"
call echo FINISH
