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

json <-> svg -> canvas -> video 先打通

canvg 很糊；不支持animationMotion

https://html5animationtogif.com/svg-to-video 直接调用api？
https://sendeyo.com/onlineconverter/en/svg/mp4

https://www.npmjs.com/package/recordrtc 从video到文件，支持录屏 MediaDevices.getDisplayMedia()

https://github.com/tungs/timecut svg to video

timecut uses timesnap to record frames to send to ffmpeg. timesnap uses puppeteer's page.evaluateOnNewDocument feature to automatically overwrite a page's native time-handling JavaScript functions and objects (new Date(), Date.now, performance.now, requestAnimationFrame, setTimeout, setInterval, cancelAnimationFrame, cancelTimeout, and cancelInterval) to custom ones that use a virtual timeline, allowing for JavaScript computation to complete before taking a screenshot.

This work was inspired by a talk by Noah Veltman, who described altering a document's Date.now and performance.now functions to refer to a virtual time and using puppeteer to change that virtual time and take snapshots.

https://github.com/etienne-martin/svg-to-img

./node_modules/timecut/cli.js Animation.svg

electron 录屏 electron.desktopCapturer


# svg to blob to dataURL to image to canvas

https://github.com/0xdv/svg-to-video/blob/master/src/recorder.js
XMLSerializer.prototype.serializeToString 将Element序列化为字符串
insertAdjacentHTML 解析html字符串作为Element插入
```
let el = this && this.options.drawScene(t)
let serialized = new XMLSerializer().serializeToString(el)
let blob = new Blob([serialized], {type: 'image/svg+xml'})
let url = URL.createObjectURL(blob)
```

无法控制时间节点。

# eletron BrowserWindow capturePage

可以一张张截图出来之后ffmpeg处理成视频，但是清晰度和性能存疑
https://juejin.cn/post/7032998219109892132

# timecut

没用
puppeteer 一张张截图出来 ffmpeg 合并

# web 流程生成 + desktop 高清生成

desktop 截图并 ffmpeg 合并 / desktopCapturer 直接生成 （desktopCapturer使用的应该也是MediaDevices.getDisplayMedia）

web （svg to blob to dataURL to image to canvas）+ MediaRecorder api
Record RTC 、（https://github.com/0xdv/svg-to-video）


# 使用 konva

https://github.com/konvajs/vue-konva

可以将模版数据转化为 konva 然后再渲染

使用 RecordRTC 即可。

逐帧出图 使用 ffmpeg.wasm 出图。
PC端应该直接使用 ffmpeg
