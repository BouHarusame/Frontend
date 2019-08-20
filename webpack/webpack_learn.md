# webpack 安装及使用

### 本地安装

  要安装最新版本或特定版本，请运行以下命令之一：

    npm install --save-dev webpack
    npm install --save-dev webpack@<version>

  如果你使用 webpack 4+ 版本，你还需要安装 CLI。

    npm install --save-dev webpack-cli

  对于大多数项目，我们建议本地安装。webpack 通过运行一个或多个 npm scripts

```js
    "scripts": {
      "start": "webpack --config webpack.config.js"
    }
```

### 全局安装

    npm install --global webpack

    不推荐全局安装 webpack。这会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。

***

### 初始化项目
```js
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
````

创建以下目录结构、文件和内容

```js
  webpack-demo
  |- package.json
+ |- /dist
+    |- index.html
+ |- /src
+   |- index.js
```

需要调整 package.json 文件，以便确保我们安装包是私有的(private)，并且移除 main 入口。这可以防止意外发布你的代码
``` js
  {
    "name": "webpack-demo",
    "version": "1.0.0",
    "description": "",
+   "private": true,
-   "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "webpack": "^4.0.1",
      "webpack-cli": "^2.0.9"
    },
    "dependencies": {}
  }
```

要在 index.js 中打包 lodash 依赖(接下来用于测试打包), 在 src/index.js 中引入
``` js
npm install --save lodash
```

执行 npx webpack，会将我们的脚本作为入口起点，然后 输出 为 main.js
``` js
npx webpack
```

### 添加配置文件
  在 webpack 4 中，可以无须任何配置使用，然而大多数项目会需要很复杂的设置，这就是为什么 webpack 仍然要支持 配置文件. webpack.config.js
``` js
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```
``` js
npx webpack --config webpack.config.js
通过以上命令可以打包出和刚刚一样的效果，但输入的js文件名改为bundle.js了
```

在 package.json 添加一个 npm 脚本(npm script),可以使用 npm run build 命令来替代我们之前使用的 npx 命令
``` js
package.json
  {
    "name": "webpack-demo",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
+     "build": "webpack"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "webpack": "^4.0.1",
      "webpack-cli": "^2.0.9",
      "lodash": "^4.17.5"
    }
  }
```

*<font color=#00bfff>通过向 npm run build 命令和你的参数之间添加两个中横线，可以将自定义参数传递给 webpack，例如：npm run build -- --colors。</font>*

### 管理资源
#### &#8194;&#8194; 1、 加载 CSS
&#8195;&#8195; 从 JavaScript 模块中 import 一个 CSS 文件，你需要在 module 配置中 安装并添加 style-loader 和 css-loader：
``` js
npm install --save-dev style-loader css-loader
```
``` js
webpack.config.js
  const path = require('path');
  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
  };
```

  *<font color=#00bfff>webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。在这种情况下，以 .css 结尾的全部文件，都将被提供给 style-loader 和 css-loader。</font>*

#### &#8194;&#8194; 2、 加载图片
我们的背景和图标这些图片使用 file-loader，我们可以轻松地将这些内容混合到 CSS 中

``` js
npm install --save-dev file-loader
```

``` js
webpack.config.js
  const path = require('path');
  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  }
```

*<font color=#00bfff>合乎逻辑下一步是，压缩和优化你的图像。查看 image-webpack-loader 和 url-loader，以了解更多关于如果增强加载处理图片功能。</font>*

#### &#8194;&#8194; 3、 加载字体
像字体这样的其他资源, 可以用file-loader 和 url-loader 可以接收并加载任何文件，然后将其输出到构建目录。

``` js
webpack.config.js
  const path = require('path');
  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
+       {
+         test: /\.(woff|woff2|eot|ttf|otf)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```

#### &#8194;&#8194; 4、加载数据
可以加载的有用资源还有数据，如 JSON 文件，CSV、TSV 和 XML。类似于 NodeJS，JSON 支持实际上是内置的，也就是说 import Data from './data.json' 默认将正常运行。要导入 CSV、TSV 和 XML，你可以使用 csv-loader 和 xml-loader。

``` js
npm install --save-dev csv-loader xml-loader
```

``` js
webpack.config.js
  const path = require('path');
  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        },
+       {
+         test: /\.(csv|tsv)$/,
+         use: [
+           'csv-loader'
+         ]
+       },
+       {
+         test: /\.xml$/,
+         use: [
+           'xml-loader'
+         ]
+       }
      ]
    }
  };
```

*<font color=#00bfff>在使用 d3 等工具来实现某些数据可视化时，预加载数据会非常有用。我们可以不用再发送 ajax 请求，然后于运行时解析数据，而是在构建过程中将其提前载入并打包到模块中，以便浏览器加载模块后，可以立即从模块中解析数据。</font>*

