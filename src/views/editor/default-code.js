const code = `<template>
  <div id="main">
    <el-card class="box-card" style="margin: 10px;">
        <el-row type="flex" justify="space-between" :gutter="10">
            <el-col :xs="18" :sm="20" :md="22" :lg="22" :xl="22">
                <el-input v-model="message" placeholder="请输入" />
            </el-col>
            <el-col :xs="6" :sm="4" :md="2" :lg="2" :xl="2">
                <el-button type="primary" style="width: 100%;" icon="el-icon-search"></el-button>
            </el-col>
        </el-row>
    </el-card>
    {{ message }}

    <div class="mian-components">
        <component v-for="(item, index) of components" :key="index" is="i-container" :id="item.id">
            <component :is="item.name" :data="item.data"></component>
        </component>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            message: '',
            components: [
                {
                    id: 'mR2SxSydSqR363r73i0tiLz51e2Oap6S',
                    name: 'i-products',
                    data: {
                        props: {
                            b: {
                                value: 1
                            }
                        },
                        styles: {
                            'module-background-color': {
                                value: 'blue'
                            }
                        },
                        animates: {
                            list: {
                                value: {
                                    enable: false,
                                    duration: 0
                                }
                            }
                        }
                    }
                }
            ]
        }
    },
    methods: {}
}
</script>
`
export default code
