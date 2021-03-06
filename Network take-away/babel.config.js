// module.exports = {
//   presets: [
//     '@vue/cli-plugin-babel/preset'
//   ],
//   "plugins": ["transform-vue-jsx", "transform-runtime", ["component", [
//     {
//       "libraryName": "mint-ui",
//       "style": true
//     }
//   ]]]
// }
{
  "presets" [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins" ["transform-vue-jsx", "transform-runtime", ["component", [
    {
      "libraryName": "mint-ui",
      "style": true
    }
  ]]]
}
