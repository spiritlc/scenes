<!--
 * @Descripttion: 
 * @version: 
 * @Author: mry
 * @Date: 2022-03-22 16:10:27
 * @LastEditors: mry
 * @LastEditTime: 2022-04-11 15:13:30
-->
<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    class="common-form"
    label-width="100px"
    label-position="top"
  >
    <el-form-item label="延时设置" class="delaySet">
      <div class="startTime">
        <el-select
          v-model="ruleForm.delayStartHour"
          popper-class="selectCustomAttrs"
          style="width: 80px"
          placeholder=""
        >
          <el-option
            v-for="item in setHour"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <span style="margin: 0 10px">小时</span>
        <el-select
          v-model="ruleForm.delayStartMinutes"
          popper-class="selectCustomAttrs"
          style="width: 80px"
          placeholder=""
        >
          <el-option
            v-for="item in setMinutes"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <span style="margin: 0 10px">分钟</span>
        <el-select
          v-model="ruleForm.delayStartSecond"
          popper-class="selectCustomAttrs"
          style="width: 80px"
          placeholder=""
        >
          <el-option
            v-for="item in setSeconds"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <span style="margin-left: 10px">秒</span>
      </div>
    </el-form-item>
    <el-form-item v-if="ruleForm.isShow" style="color: red"
      >请选择延时时间！</el-form-item
    >
  </el-form>
</template>

<script>
import { iotRequest } from "@/apis/api";
import getHMSfunc from "@/assets/js/getInitHMS";
export default {
  props: {
    singData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      ruleForm: {
        delayStartHour: "0",
        delayStartMinutes: "0",
        delayStartSecond: "0",
        isShow: false,
      },
      source: this.$route.query.source || "", // 场景模板来源
      setHour: [],
      setMinutes: [],
      setSeconds: [],
      delayData: {},
    };
  },
  mounted() {
    this.setHour = getHMSfunc.initHMS(24);
    this.setMinutes = getHMSfunc.initHMS(60);
    this.setSeconds = getHMSfunc.initHMS(60);
    this.getDelayData();
    if (JSON.stringify(this.singData) !== "{}") {
      this.handleDealHMS(this.singData.delayControl.args[0].value.value);
    }
  },
  methods: {
    // 获取delay基本信息
    getDelayData() {
      let url;
      if (this.source === "southeastAsia") {
        url = "/developerportal/dny/developer/component/cmptPropList/DELAY";
      } else {
        url = "/developerportal/developer/component/cmptPropList/DELAY";
      }
      iotRequest("get", url).then((res) => {
        if (res.retCode == "00000") {
          this.delayData = res.data[0];
        }
      });
    },
    // 重置数据
    resetFormData() {
      this.ruleForm = {
        delayStartHour: "0",
        delayStartMinutes: "0",
        delayStartSecond: "0",
        isShow: false,
      };
    },
    // 处理时分秒
    handleDealHMS(time) {
      this.ruleForm.delayStartHour = parseInt(time / 3600).toString();
      this.ruleForm.delayStartMinutes = parseInt(
        (time - this.ruleForm.delayStartHour * 3600) / 60
      ).toString();
      this.ruleForm.delayStartSecond = parseInt(
        (time - this.ruleForm.delayStartHour * 3600) % 60
      ).toString();
    },
  },
};
</script>
<style lang="scss">
.delaySet {
  margin-bottom: 24px;
  > .el-form-item__label::after {
    content: "*";
    color: #f56c6c;
    margin-left: 2px;
  }
}
</style>
