<!--
 * @Descripttion: 
 * @version: 
 * @Author: mry
 * @Date: 2022-03-14 14:52:56
 * @LastEditors: mry
 * @LastEditTime: 2022-04-21 18:56:26
-->
<template>
  <el-form
    ref="diffForm"
    :model="value"
    class="common-form"
    label-width="100px"
    label-position="top"
  >
    <div>
      <el-form-item label="时间设置" class="item-required">
        <el-select
          v-model="value.hours"
          style="width: 122px"
          popper-class="selectCustomAttrs"
          placeholder=""
        >
          <el-option
            v-for="item in setHour"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <span style="margin: 0 6px">时</span>
        <el-select
          v-model="value.minutes"
          style="width: 122px"
          popper-class="selectCustomAttrs"
          placeholder=""
        >
          <el-option
            v-for="item in setMinutes"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <span style="margin-left: 6px">分</span>
      </el-form-item>
    </div>
    <el-form-item label="重复设置" class="item-required">
      <el-select
        v-model="value.repeatType"
        style="width: 100%"
        popper-class="selectCustomAttrs"
        @change="handleRepeatSet"
      >
        <el-option
          v-for="item in repeatTypeMap"
          :key="item.id"
          :label="item.description"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <!-- 自定义重复设置 -->
    <el-form-item>
      <el-checkbox-group
        v-if="value.repeatType == 4"
        v-model="value.repeatTypeArr"
        @change="changeBox"
      >
        <el-checkbox
          v-for="item in customSetList"
          :key="item.id"
          :label="item.id"
          >{{ item.description }}</el-checkbox
        >
      </el-checkbox-group>
    </el-form-item>
  </el-form>
</template>

<script>
import { iotRequest } from "@/apis/api";
import getHMSfunc from "@/assets/js/getInitHMS";
// 同步父数据
import useSyncAttrData from "@/modules/attribute/attrData";

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
      value: {
        desc: "",
        required: true,
        value: "",
        minutes: "00",
        hours: "00",
        repeatType: 1,
        repeatTypeArr: [],
      },
      ruleForm: {
        componentId: "",
        key: {
          id: "",
          value: "",
          desc: "",
        },
        logicalSign: "OR",
        operationSign: "equal",
      },
      source: this.$route.query.source || "", // 场景模板来源
      setHour: null,
      setMinutes: null,
      repeatTypeMap: [
        {
          description: "每天",
          id: 1,
        },
        {
          description: "工作日(周一至周五)",
          id: 2,
        },
        {
          description: "休息日(周六至周日)",
          id: 3,
        },
        {
          description: "自定义",
          id: 4,
        },
      ],
      customSetList: [
        {
          description: "星期日",
          id: 1,
        },
        {
          description: "星期一",
          id: 2,
        },
        {
          description: "星期二",
          id: 3,
        },
        {
          description: "星期三",
          id: 4,
        },
        {
          description: "星期四",
          id: 5,
          checked: false,
        },
        {
          description: "星期五",
          id: 6,
          checked: false,
        },
        {
          description: "星期六",
          id: 7,
          checked: false,
        },
      ],
    };
  },
  mounted() {
    this.setHour = getHMSfunc.initHMS(24, true);
    this.setMinutes = getHMSfunc.initHMS(60, true);
    this.getTimer();
    if (JSON.stringify(this.singData) !== "{}") {
      const data = this.singData.value.value.split("?");
      this.value.hours = data[0].split(" ")[1];
      this.value.minutes = data[0].split(" ")[2];
      const week1 = data[1].split("*")[1].split(" ")[1];
      if (week1 == "1,2,3,4,5,6,7") {
        this.value.repeatType = 1;
      } else if (week1 === "2,3,4,5,6") {
        this.value.repeatType = 2;
      } else if (week1 === "1,7") {
        this.value.repeatType = 3;
      } else {
        this.value.repeatType = 4;
        const fistTemp = data[1].split(" ")[2].split(",");
        fistTemp.map((item) => {
          this.value.repeatTypeArr.push(Number(item));
        });
      }
    }
    useSyncAttrData(this.$emit, this.value); // 同步数据
  },
  methods: {
    getTimer() {
      let url;
      if (this.source === "southeastAsia") {
        url = "/developerportal/dny/developer/component/cmptPropList/TIMER";
      } else {
        url = "/developerportal/developer/component/cmptPropList/TIMER";
      }
      iotRequest("get", url).then((res) => {
        if (res.retCode === "00000") {
          this.ruleForm = {
            componentId: res.data[0].componentId,
            key: {
              id: res.data[0].id,
              value: res.data[0].name,
              desc: res.data[0].description,
            },
          };
        }
      });
    },
    // 重复设置
    handleRepeatSet() {
      this.value.repeatTypeArr = [];
    },
    // 重置数据
    resetFormData() {
      this.value = {
        minutes: "00",
        hours: "00",
        repeatType: 1,
        repeatTypeArr: [],
      };
    },
    changeBox(e) {
      console.log(e);
    },
  },
};
</script>
<style lang="scss">
.item-required {
  margin-bottom: 24px !important;
  .el-form-item__label {
    position: relative;
  }
  .el-form-item__label::after {
    content: "*";
    color: #f56c6c;
    position: absolute;
    right: -8px;
  }
}
</style>
