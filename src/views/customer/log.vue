<template >
  <el-form
    :model="model"
    ref="orderForm"
    label-width="130px"
    label-position="left"
    hide-required-asterisk
    size="mini"
    @click.stop
  >
    <el-form-item prop="tradedate">
      <div slot="label">
        <i
          class="middle icon iconfont icon-shijian icon-yellow"></i>
        <span
          class="middle label">{{$t('时间类型')}}</span>
      </div>
      <el-select
        v-model="model.timeType"
        style="width:100%"
        placeholder=""
      >
        <el-option
          v-for="type in timeTypeOptions"
          :key="type.value"
          :label="type.text"
          :value="type.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="tradedate">
      <div slot="label">
        <i
          class="middle icon iconfont icon-shijian icon-yellow"></i>
        <span
          class="middle label">{{$t('交易时间')}}</span>
      </div>
      <el-date-picker
        v-if="model.timeType == 'fixed'"
        type="daterange"
        style="width:100%;"
        v-model="model.tradedate"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
      <el-select
        v-else
        v-model="model.tradedate"
        style="width:100%"
        placeholder=""
      >
        <el-option
          v-for="w in timeWeeklyOptions"
          :key="w.value"
          :label="w.text"
          :value="w.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      prop="tradepricefloor"
      :rules="rules.tradepricefloor"
    >
      <div slot="label">
        <i
          class="middle icon iconfont icon-jifen icon-blue"></i>
        <span
          class="middle label">{{$t('金额大于等于')}}</span>
      </div>
      <el-input
        type="number"
        style="width:100%;"
        v-model="model.tradepricefloor"
      ></el-input>
    </el-form-item>
    <el-form-item
      prop="tradepriceupper"
      :rules="rules.tradepriceupper"
    >
      <div slot="label">
        <i
          class="middle icon iconfont icon-jifen icon-yellow"></i>
        <span
          class="middle label">{{$t('金额小于等于')}}</span>
      </div>
      <el-input
        style="width:100%;"
        v-model="model.tradepriceupper"
      ></el-input>
    </el-form-item>
    <el-form-item prop="skucode">
      <div slot="label">
        <i
          class="middle icon iconfont icon-cengcileixing icon-blue"></i>
        <span
          class="middle label">{{$t('产品')}}</span>
      </div>
      <el-input
        @click.native="onClick('产品列表','crm_product', 'skucode' )"
        v-model="orderSku"
        readonly
      ></el-input>
    </el-form-item>
    <el-form-item prop="categorycode">
      <div slot="label">
        <i
          class="middle icon iconfont icon-leixing icon-yellow"></i>
        <span
          class="middle label">{{$t('产品类别')}}</span>
      </div>
      <el-input
        @click.native="onClick('产品类别','crm_category' , 'categorycode' )"
        v-model="orderCategory"
        readonly
      ></el-input>
    </el-form-item>
    <el-form-item prop="storeid">
      <div slot="label">
        <i
          class="middle icon iconfont icon-mendian icon-blue"></i>
        <span
          class="middle label">{{$t('门店')}}</span>
      </div>
      <el-select
        filterable
        remote
        reserve-keyword
        clearable
        multiple
        :remoteMethod="getStore"
        @clear="()=>{ this.getStore('') }"
        v-model="model.storeid"
        style="width:100%"
        placeholder=""
      >
        <el-option
          v-for="item in model.stores"
          :key="item.value"
          :label="item.text"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="tradechannel">
      <div slot="label">
        <i
          class="middle icon iconfont icon-qudao icon-yellow"></i>
        <span
          class="middle label">{{$t('渠道')}}</span>
      </div>
      <el-select
        clearable
        multiple
        v-model="model.tradechannel"
        style="width:100%"
        placeholder=""
      >
        <el-option
          v-for="item in tradechannels"
          :key="item.value"
          :label="item.text"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="orderType">
      <div slot="label">
        <i
          class="middle icon iconfont icon-qudao icon-yellow"></i>
        <span
          class="middle label">{{$t('订单类型')}}</span>
      </div>
      <el-select
        clearable
        multiple
        v-model="model.orderType"
        style="width:100%"
        placeholder=""
      >
        <el-option
          v-for="item in orderTypeOptions"
          :key="item.value"
          :label="item.text"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
// 自定义组件中必须包含 setNodeValue 和 validate 这两个方法
import api from '../api/index'
let timeType, channels, orderType
export default {
  props: ['node'],
  inject: ['openDialog'],
  created() {
    this.getStore('')
    this.getChannel()
    this.getTimeType()
  },
  data() {
    let r = this.$rules
    let nodeValue = this.node.inputValue
    return {
      timeTypeOptions: [],
      timeWeeklyOptions: [],
      tradechannels: [],
      orderTypeOptions: [],
      rules: {
        tradepricefloor: [{ min: 0, message: '不可小于0' }],
        tradepriceupper: [{ min: 0, message: '不可小于0' }]
      },
      model: {
        timeType: nodeValue.timeType || 'fixed',
        tradedate: nodeValue.tradedate || '',
        tradepricefloor: nodeValue.tradepricefloor || '',
        tradepriceupper: nodeValue.tradepriceupper || '',
        categorycode: nodeValue.categorycode || '',
        skucode: nodeValue.skucode || '',
        storeid: nodeValue.storeid || '',
        stores: nodeValue.stores || '',
        tradechannel: nodeValue.tradechannel || '',
        orderType: nodeValue.orderType || []
      }
    }
  },
  computed: {
    orderCategory: function () {
      if (this.model.categorycode) {
        return this.model.categorycode.map(o => o.categoryName).join(',')
      }
      return ''
    },
    orderSku: function () {
      if (this.model.skucode) {
        return this.model.skucode.map(o => o.name).join(',')
      }
      return ''
    },
    orderStore: function () {
      if (this.model.storeid) {
        return this.model.storeid.map(o => o.name).join(',')
      }
      return ''
    }
  },
  methods: {
    async API_STORE(params) {
      let res = await this.$request({ ...api.store, params })
      return res
    },
    async APT_CHANNEL(params) {
      if (!channels) {
        channels = await this.$request({ ...api.channel, params })
      }
      return channels
    },
    async APT_TIMETYPE(params) {
      if (!timeType) {
        timeType = await this.$request({ ...api.timetype, params })
      }
      return timeType
    },
    getChannel() {
      return this.APT_CHANNEL().then(res => {
        this.tradechannels = res.data
        return res
      })
    },
    getStore(name) {
      return this.API_STORE({ offset: 0, limit: 20, storeName: name }).then(
        res => {
          this.model['stores'] = res.data
          return res
        }
      )
    },
    getTimeType() {
      return this.APT_TIMETYPE().then(res => {
        this.timeTypeOptions = res.timeType
        this.timeWeeklyOptions = res.timeWeekly
        this.orderTypeOptions = res.orderType
      })
    },
    onClick(title, tagListTable, prop) {
      let value = this.model[prop]
      this.openDialog(title, tagListTable, value).then(selections => {
        this.model[prop] = selections
      })
    },
    // 必须包含此方法
    getData() {
      let data = { ...this.model }
      delete data.stores
      delete data.tradechannels
      return data
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
