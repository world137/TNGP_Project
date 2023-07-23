# import in html

* import in tag head

```html
<!-- bootstrap -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
```

* import after close tag body

```html
<!-- jquery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- bootstrap -->
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
```

## component
* snackbar => path : frontend/component/snackbar.html
<br> รับค่า text สำหรับใช้แสดงผล <br>
<br> แจ้งการทำงานที่สำเร็จ : func function success_notification(text)
<br> แจ้งการทำงานที่ไม่สำเร็จ : function error_notification(text)
<br> แจ้งเตือน : function warning_notification(text)
<br> วิธีการใช้

```html
<!-- html -->
<!-- import at tag body -->
<div id="insert_navbar"></div>
```
```js
// js
// load when start page
$(function () {
    $("#insert_snackbar").load("./component/snackbar.html");    
})
```

* navbar => path : frontend/component/navbar.html
<br> ใช้รูปแบบของ bootstrap
<br> วิธีการใช้

```html
<!-- html -->
<!-- import at tag body -->
<div id="insert_snackbar"></div>
```

```js
// js
// load when start page
$(function () {
    $("#insert_navbar").load("./component/navbar.html"); 
})
```