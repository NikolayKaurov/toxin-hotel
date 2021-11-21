call npm init -y
call npm install --save-dev uuid acorn ajv webpack webpack-cli webpack-dev-server pug simple-pug-loader css-loader style-loader sass sass-loader html-webpack-plugin mini-css-extract-plugin resolve-url-loader terser-webpack-plugin jsdom eslint eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks eslint-config-airbnb eslint-config-airbnb-base eslint-plugin-pug
call npm install --save-prod jquery
call npm install --global npm-add-script
call npmAddScript -k start -v "webpack serve --open"
call npmAddScript -k build -v "webpack --mode=production"
call echo FINISH