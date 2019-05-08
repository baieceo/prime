<style lang="scss" src="./nav-menu.scss" scoped></style>


<template>
  <div class="editor-nav-menu">
    <div class="editor-nav-menu-tabs">
      <div class="editor-nav-menu-tabs__item is-active">
        <div class="editor-nav-menu-tabs__label"><i class="el-icon-setting"></i> 系统模块</div>
        <div class="editor-nav-menu-tabs__panel">
          <div class="editor-nav-menu-tabs__panel-head">
            <el-row :gutter="10">
              <el-col :span="17">
                <el-input
                  size="mini"
                  placeholder="请输入内容"
                ></el-input>
              </el-col>
              <el-col :span="4">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-search"
                  round
                ></el-button>
              </el-col>
            </el-row>
          </div>

          <div class="editor-nav-menu-tabs__panel-body">
            <div class="editor-nav-menu-submenu">
              <!-- https://fontawesome.com/icons -->
              <div class="editor-nav-submenu__title"><span>全局元素</span><i class="editor-nav-submenu__icon-arrow el-icon-arrow-down"></i></div>
              <ul class="editor-nav-submenu-group">
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-biaoti"></i></div>
                  <div class="editor-nav-submenu-group__body">楼层标题</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-dingwei"></i></div>
                  <div class="editor-nav-submenu-group__body">锚点导航</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-browser3"></i></div>
                  <div class="editor-nav-submenu-group__body">顶部导航</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-browser-windows"></i></div>
                  <div class="editor-nav-submenu-group__body">多模块切换</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-gonggao"></i></div>
                  <div class="editor-nav-submenu-group__body">页面公告</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-growth"></i></div>
                  <div class="editor-nav-submenu-group__body">楼层间隔</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-zujian-dibudaohang"></i></div>
                  <div class="editor-nav-submenu-group__body">底部导航</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-fenlei2"></i></div>
                  <div class="editor-nav-submenu-group__body">分类</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-youhuiquan1"></i></div>
                  <div class="editor-nav-submenu-group__body">优惠券</div>
                </li>
                <li class="editor-nav-submenu-group__item is-active">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-sousuo"></i></div>
                  <div class="editor-nav-submenu-group__body">搜索</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-link-square"></i></div>
                  <div class="editor-nav-submenu-group__body">图片热区</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-clock3"></i></div>
                  <div class="editor-nav-submenu-group__body">倒计时</div>
                </li>
              </ul>
            </div>

            <div class="editor-nav-menu-submenu">
              <!-- https://fontawesome.com/icons -->
              <div class="editor-nav-submenu__title"><span>广告组</span><i class="editor-nav-submenu__icon-arrow el-icon-arrow-down"></i></div>
              <ul class="editor-nav-submenu-group">
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-lunbo4"></i></div>
                  <div class="editor-nav-submenu-group__body">轮播样式</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-custom-my-video"></i></div>
                  <div class="editor-nav-submenu-group__body">通栏（视频）</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-layout2"></i></div>
                  <div class="editor-nav-submenu-group__body">组合样式</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-speed-p"></i></div>
                  <div class="editor-nav-submenu-group__body">倍数样式</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-zuoyouhuadong-1"></i></div>
                  <div class="editor-nav-submenu-group__body">滑动样式</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-rukou"></i></div>
                  <div class="editor-nav-submenu-group__body">快捷入口</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-meizhuangshiyong"></i></div>
                  <div class="editor-nav-submenu-group__body">试用广告</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-qingdan2"></i></div>
                  <div class="editor-nav-submenu-group__body">清单模板</div>
                </li>
              </ul>
            </div>

            <div class="editor-nav-menu-submenu">
              <!-- https://fontawesome.com/icons -->
              <div class="editor-nav-submenu__title"><span>商品组</span><i class="editor-nav-submenu__icon-arrow el-icon-arrow-down"></i></div>
              <ul class="editor-nav-submenu-group">
                <li
                  class="editor-nav-submenu-group__item"
                  @click="$emit('click', 'i-products')"
                >
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-shangpin6"></i></div>
                  <div class="editor-nav-submenu-group__body">普通商品</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-qianggou-1"></i></div>
                  <div class="editor-nav-submenu-group__body">抢购商品</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-xialajiazai"></i></div>
                  <div class="editor-nav-submenu-group__body">无限下拉</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-yushou3"></i></div>
                  <div class="editor-nav-submenu-group__body">预售商品</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-clock4"></i></div>
                  <div class="editor-nav-submenu-group__body">预约商品</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-xinpin"></i></div>
                  <div class="editor-nav-submenu-group__body">促销商品</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-zidingyi2"></i></div>
                  <div class="editor-nav-submenu-group__body">自定义商品</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-duotulunbo"></i></div>
                  <div class="editor-nav-submenu-group__body">轮播商品</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-wodepingou1"></i></div>
                  <div class="editor-nav-submenu-group__body">拼购商品</div>
                </li>
              </ul>
            </div>

            <div class="editor-nav-menu-submenu">
              <!-- https://fontawesome.com/icons -->
              <div class="editor-nav-submenu__title"><span>导购组</span><i class="editor-nav-submenu__icon-arrow el-icon-arrow-down"></i></div>
              <ul class="editor-nav-submenu-group">
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-huadongshouji"></i></div>
                  <div class="editor-nav-submenu-group__body">滑动主题导购</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-zixun3"></i></div>
                  <div class="editor-nav-submenu-group__body">资讯（视频）</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-daogouapp"></i></div>
                  <div class="editor-nav-submenu-group__body">单主题导购</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-shop6"></i></div>
                  <div class="editor-nav-submenu-group__body">店铺</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-live7"></i></div>
                  <div class="editor-nav-submenu-group__body">直播</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-guanggao1"></i></div>
                  <div class="editor-nav-submenu-group__body">广告+文字</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-qietufabuguanggao1"></i></div>
                  <div class="editor-nav-submenu-group__body">广告+商品</div>
                </li>
              </ul>
            </div>

            <div class="editor-nav-menu-submenu">
              <!-- https://fontawesome.com/icons -->
              <div class="editor-nav-submenu__title"><span>活动组件</span><i class="editor-nav-submenu__icon-arrow el-icon-arrow-down"></i></div>
              <ul class="editor-nav-submenu-group">
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-guaguale2"></i></div>
                  <div class="editor-nav-submenu-group__body">刮刮乐抽奖</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-dazhuanpan"></i></div>
                  <div class="editor-nav-submenu-group__body">大转盘抽奖</div>
                </li>
                <li class="editor-nav-submenu-group__item">
                  <div class="editor-nav-submenu-group__head"><i class="el-icon-prime-taokouling1"></i></div>
                  <div class="editor-nav-submenu-group__body">口令流量</div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      <div class="editor-nav-menu-tabs__item">
        <div class="editor-nav-menu-tabs__label"><i class="el-icon-question"></i> 使用教程</div>
        <div class="editor-nav-menu-tabs__panel">使用教程</div>
      </div>
    </div>
  </div>
</template>

<script src="./nav-menu.js"></script>
