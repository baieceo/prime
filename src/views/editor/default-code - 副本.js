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

    <i-component :id="compA.id" :name="compA.name" :data="compA.data"></i-component>

    <div class="mian-components">
        <i-component v-for="(item, index) of components" :key="'aaa' + index" :id="item.id" :name="item.name" :data="item.data"></i-component>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            message: '',
            compA: {
                id: '1',
                name: 'i-products',
                version: '0.1.0',
                data: {
                    props: {
                        api: {
                            value: 'https://www.easy-mock.com/mock/5c47f3ae9f1c8a370307b142/api/tvs?t=1'
                        }
                    },
                    styles: {
                        'module-background-color': {
                            value: '#F9F9F9'
                        },
                        'title-background-color': {
                            value: '#F0F0F0'
                        }
                    },
                    animates: {
                        'list-item': {
                            value: {
                                enable: true,
                                duration: 5,
                                name: 'bounceInLeft'
                            }
                        }
                    }
                }
            },
            components: [
                {
                    id: '2',
                    name: 'i-products',
                    version: '0.1.0',
                    data: {
                        props: {
                            api: {
                                value: 'https://www.easy-mock.com/mock/5c47f3ae9f1c8a370307b142/api/tvs?t=1'
                            }
                        },
                        styles: {
                            'module-background-color': {
                                value: '#F9F9F9'
                            },
                            'title-background-color': {
                                value: '#F0F0F0'
                            }
                        },
                        animates: {
                            'list-item': {
                                value: {
                                    enable: true,
                                    duration: 5,
                                    name: 'bounceInLeft'
                                }
                            }
                        }
                    }
                },
                {
                    id: '3',
                    name: 'i-products',
                    version: '0.1.0',
                    data: {
                        props: {
                            api: {
                                value: 'https://www.easy-mock.com/mock/5c47f3ae9f1c8a370307b142/api/tvs?t=1'
                            }
                        },
                        styles: {
                            'module-background-color': {
                                value: '#F9F9F9'
                            },
                            'title-background-color': {
                                value: '#F0F0F0'
                            }
                        },
                        animates: {
                            'list-item': {
                                value: {
                                    enable: true,
                                    duration: 5,
                                    name: 'bounceInLeft'
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
