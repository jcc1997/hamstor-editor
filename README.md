# hamstor-editor

用于生产视频模版

## 原理

- svg 编辑器来源
  - svg（支持图片，支持动画）
- 编辑图形，加入动画
  - svg本身有动画
- 中间元素统一canvas
  - svg使用canvg转
- canvas to video：直接用 canvas2video 生成

svg -> canvas -> video 先打通
