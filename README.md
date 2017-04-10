## WebTaskManager

- 一个在线任务管理的网页。
- 用户在注册过后，登录即可使用。
- 可以创建contianer（文件夹），可以在每个container下添加日程管理
- 支持添加，删除，修改相应的task
- 会根据用户设置的ddl时间计算相应的倒计时罗列出来，倒计时以秒为单位，每秒钟刷新一次
- 前端框架由bootstrap实现，后端由mysql实现

### 登录界面
用户可以在登录界面实现登录和注册两种操作（邮箱认证功能还没有完成）<br>
登录成功后会在浏览器中添加cookie，如果在访问后续界面时检测不到cookie时，<br>
则会自动返回登录页面

### 工作界面
工作界面在侧边栏增加了container功能（相当于文件夹）<br>
用户可以创建多个container，便于分类tasks<br>
删除container时会同步删除其中的所有tasks<br>
当用户点击相应的container时，表格显示则同步切换到相应container下的tasks。 

### Task表格
Task表格的显示了Task的名称，截止日期，备注等。<br>
表格会按照DDL的时间顺序由近及远显示。<br>
表格增添了ddl的当前剩余时间，并且调用setInternal每秒钟对剩余时间进行刷新。<br>
剩余时间精确到秒。<br>

表格的删除，每次可以删除选中的多个行，但修改只会修改选中的第一个行。<br>

在显示任务描述时，如果任务描述较多，则调用popover（弹出框）显示：<br>
当鼠标移入相应按钮时则自动显示相应的任务描述，当鼠标移出时则自动隐藏。


### 需要环境
Apache + php + mysql

### 暂时效果图

>登录界面

![](https://github.com/TaiyouDong/WebTaskManager/blob/master/image/picture6.PNG)

<br>

>主界面1

![](https://github.com/TaiyouDong/WebTaskManager/blob/master/image/picture1.png)

<br>

>主界面2

![](https://github.com/TaiyouDong/WebTaskManager/blob/master/image/picture2.png)

<br>

>添加task

![](https://github.com/TaiyouDong/WebTaskManager/blob/master/image/picture5.PNG)

<br>

>修改task

![](https://github.com/TaiyouDong/WebTaskManager/blob/master/image/picture4.PNG)

<br>

>添加container

![](https://github.com/TaiyouDong/WebTaskManager/blob/master/image/picture3.png)

<br>
