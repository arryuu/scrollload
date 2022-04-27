## scrollload

滚动加载自定义方法

## 使用

```javascript
<script>
  var scrollLoad = new ScrollLoad('className', {
  handle: function () {
  console.log('do something')
}
})

  setTimeout(function () {
  // stop do something
  scrollLoad.stop()
}, 3000)
</script>
```