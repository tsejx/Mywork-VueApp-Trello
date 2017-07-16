<template lang="html">
  <div class="pop-over is-shown" :style="position">
    <div class="pop-over-header">
      <span class="pop-over-header-title">列表动态</span>
      <a
      class="pop-over-header-close-btn"
      ><i class="close icon link icon"></i></a>
      <div class="ui fitted divider"></div>
    </div>
    <div class="pop-over-content">
      <div class="pop-over-list">
        <ul>
          <li><a href="javascript:;" style="text-decoration:line-through">添加卡...</a></li>
          <li><a href="javascript:;" style="text-decoration:line-through">复制列表...</a></li>
          <li><a href="javascript:;" style="text-decoration:line-through">移动列表...</a></li>
          <li><a href="javascript:;" style="text-decoration:line-through">订阅</a></li>
        </ul>
      </div>
      <div class="ui fitted divider"></div>
      <div class="pop-over-list">
        <ul>
          <li><a href="javascript:;" style="text-decoration:line-through">移动此列表中的所有卡片...</a></li>
          <li><a href="javascript:;" @click = "recoverItem">归档这个列表中的所有卡...</a></li>
        </ul>
      </div>
      <div class="ui fitted divider"></div>
      <div class="pop-over-list">
        <ul>
          <li><a href="javascript:;" @click = "recoverList">将此列表进行归档</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  export default {
    name: 'pop-over',
    props: {
      databus: Object
    },
    data () {
      return {
        index: 0,
        maindata: [],
        listdata: {},
        position: {}
      }
    },
    methods: {
      recoverItem () {
        this.listdata.item = []
      },
      recoverList () {
        this.maindata.splice(this.index, 1)
      }
    },
    created () {
      this.databus.$on('dataToOpt', (index, maindata, listdata, position) => {
        this.index = index
        this.maindata = maindata
        this.listdata = listdata
        this.position = position
      })
    }
  }
</script>

<style>
  @import '../assets/style/reset.css';
  /* 列表动态（默认关闭） */
  .pop-over {
    display: none;
    position: absolute;
    top: 50px;
    width: 260px;
    height: auto;
    overflow: hidden;
    background-color: #fff;
    border-radius: 3px;
    border: 1px solid #D6DADC;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .15);
    z-index: 70;
  }
  /* 列表动态（打开状态） */
  .pop-over.is-shown {
    display: block;
  }
  /* 分隔线 */
  .pop-over .divider {
    position: relative;
  }
  /* 列表动态头部 */
  .pop-over-header {
    text-align: center;
  }
  
  .pop-over-header-title {
    display: block;
    width: 100%;
    height: 36px;
    color: rgba(140, 140, 140, 1.0);
    font-size: 14px;
    text-align: center;
    line-height: 36px;
    z-index: 10;
  }
  /* 列表动态关闭按钮 */
  .pop-over-header-close-btn {
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px;
    color: rgba(140, 140, 140, 1.0);
    cursor: pointer;
  }
  .pop-over-header-close-btn:hover {
    color: rgba(77, 77, 77, 1.0);
  }
  /* 列表动态的主体部分 */
  .pop-over-content {
    padding: 6px;
  }
  
  .pop-over-list {
    margin: 5px 0;
  }
  .pop-over-list ul {
    width: 100%;
    height: auto;
  }
  .pop-over-list ul li {
    display: list-item;
    width: 100%;
    height: 30px;
    line-height: 30px;
  }
  
  .pop-over-list ul li a{
    display: block;
    position: relative;
    width: 310px;
    margin-left: -10px;
    padding-left: 10px;
    color: rgba(140, 140, 140, 1.0);
    font-weight: 700;
    text-decoration: none;
  }
  .pop-over-list ul li a:hover {
    color: #fff;
    background-color: #0079BF;
  }
</style>
