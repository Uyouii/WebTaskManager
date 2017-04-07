## WebTaskManager

- web端任务管理系统，可以添加，删除任务。
- 前端采用的bootstrap框架。<br>
- task的调用采用表格显示。<br>
- 后端数据储存由mysql实现。<br>

### Task表格
Task表格的显示了Task的名称，截止日期，备注等。<br>
表格会按照DDL的时间顺序由近及远显示。<br>
表格增添了ddl的当前剩余时间，并且调用setInternal每秒钟对剩余时间进行刷新。<br>
剩余时间精确到秒。<br>

表格的删除，每次可以删除选中的多个行，但修改只会修改选中的第一个行。<br>

在显示任务描述时，如果任务描述较多，则调用popover显示：当鼠标移入相应按钮时则自动显示相应的任务描述，<br>
当鼠标移出时则自动隐藏。


### 需要环境
Apache + php + mysql

### 暂时效果图
> 列表显示task

![](https://github.com/TaiyouDong/WebTaskManager/blob/master/image/picture1.png)
<br>

> 添加task

![](https://github.com/TaiyouDong/WebTaskManager/blob/master/image/picture2.png)
<br>

> 显示description

![](https://github.com/TaiyouDong/WebTaskManager/blob/master/image/picture3.png)
<br>

> 修改task

![](https://github.com/TaiyouDong/WebTaskManager/blob/master/image/picture4.PNG)
<br>

