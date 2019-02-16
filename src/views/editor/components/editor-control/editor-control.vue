<style lang="scss" src="./editor-control.scss" scoped></style>

<template>
  <div
    class="editor-control"
    :class="{ 'editor-control-closed': !visible }"
  >
    <div
      class="editor-control-trigger"
      :class="{ 'editor-control-trigger__collapsed': !visible }"
      @click="toggleVisible"
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
                  v-for="(propItem, propItemKey, propIndex) of props"
                  :key="propItemKey + propIndex"
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
                        <template v-if="propItem.editor.immediate">
                          <el-input
                            v-model="propItem.value"
                            size="small"
                            placeholder="请输入"
                          ></el-input>
                        </template>
                        <template v-else>
                          <el-input
                            :value="propItem.value"
                            @change="handleChange($event, propItem)"
                            size="small"
                            placeholder="请输入"
                          ></el-input>
                        </template>
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
                        <template v-if="styleItem.immediate">
                          <el-input
                            v-model="styleItem.value"
                            size="small"
                            placeholder="请输入"
                          ></el-input>
                        </template>
                        <template v-else>
                          <el-input
                            :value="styleItem.value"
                            @change="handleChange($event, styleItem)"
                            size="small"
                            placeholder="请输入"
                          ></el-input>
                        </template>

                      </el-col>
                      <el-col v-if="styleItem.editor.type === 'color'">
                        <el-color-picker
                          size="small"
                          v-model="styleItem.value"
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
                    <label>{{ { enable: '是否启用', count: '执行次数', duration: '动画时长', delay: '动画延时', direction: '运动方向', mode: '动画方式', name: '动画名称' }[animateKey] }}</label>

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
                        {{ { enable: '是否启用', count: '执行次数', duration: '动画时长', delay: '动画延时', direction: '运动方向', mode: '动画方式', name: '动画名称' }[animateKey] }}</div>
                    </el-popover>
                  </div>
                  <div class="editor-control-group__item-body">
                    <template v-if="animateKey === 'enable'">
                      <el-row
                        type="flex"
                        align="middle"
                      >
                        <el-col>
                          <el-switch v-model="animateGroupItem.value.enable"></el-switch>
                        </el-col>
                      </el-row>
                    </template>

                    <template v-if="animateKey === 'count'">
                      <el-row
                        type="flex"
                        align="middle"
                      >
                        <el-col :span="10">
                          <el-switch
                            :value="animateGroupItem.value.count"
                            @change="handleCountChange($event, animateGroupItem)"
                            active-text="循环"
                            active-value="infinite"
                            inactive-value="1"
                          ></el-switch>
                        </el-col>
                        <el-col :span="14">
                          <el-input
                            class="inline-input"
                            v-model="animateGroupItem.value.count"
                            :disabled="!animateGroupItem.value.enable"
                            placeholder="请输入内容"
                            size="small"
                          >
                            <template slot="append">次</template></el-input>
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
                            show-input
                            :min="0"
                            :max="10"
                            :show-input-controls="false"
                            v-model="animateGroupItem.value.duration"
                            :disabled="!animateGroupItem.value.enable"
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
                            show-input
                            :min="0"
                            :max="10"
                            :show-input-controls="false"
                            v-model="animateGroupItem.value.delay"
                            :disabled="!animateGroupItem.value.enable"
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
                            placeholder="请选择"
                            size="small"
                            v-model="animateGroupItem.value.name"
                            :disabled="!animateGroupItem.value.enable"
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
                            size="small"
                            v-model="animateGroupItem.value.direction"
                            :disabled="!animateGroupItem.value.enable"
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
                            placeholder="请选择"
                            size="small"
                            v-model="animateGroupItem.value.mode"
                            :disabled="!animateGroupItem.value.enable"
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
