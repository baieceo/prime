<style src="./editor.scss" lang="scss" scoped></style>

<template>
  <div class="editor-layout">
    <div class="editor-layout-side">
      <nav-menu @click="addComponent"></nav-menu>
    </div>
    <div class="editor-layout-main">
      <div class="editor-layout-topbar">
        <el-row justify="space-between">
          <el-col :span="20">
            <el-select
              v-model="device"
              value-key="name"
              placeholder="请选择"
            >
              <el-option
                v-for="(device, index) of devices"
                :key="index"
                :label="device.name"
                :value="device"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-button
              type="primary"
              @click="dialogVisible = true"
            >编辑代码</el-button>
          </el-col>
        </el-row>

      </div>

      <div class="editor-layout-stage">
        <div
          class="editor-wrapper"
          :style="{ width: `${device.width}px`, height: `${device.height}px` }"
        >
          <div class="editor-phone"></div>
          <div class="editor-stage">
            <iframe
              frameborder="0"
              name="stage"
              scrolling="auto"
              ref="visualDevice"
              :src="visualDeviceSrc"
              :width="device.width"
              :height="device.height"
            />
            <!-- <i-display
              ref="display"
              :code="code"
            /> -->
          </div>

        </div>

      </div>

    </div>

    <el-dialog
      title="编辑代码"
      :visible.sync="dialogVisible"
      top="5vh"
      width="95%"
      :before-close="handleClose"
    >
      <codemirror
        ref="cm"
        class="code-editor"
        :value="codeEditorValue"
        :options="cmOptions"
        @ready="onCmReady"
        @focus="onCmFocus"
        @input="onCmCodeChange"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleCodeChange"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./editor.js"></script>
