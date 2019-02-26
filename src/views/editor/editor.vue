<style src="./editor.scss" lang="scss" scoped></style>

<template>
  <div class="editor-layout">
    <div class="editor-layout-side">
      <nav-menu @click="addComponent"></nav-menu>
    </div>
    <div class="editor-layout-main">
      <div class="editor-layout-topbar">
        <el-row
          type="flex"
          align="middle"
          justify="space-between"
        >
          <el-col
            :span="20"
            style="display: flex; align-items: center;"
          >
            <i
              class="el-icon-prime-iPhoneXXS"
              style="margin-right: 10px; font-size: 28px; color: #dcdfe6;"
            ></i>
            <el-select
              v-model="device"
              value-key="name"
              placeholder="请选择"
              style="width: 150px;"
            >
              <el-option
                v-for="(device, index) of devices"
                :key="index"
                :label="device.name"
                :value="device"
              >
              </el-option>
            </el-select>
            <div class="editor-device-size-custom">
              <span>宽</span>
              <el-input
                v-model="device.width"
                :disabled="!device.custom"
              ></el-input>
              <span>高</span>
              <el-input
                v-model="device.height"
                :disabled="!device.custom"
              ></el-input>
            </div>
          </el-col>
          <el-col
            :span="4"
            style="text-align: right;"
          >
            <el-button
              type="primary"
              icon="el-icon-prime-code4"
              @click="handleOpenCodeEditor"
            >源码</el-button>
          </el-col>
        </el-row>

      </div>

      <div class="editor-layout-body">
        <div class="editor-layout-stage">
          <div
            class="editor-wrapper"
            :style="{ width: `${device.width}px`, height: `${device.height}px` }"
          >
            <div class="editor-phone"></div>
            <div class="editor-stage">
              <iframe
                frameborder="0"
                name="boot"
                scrolling="auto"
                ref="visualDeviceBoot"
                src="./visual-device-boot.html"
                :width="device.width"
                :height="device.height"
                :style="{ display: visualDeviceVisible ? 'none' : 'block' }"
              />

              <iframe
                frameborder="0"
                name="stage"
                scrolling="auto"
                ref="visualDevice"
                :src="visualDeviceSrc"
                :width="device.width"
                :height="device.height"
                :style="{ visibility: visualDeviceVisible ? 'visible' : 'hidden', position: visualDeviceVisible ? 'static' : 'absolute' }"
              />
              <!-- <i-display
              ref="display"
              :code="code"
            /> -->
            </div>

          </div>
        </div>
        <div class="editor-layout-control">
          <editor-control
            :id="componentId"
            :props="componentProps"
            :styles="componentStyles"
            :animates="componentAnimates"
            :visible.sync="editorControlVisible"
            @message="handleControlMessage"
          ></editor-control>
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
