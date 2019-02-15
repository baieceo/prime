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
                          size="small"
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
        <el-tab-pane label="动画">
          <div
            class="editor-control-group"
            v-for="(animateGroupItem, animateGroupKey, animateGroupIndex) of animates"
            :key="animateGroupKey + animateGroupIndex"
          >
            <el-collapse :key="animateGroupKey + animateGroupIndex">
              <el-collapse-item :name="animateGroupKey">
                <template slot="title">
                  {{ animateGroupItem.editor.label }}
                </template>

                <div
                  class="editor-control-group__item"
                  v-for="(animateItem, animateKey, animateIndex) of animateGroupItem.editor.default"
                  :key="animateGroupKey + animateGroupIndex + '-' + animateKey + animateIndex"
                >
                  <div class="editor-control-group__item-head">
                    <label>{{ { enable: '是否启用', loop: '是否循环', duration: '动画时长', delay: '动画延时', direction: '运动方向', mode: '动画方式', name: '动画名称' }[animateKey] }}</label>

                    <el-popover
                      placement="top-start"
                      width="200"
                      trigger="click"
                    >
                      <i
                        class="el-icon-question"
                        slot="reference"
                      ></i>

                      <div class="editor-control-popover">
                        设置{{ animateGroupItem.editor.label + '动画' }}
                        {{ { enable: '是否启用', loop: '是否循环', duration: '动画时长', delay: '动画延时', direction: '运动方向', mode: '动画方式', name: '动画名称' }[animateKey] }}</div>
                    </el-popover>
                  </div>
                  <div class="editor-control-group__item-body">
                    <template v-if="animateKey === 'enable'">
                      <el-row
                        type="flex"
                        align="middle"
                      >
                        <el-col>
                          <el-switch v-model="animateGroupItem.editor.default.enable"></el-switch>
                        </el-col>
                      </el-row>
                    </template>

                    <template v-if="animateKey === 'loop'">
                      <el-row
                        type="flex"
                        align="middle"
                      >
                        <el-col>
                          <el-switch
                            v-model="animateGroupItem.editor.default.loop"
                            :disabled="!animateGroupItem.editor.default.enable"
                          ></el-switch>
                        </el-col>
                      </el-row>
                    </template>

                    <template v-if="animateKey === 'duration'">
                      <el-row
                        type="flex"
                        align="middle"
                      >
                        <el-col>
                          <el-slider
                            class="editor-control-slider"
                            v-model="animateGroupItem.editor.default.duration"
                            :min="0"
                            :max="10"
                            :show-input-controls="false"
                            :disabled="!animateGroupItem.editor.default.enable"
                            show-input
                          >
                          </el-slider>
                        </el-col>
                      </el-row>
                    </template>

                    <template v-if="animateKey === 'delay'">
                      <el-row
                        type="flex"
                        align="middle"
                      >
                        <el-col>
                          <el-slider
                            class="editor-control-slider"
                            v-model="animateGroupItem.editor.default.delay"
                            :min="0"
                            :max="10"
                            :show-input-controls="false"
                            :disabled="!animateGroupItem.editor.default.enable"
                            show-input
                          >
                          </el-slider>
                        </el-col>
                      </el-row>
                    </template>

                    <template v-if="animateKey === 'name'">
                      <el-row
                        type="flex"
                        align="middle"
                      >
                        <el-col>
                          <el-select
                            v-model="animateValue"
                            placeholder="请选择"
                            size="small"
                            :disabled="!animateGroupItem.editor.default.enable"
                          >
                            <el-option-group
                              v-for="group in animateGroups"
                              :key="group.label"
                              :label="group.label"
                            >
                              <el-option
                                v-for="item in group.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              >
                              </el-option>
                            </el-option-group>
                          </el-select>
                        </el-col>
                      </el-row>
                    </template>

                    <template v-if="animateKey === 'direction'">
                      <el-row
                        type="flex"
                        align="middle"
                      >
                        <el-col>
                          <el-select
                            placeholder="请选择"
                            value="normal"
                            size="small"
                            :disabled="!animateGroupItem.editor.default.enable"
                          >
                            <el-option-group>
                              <el-option
                                label="默认"
                                value="normal"
                              ></el-option>
                              <el-option
                                label="逆序交替"
                                value="reverse"
                              ></el-option>
                              <el-option
                                label="交替播放（先顺序）"
                                value="alternate"
                              ></el-option>
                              <el-option
                                label="交替播放（先逆序）"
                                value="alternate-reverse"
                              ></el-option>
                            </el-option-group>
                          </el-select>
                        </el-col>
                      </el-row>
                    </template>

                    <template v-if="animateKey === 'mode'">
                      <el-row
                        type="flex"
                        align="middle"
                      >
                        <el-col>
                          <el-select
                            value="normal"
                            placeholder="请选择"
                            size="small"
                            :disabled="!animateGroupItem.editor.default.enable"
                          >
                            <el-option-group>
                              <el-option
                                label="默认"
                                value="normal"
                              ></el-option>
                              <el-option
                                label="完成后停在最后一帧"
                                value="forwards"
                              ></el-option>
                              <el-option
                                label="开始前停在首帧"
                                value="backwards"
                              ></el-option>
                              <el-option
                                label="保持首帧及最后一帧"
                                value="both"
                              ></el-option>
                            </el-option-group>
                          </el-select>
                        </el-col>
                      </el-row>
                    </template>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-tab-pane>
        <el-tab-pane label="事件">事件</el-tab-pane>
        <el-tab-pane label="脚本">脚本</el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script src="./editor-control.js"></script>
