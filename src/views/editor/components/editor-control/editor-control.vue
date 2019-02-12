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
                  v-for="(propItem, propIndex) of props"
                  :key="propIndex"
                >
                  <div class="editor-control-group__item-head">
                    <template v-if="propItem.editor.desc">
                      <label>{{ propItem.editor.label }}</label>
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
                          v-html="propItem.editor.desc"
                        ></div>
                      </el-popover>
                    </template>
                    <template v-else>
                      <label>{{ propItem.editor.label }}</label>
                    </template>
                  </div>
                  <div class="editor-control-group__item-body">
                    <el-row>
                      <el-col v-if="propItem.editor.type === 'input'">
                        <el-input
                          :value="getControlValue(propItem)"
                          @change.native="handleControlChange($event, propItem, 'props')"
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

        <el-tab-pane label="样式">
          <div class="editor-control-group">
            <el-collapse value="style">
              <el-collapse-item name="style">
                <template slot="title">
                  样式设置
                </template>
                <div
                  class="editor-control-group__item"
                  v-for="(styleItem, styleIndex) of styles"
                  :key="styleIndex"
                >
                  <div class="editor-control-group__item-head">
                    <template v-if="styleItem.editor.desc">
                      <label>{{ styleItem.editor.label }}</label>
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
                          v-html="styleItem.editor.desc"
                        ></div>
                      </el-popover>
                    </template>
                    <template v-else>
                      <label>{{ styleItem.editor.label }}</label>
                    </template>
                  </div>
                  <div class="editor-control-group__item-body">
                    <el-row>
                      <el-col v-if="styleItem.editor.type === 'input'">
                        <el-input
                          :value="getControlValue(styleItem)"
                          @change.native="handleControlChange($event, styleItem, 'styles')"
                          size="small"
                          placeholder="请输入"
                        ></el-input>
                      </el-col>
                      <el-col v-if="styleItem.editor.type === 'color'">
                        <el-color-picker
                          :value="getControlValue(styleItem)"
                          @change="handleControlChange($event, styleItem, 'styles')"
                        ></el-color-picker>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-tab-pane>
        <el-tab-pane label="动画">动画</el-tab-pane>
        <el-tab-pane label="事件">事件</el-tab-pane>
        <el-tab-pane label="脚本">脚本</el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script src="./editor-control.js"></script>
