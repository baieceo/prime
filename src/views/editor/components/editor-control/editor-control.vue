<style lang="scss" src="./editor-control.scss" scoped></style>

<template>
  <div
    class="editor-control"
    :class="{ 'editor-control-closed': !collapsed }"
  >
    <div
      class="editor-control-trigger"
      :class="{ 'editor-control-trigger__collapsed': !collapsed }"
      @click="collapsed = !collapsed"
      v-if="!isEmptyJson(props)"
    ><i class="el-icon el-icon-setting" /></div>
    <div
      class="editor-control-wrapper"
      v-if="!isEmptyJson(props)"
    >
      <el-tabs
        type="border-card"
        class="editor-control-tabs"
      >
        <el-tab-pane label="属性">
          <div class="editor-control-group">
            <el-collapse value="props">
              <el-collapse-item name="props">
                <template slot="title">
                  属性设置
                </template>
                <div
                  class="editor-control-group__item"
                  v-for="(prop, propIndex) of props"
                  :key="propIndex"
                >
                  <div class="editor-control-group__item-head">
                    <template v-if="prop.editor.desc">
                      <label>{{ prop.editor.label }}</label>
                      <el-popover
                        placement="top-start"
                        width="200"
                        trigger="click"
                      >
                        <i
                          class="el-icon-question"
                          slot="reference"
                        ></i>

                        <div
                          class="editor-control-popover"
                          v-html="prop.editor.desc"
                        ></div>
                      </el-popover>
                    </template>
                    <template v-else>
                      <label>{{ prop.editor.label }}</label>
                    </template>
                  </div>
                  <div class="editor-control-group__item-body">
                    <el-row>
                      <el-col v-if="prop.editor.type === 'input'">
                        <el-input
                          :value="getPropValue(prop)"
                          @change.native="handlePropChange($event, prop)"
                          size="small"
                          placeholder="请输入"
                        ></el-input>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>

        </el-tab-pane>
        <el-tab-pane label="外观">外观</el-tab-pane>
        <el-tab-pane label="动画">动画</el-tab-pane>
        <el-tab-pane label="事件">事件</el-tab-pane>
        <el-tab-pane label="脚本">脚本</el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script src="./editor-control.js"></script>
