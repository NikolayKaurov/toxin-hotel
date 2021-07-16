const path = require('path');
const fs = require('fs');

const slash = '\\';
const endLine = require('os').EOL;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const pages = path.resolve(__dirname, 'pages');
const blocks = path.resolve(__dirname, 'blocks');

let bemEntities = {};
let useBemEntities = {};
let blockPath = '';
let elementPath = '';
let modifierPath = '';

let includeThisToPUG = '';
let includeThisToSCSS = '';
let includeThisToJSArray = [];

let sourcePages = {};
let sourceJS = {};
let sourceJStoWrite = new Set();

let templates = [];

let plugins = [new MiniCssExtractPlugin({filename: 'style.css'})];

fs.readdirSync(blocks).forEach(block => {
  blockPath = blocks + slash + block;
  if (fs.lstatSync(blockPath).isDirectory()) {
    bemEntities[block] = blockPath;
    if (fs.existsSync(blockPath + slash + block + '.js'))
      sourceJS[block] = fs.readFileSync(blockPath + slash + block + '.js','utf-8').replace(/import.*\r\n/gi, '');
    fs.readdirSync(blockPath).forEach(element => {
      elementPath = blockPath + slash + element;
      if (fs.lstatSync(elementPath).isDirectory()) {
        bemEntities[block + element] = elementPath;
        if (fs.existsSync(elementPath + slash + element + '.js'))
          sourceJS[block + element] = fs.readFileSync(elementPath + slash + element + '.js','utf-8').replace(/import.*\r\n/gi, '');
        fs.readdirSync(elementPath).forEach(modifier => {
          modifierPath = elementPath + slash + modifier;
          if (fs.lstatSync(modifierPath).isDirectory()) {
            bemEntities[block + element + modifier] = modifierPath;
          }
        })
      }
    })
  }
});

fs.readdirSync(pages).forEach(page =>{
  if (page.match(/\.pug$/i)) {
    sourcePages[page] = fs.readFileSync(pages + slash + page,'utf-8').replace(/include.*\r\n/gi, '');
  }
});

for (let page in sourcePages) {
  fileAnalysis(sourcePages[page], bemEntities, useBemEntities);
}


function isEmpty(obj) {
  for (let key in obj) {
    // если тело цикла начнет выполняться - значит в объекте есть свойства
    return false;
  }
  return true;
}

function fileAnalysis(content, bemEntities, useBemEntities) {
  // let content = fs.readFileSync(filePath, 'utf-8'); // считать содержимое файла
  let words = content.match(/[a-z]([a-z0-9-_]*[a-z0-9])?/gi) || [];
  // получить массив слов, которые могут быть именами БЭМ-сущностей
  let entityFilePath = '';
  let setWords = new Set(words); // убрать повторы из массива слов
  setWords.forEach((entity) => { // для каждого слова в массиве
    if (bemEntities[entity]) { // если слово является именем БЭМ-сущности
      useBemEntities[entity] = bemEntities[entity]; // вырезать БЭМ-сущность из объекта "все БЭМ-сущности"
      delete bemEntities[entity];                   // и вставить в объект "используемые БЭМ-сущности"
      if (isEmpty(bemEntities)) return; // если используются все БЭМ-сущности, закончить
      else {                            // иначе проанализировать файл шаблона .pug и скрипта .js данной БЭМ-сущности
        entityFilePath = useBemEntities[entity] + slash + entity + '.pug'; // получить путь к файлу шаблона
        if (fs.existsSync(entityFilePath)) { //если файл шаблона существует
          fileAnalysis(fs.readFileSync(entityFilePath,'utf-8'), bemEntities, useBemEntities); // вызвать для него эту же функцию
          if (isEmpty(bemEntities)) return; // если используются все БЭМ-сущности, закончить
        }
        // entityFilePath = useBemEntities[entity] + slash + entity + '.js'; // получить путь к файлу скрипта
        if (sourceJS[entity]) { //если файл скрипта существует
          fileAnalysis(sourceJS[entity], bemEntities, useBemEntities); // вызвать для него эту же функцию
          if (isEmpty(bemEntities)) return; // если используются все БЭМ-сущности, закончить
        }
      }
    }
  })
}

fs.readdirSync(pages).forEach(page =>{
  if (page.match(/\.pug$/i)) {
    templates.push(new HtmlWebpackPlugin({
      filename: page.replace(/\.pug$/i, '.html'),
      template: pages + slash + page}))
  }
});

for (let entity in useBemEntities) {
  if (fs.existsSync(useBemEntities[entity] + slash + entity + '.pug')) {
    includeThisToPUG = includeThisToPUG + 'include ' + useBemEntities[entity] + slash + entity + endLine;
  }
  if (fs.existsSync(useBemEntities[entity] + slash + '_' + entity + '.scss')) {
    includeThisToSCSS = includeThisToSCSS + "@use '" + useBemEntities[entity].replace(/^.*blocks/i, 'blocks').replace(/\\/g, '/') + '/' + entity + "';" + endLine;
  }
  if (fs.existsSync(useBemEntities[entity] + slash + entity + '.js')) {
    if (entity.match(/^[a-z0-9-]+__[a-z0-9-]+_.+$/i)) {
      includeThisToJSArray.push("import " + entity + " from '" + useBemEntities[entity].replace(/^.*blocks\\.*\\.*\\/i, './').replace(/\\/g, '/') + '/' + entity + "';" + endLine);
    } else {
      if (entity.match(/(^[a-z0-9-]+__.+$)|(^[a-z0-9-]+_.+$)/i)) {
        includeThisToJSArray.push("import " + entity + " from '" + useBemEntities[entity].replace(/^.*blocks\\.*\\/i, './').replace(/\\/g, '/') + '/' + entity + "';" + endLine);
      } else {
        includeThisToJSArray.push("import " + entity + " from '" + useBemEntities[entity].replace(/^.*blocks\\/i, '../blocks/').replace(/\\/g, '/') + '/' + entity + "';" + endLine);
      }
    }
  }
}

for (let page in sourcePages) {
  sourcePages[page] = includeThisToPUG + sourcePages[page];
  fs.writeFileSync(pages + slash + page, sourcePages[page]);
}

includeThisToJSArray.sort(function(stringA, stringB) {
  if (stringA.match(/^import\s[a-z0-9-_]*/i)[0].includes(stringB.match(/^import\s[a-z0-9-_]*/i)[0])) return -1;
  return 1;
})


includeThisToJSArray.forEach((line, index, thisArray) => {
  let entity = '';
  let parentEntity = '';
  for (let i = index + 1; i < thisArray.length; i++) {
    entity = line.match(/^import\s[a-z0-9-_]*/i)[0].replace(/^import\s/i, '');
    parentEntity = thisArray[i].match(/^import\s[a-z0-9-_]*/i)[0].replace(/^import\s/i, '');
    if (entity.includes(parentEntity)) {
      sourceJS[parentEntity] = line + sourceJS[parentEntity];
      sourceJStoWrite.add(parentEntity);
      thisArray[index] = '';
      break;
    }
  }
})

sourceJStoWrite.forEach(entity => {
  fs.writeFileSync(useBemEntities[entity] + slash + entity + '.js', sourceJS[entity]);
})

includeThisToJSArray.push('import \'./style.scss\';' + endLine);

let includeThisToJS = includeThisToJSArray.join('');

fs.writeFileSync(pages + slash + 'style.scss', includeThisToSCSS);
fs.writeFileSync(pages + slash + 'script.js', includeThisToJS);

module.exports = {
  mode: 'production',

  devtool: 'source-map',

  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },

  entry: pages + slash + 'script.js',
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },

  plugins: templates.concat(plugins),

  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
        }
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            }
          },

          {
            loader: 'css-loader',
            options: {

            }
          },

          {
            loader: 'resolve-url-loader',
            options: {
            }
          },

          {
            loader: 'sass-loader',
            options: {

            }
          }
        ]
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif|ttf|woff|woff2)$/i,
        type: 'asset/resource',
      },
    ]
  }
};