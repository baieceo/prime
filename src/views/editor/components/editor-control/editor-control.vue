<style lang="scss" src="./editor-control.scss" scoped></style>

<template>
  <div
    class="editor-control"
    v-if="settings.length"
  >
    <el-tabs
      type="border-card"
      class="editor-control-tabs"
    >
      <el-tab-pane label="编辑">
        <div
          class="editor-control-group"
          v-for="(group, groupIndex) of settings"
          :key="group.key"
        >
          <el-collapse :value="groupIndex">
            <el-collapse-item :name="groupIndex">
              <template slot="title">
                {{ group.label }}
              </template>
              <div
                class="editor-control-group__item"
                v-for="(control, controlIndex) of group.value"
                :key="controlIndex"
              >
                <div class="editor-control-group__item-head">
                  <template v-if="control.desc">
                    <label>{{ control.label }}</label>
                    <el-popover
                      placement="top-start"
                      width="200"
                      trigger="hover"
                      :content="control.desc"
                    >
                      <i
                        class="el-icon-question"
                        slot="reference"
                      ></i>
                    </el-popover>
                  </template>
                  <template v-else>
                    <label>{{ control.label }}</label>
                  </template>
                </div>
                <div class="editor-control-group__item-body">
                  <el-row>
                    <el-col v-if="control.type === 'input'">
                      <el-input
                        v-model="control.value"
                        size="small"
                      ></el-input>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>

          <div class="editor-control-group-head">

          </div>
          <div class="edotir-control-group-body">

          </div>
        </div>

      </el-tab-pane>
      <el-tab-pane label="外观">外观</el-tab-pane>
      <el-tab-pane label="动画">动画</el-tab-pane>
      <el-tab-pane label="事件">事件</el-tab-pane>
      <el-tab-pane label="脚本">脚本</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script src="./editor-control.js"></script>
