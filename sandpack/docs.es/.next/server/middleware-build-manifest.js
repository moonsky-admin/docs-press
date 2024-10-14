self.__BUILD_MANIFEST = {
  "polyfillFiles": [
    "static/chunks/polyfills.js"
  ],
  "devFiles": [
    "static/chunks/react-refresh.js"
  ],
  "ampDevFiles": [],
  "lowPriorityFiles": [],
  "rootMainFiles": [],
  "pages": {
    "/": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/index.js"
    ],
    "/404": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/404.js"
    ],
    "/_app": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_app.js"
    ],
    "/_error": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_error.js"
    ],
    "/getting-started": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/getting-started.js"
    ],
    "/getting-started/layout": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/getting-started/layout.js"
    ],
    "/getting-started/private-packages": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/getting-started/private-packages.js"
    ],
    "/getting-started/themes": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/getting-started/themes.js"
    ],
    "/getting-started/usage": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/getting-started/usage.js"
    ],
    "/quickstart": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/quickstart.js"
    ]
  },
  "ampFirstPages": []
};
self.__BUILD_MANIFEST.lowPriorityFiles = [
"/static/" + process.env.__NEXT_BUILD_ID + "/_buildManifest.js",
,"/static/" + process.env.__NEXT_BUILD_ID + "/_ssgManifest.js",

];