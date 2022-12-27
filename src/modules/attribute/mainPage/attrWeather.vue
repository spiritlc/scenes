<!--
 * @Descripttion: 
 * @version: 
 * @Author: mry
 * @Date: 2022-03-21 14:52:55
 * @LastEditors: mry
 * @LastEditTime: 2022-05-11 09:50:02
-->
<template>
  <el-form
    ref="diffForm"
    :model="ruleForm"
    class="weather-condition common-form"
    :rules="rules"
    label-width="100px"
    label-position="top"
  >
    <el-form-item label="设备命令" prop="id">
      <el-select
        v-model="ruleForm.id"
        style="width: 100%"
        placeholder="请选择设备命令"
        popper-class="selectCustomAttrs"
        @change="handleDeviceCommand"
      >
        <el-option
          v-for="item in deviceCommandList"
          :key="item.id"
          :label="item.description"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <div>
      <el-form-item label="命令参数" class="deviceParam">
        <el-select
          v-model="ruleForm.operationSign"
          style="width: 80px"
          popper-class="selectCustomAttrs"
          :disabled="ruleForm.id == ''"
        >
          <el-option
            v-for="item in operationSignList"
            :key="item.name"
            :label="item.value"
            :value="item.name"
          ></el-option>
        </el-select>
        <el-form-item
          v-if="
            (selectedWeatherCondition.length > 0 &&
              selectedWeatherCondition[0].valType == 'enum') ||
            ruleForm.id == ''
          "
          prop="deviceParam"
          class="deviceParamSelect"
        >
          <el-select
            v-model="ruleForm.deviceParam"
            style="margin-left: 16px; width: calc(100% - 16px)"
            :disabled="ruleForm.id == ''"
            popper-class="selectCustomAttrs"
            @change="handleChangeCommandParam"
          >
            <el-option
              v-for="item in equalList"
              :key="item.stdValue"
              :label="item.description"
              :value="item.stdValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="
            selectedWeatherCondition.length > 0 &&
            selectedWeatherCondition[0].valType == 'int'
          "
          prop="deviceInputParam"
          class="deviceParamSelect"
        >
          <div class="typeinput">
            <el-input
              v-model="ruleForm.deviceInputParam"
              :placeholder="dataPlaceHolder"
              :disabled="ruleForm.id == ''"
              @blur="handleBlur"
            />
            <span v-if="equalList != null" class="unit">{{
              equalList.unit
            }}</span>
          </div>
        </el-form-item>
      </el-form-item>
    </div>
    <el-form-item label="条件描述" style="width: 100%">
      <el-input
        v-model="ruleForm.desc"
        type="textarea"
        maxlength="100"
        :rows="2"
        :class="{ 'input-focus': inputFocus }"
        show-word-limit
        placeholder="请填写条件描述，最多100字符"
        @focus="inputFocus = true"
        @blur="inputFocus = false"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { iotRequest } from "@/apis/api";
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
      inputFocus: false,
      ruleForm: {
        componentId: "",
        id: "",
        deviceParam: "",
        deviceInputParam: "",
        operationSign: "equal",
        desc: "",
        key: {
          desc: "",
          id: "",
          value: "",
        },
        value: {
          desc: "",
          required: true,
          value: "",
        },
      },
      rules: {
        id: [{ required: true, message: "请选择设备命令", trigger: "change" }],
        deviceParam: [
          {
            required: true,
            message: "命令参数数据格式不合法，请重新填写",
            trigger: "change",
          },
        ],
        deviceInputParam: [
          {
            required: true,
            validator: (rule, data, callback) => {
              if (!data) {
                callback(new Error("数据不符合要求"));
              } else {
                if (
                  data < this.equalList.minValue ||
                  data > this.equalList.maxValue ||
                  data % this.equalList.step !== 0
                ) {
                  callback(new Error("命令参数数据格式不合法，请重新填写"));
                } else {
                  callback();
                }
              }
            },
            trigger: "blur",
          },
        ],
      },
      source: this.$route.query.source || "", // 场景模板来源
      deviceCommandList: [],
      selectedWeatherCondition: [],
      equalList: null,
      operationSignList: [
        {
          name: "equal",
          value: "等于",
        },
      ],
      dataPlaceHolder: "",
    };
  },
  watch: {
    "ruleForm.id": {
      handler(newVal) {
        if (newVal) {
          const data = this.deviceCommandList.filter((item) => {
            return item.id == newVal;
          });
          this.ruleForm.key = {
            desc: data[0].description,
            id: data[0].id,
            value: data[0].name,
          };
          this.ruleForm.componentId = data[0].componentId;
          if (data[0].valType == "enum") {
            this.equalList = JSON.parse(data[0].variants);
            data[0].isLegal = true;
            this.operationSignList = [
              {
                name: "equal",
                value: "等于",
              },
            ];
            data[0].operationSign = "equal";
            this.dataPlaceHolder = "";
          }
          if (data[0].valType == "int") {
            this.equalList = JSON.parse(data[0].variants);
            data[0].isLegal = true;
            this.operationSignList = [
              {
                name: "greaterThan",
                value: "高于",
              },
              {
                name: "lessThan",
                value: "低于",
              },
            ];
            this.dataPlaceHolder =
              "请输入" +
              this.equalList.minValue +
              "到" +
              this.equalList.maxValue +
              ",步长为" +
              this.equalList.step;
          }
          this.selectedWeatherCondition = data;
          this.ruleForm.operationSign = this.operationSignList[0].name;
        }
      },
    },
  },
  mounted() {
    this.$refs.diffForm.clearValidate();
    this.getDeivceCommand();
  },
  methods: {
    // 获取设备命令数据
    getDeivceCommand() {
      let url;
      if (this.source === "southeastAsia") {
        url = "/developerportal/dny/developer/component/cmptPropList/WEATHER";
      } else {
        url = "/developerportal/developer/component/cmptPropList/WEATHER";
      }
      iotRequest("get", url)
        .then((res) => {
          if (res.retCode === "00000") {
            this.deviceCommandList = res.data;
          }
        })
        .then(() => {
          if (JSON.stringify(this.singData) !== "{}") {
            this.ruleForm = {
              ...this.singData,
            };
            this.ruleForm.id = this.singData.key.id;
            const data = this.deviceCommandList.filter((item) => {
              return item.id == this.ruleForm.id;
            });
            if (data[0].valType == "enum") {
              if (JSON.stringify(this.singData) !== "{}") {
                this.$set(
                  this.ruleForm,
                  "deviceParam",
                  this.singData.value.value
                );
              }
            }
            if (data[0].valType == "int") {
              if (JSON.stringify(this.singData) !== "{}") {
                this.$set(
                  this.ruleForm,
                  "deviceInputParam",
                  this.singData.value.value
                );
              }
            }
          }
        });
    },
    // 清除校验格式
    handleDeviceCommand() {
      this.$refs.diffForm.clearValidate("deviceParam");
      this.$refs.diffForm.clearValidate("deviceInputParam");
      this.$set(this.ruleForm, "deviceInputParam", "");
      this.$set(this.ruleForm, "deviceParam", "");
    },
    // 失焦赋值
    handleBlur(e) {
      this.ruleForm.value = {
        desc: e.target.value + this.equalList.unit,
        required: true,
        value: e.target.value,
      };
    },
    // 选中命令参数赋值
    handleChangeCommandParam(e) {
      const data = this.equalList.filter((item) => {
        return item.stdValue == e;
      });
      this.ruleForm.value = {
        desc: data[0].description,
        required: true,
        value: e,
      };
    },
    // 重置数据
    resetFormData() {
      this.ruleForm = {
        id: "",
        deviceParam: "",
        operationSign: "equal",
        desc: "",
      };
      this.equalList = null;
      this.selectedWeatherCondition = [];
      this.$refs.diffForm.resetFields();
      this.operationSignList = [
        {
          name: "equal",
          value: "等于",
        },
      ];
    },
  },
};
</script>

<style lang="scss">
.typeinput {
  margin-left: 20px;
  display: flex;
  .unit {
    margin-left: 5px;
    // width: 100px;
  }
}
.weather-condition {
  .deviceParam {
    margin-bottom: 24px !important;
    > .el-form-item__label::after {
      content: "*";
      color: #f56c6c;
      margin-left: 2px;
    }
    > .el-form-item__content {
      display: flex !important;
    }
    .deviceParamSelect {
      flex: 1;
      display: flex;
      .el-form-item__content {
        width: 100%;
      }
      .el-form-item__error {
        left: 20px;
        width: 100%;
      }
    }
  }
}
</style>
