# 基于Vue实现的简易看板系统项目

## 实现效果

**主页**

![主页][1]

**卡片快速编辑和头像上传**

![卡片快速编辑和头像上传][2]

**卡片详情**

![卡片详情][3]

**选择到期日**

![选择到期日][4]

**卡片拖拽**

![此处输入图片的描述][5]


## 技术栈

> `详情请参考package.json`

- 脚手架：Vue-cli
- Vue @ 2.3.3
- Vue-Router @ 2.3.1
- SemanticUI
- ElementUI
- Express
- Webpack
- Babel + ES6
- HTML5

## 快速开始

`npm install` 安装依赖

安装过程可能需要安装SemanticUI 依次选择

1.`Automatic(Use default locations and all components)`

2.`No,let me specify` 然后一直回车即可

`npm start` 快速开始 

浏览器会自动跳转到 `localhost:8080`,若没有自动跳转请手动访问

## 功能描述
- 添加多列清单列表
- 清单列表内添加卡片
- 清单列表及卡片信息编辑
    - 列表名称编辑：点击标题即可修改
    - 快速编辑: 卡片右上方小按钮
    - 详情编辑: 点击卡片弹出详情页
- 删除列表/清除清单列表所有卡片
- 卡片顺序及清单列表间的拖动
- 看板滚动条
    - 内容超出页面弹出滚动条
    - 添加列表自动滚动至末端
    - 鼠标点击文档部分亦可拖动
- 图片上传

# 技术难点

**数据的流向**

 - 根组件数据传递
 - 多个列表的渲染
 - 清单列表的数据通过Props传递到卡片
 - 卡片与编辑面板间数据通信(非父子组件通信)

   
**卡片的拖动**

- 每一个卡片添加一个阴影框,检测到拖动元素进入时显示,并且接收宽高大小
- 拖动移出或结束时阴影框移除
- 被拖动元素元素需要传输的数据包括
   - 容器宽高
   - 父数据与索引(用于移除)
   - 自身的数据
- 放下的位置需要检测的数据包括
   - 父数据以及索引(用于决定添加的位置)

**滚动条部分**

 - 鼠标在文档拖动的距离
 - 滚动条移动的距离
 - 内容移动需要移动的距离
 - 三者需要按相同比例关联起来


  [1]: http://storage1.imgchr.com/AYrY8.png
  [2]: http://storage1.imgchr.com/AYDFf.png
  [3]: http://storage1.imgchr.com/AYwwt.png
  [4]: http://storage1.imgchr.com/AY0TP.png
  [5]: http://storage1.imgchr.com/AYdeI.png