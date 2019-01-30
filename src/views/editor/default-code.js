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
    <i-container id="mR2SxSydSqR363r73i0tiLz51e2Oap6S"><i-products></i-products></i-container>
  </div>
</template>

<script>
export default {
    data () {
        return {
            message: ''
        }
    }
}
</script>
`
export default code
