const utils = (function () {
  // 生成随机字符串
  function randomStr (len = 32) {
    const $chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    const maxPos = $chars.length
    let str = ''

    for (let i = 0; i < len; i++) {
      str += $chars.charAt(Math.floor(Math.random() * maxPos))
    }

    return str
  }

  let loadFile = (path, type = 'script') => {
    return new Promise((resolve, reject) => {
      let script = document.createElement(type)

      script.onload = resolve

      script.onerror = reject

      script.src = path

      document.body.appendChild(script)
    })
  }

  let loadFiles = files => {
    return Promise.all(files.map(path => loadFile(path)))
  }

  let lessRender = css => {
    return less.render(css).then(res => {
      const style = document.createElement('style')

      style.type = 'text/css'
      style.id = randomStr()
      style.innerHTML = res.css

      document.getElementsByTagName('head')[0].appendChild(style)
    })
  }

  return {
    randomStr,
    loadFile,
    loadFiles,
    lessRender
  }
})()
