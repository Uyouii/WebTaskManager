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


### 需要环境
>Apache + php + mysql

