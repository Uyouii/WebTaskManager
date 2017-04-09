## WebTaskManager

- web端任务管理系统，可以添加，删除任务。
- 前端采用的bootstrap框架。<br>
- 后端数据储存由mysql实现。<br>

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

在显示任务描述时，如果任务描述较多，则调用popover（弹出框）显示：当鼠标移入相应按钮时则自动显示相应的任务描述，<br>
当鼠标移出时则自动隐藏。


### 需要环境
Apache + php + mysql

### 暂时效果图

>登录界面

![](https://github.com/TaiyouDong/WebTaskManager/blob/master/image/picture6.PNG)

<br>

>主界面1

![](https://github.com/TaiyouDong/WebTaskManager/blob/master/image/picture1.PNG)

<br>

>主界面2

![](https://github.com/TaiyouDong/WebTaskManager/blob/master/image/picture2.PNG)

<br>

>添加task

![](https://github.com/TaiyouDong/WebTaskManager/blob/master/image/picture5.PNG)

<br>

>修改task

![](https://github.com/TaiyouDong/WebTaskManager/blob/master/image/picture4.PNG)

<br>

>添加container

![](https://github.com/TaiyouDong/WebTaskManager/blob/master/image/picture3.PNG)

<br>
