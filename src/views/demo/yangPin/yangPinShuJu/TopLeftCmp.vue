<template>
  <div class="yp-top-left-cmp">
    <div class="dc-left">
      <dv-border-box-5>
        <div class="main-value"><span>573</span>件</div>
        <div class="compare-value"><span>人均任务</span>57件</div>
        <div class="compare-value"><span>上月同比</span>61件</div>
      </dv-border-box-5>
      <div class="dc-text">
        检验检测人均工作量
        <dv-decoration-3 style="width:200px;height:20px;" />
      </div>
    </div>
    <div class="dc-right">
      <div class="dc-text">
        当月检验检测任务量
        <dv-decoration-3 style="width:200px;height:20px;" />
      </div>
      <dv-border-box-5 :reverse="true">
        <div class="main-value"><span>1.97</span>件/日</div>
        <div class="compare-value"></div>
        <div class="compare-value"><span>上月同比</span>2.16 件</div>
      </dv-border-box-5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopLeftCmp'
}
</script>

<style lang="less">
.yp-top-left-cmp {
  display: flex;

  .dc-left, .dc-right {
    width: 50%;
  }

  .dv-border-box-5 {
    height: 60%;
  }

  .dc-text {
    display: flex;
    flex-direction: column;
    height: 40%;
    font-size: 20px;
    padding: 20px;
    box-sizing: border-box;
  }

  .dc-left .dc-text {
    align-items: flex-end;
    justify-content: center;
  }

  .dc-right .dc-text {
    justify-content: flex-start;
    padding-top: 20px;
  }

  .dc-left .dv-border-box-5 {
    padding: 30px;
    box-sizing: border-box;
  }

  .dc-right .dv-border-box-5 {
    padding: 40px;
    padding-left: 75px;
    box-sizing: border-box;
  }

  .main-value {
    font-weight: bold;
    font-size: 26px;

    span {
      font-size: 50px;
      color: #00c0ff;
      margin-right: 15px;
    }
  }

  .compare-value {
    height: 35px;
    line-height: 35px;
    font-size: 18px;

    span {
      margin-right: 30px;
    }
  }
}
</style>
