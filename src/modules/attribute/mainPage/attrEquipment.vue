<!--
 * @Descripttion: 
 * @version: 
 * @Author: mry
 * @Date: 2022-03-22 09:41:45
 * @LastEditors: mry
 * @LastEditTime: 2022-05-11 17:53:07
-->
<template>
  <el-form
    ref="diffForm"
    class="device-condition common-form"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    label-position="top"
  >
    <el-form-item label="设备产品类型" prop="componentId">
      <el-select
        v-model="ruleForm.componentId"
        filterable
        placeholder="请选择设备产品类型"
        popper-class="selectCustomAttrs"
      >
        <el-option
          v-for="item in deviceProductTypeList"
          :key="item.id"
          :label="item.prodtypeName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="设备命令" prop="deviceCommand">
      <el-select
        v-model="ruleForm.deviceCommand"
        filterable
        placeholder="请选择设备命令"
        popper-class="selectCustomAttrs"
        @change="handleDeviceCommandList"
      >
        <el-option
          v-for="item in deviceCommandList"
          :key="item.id"
          :label="item.description"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <template
      v-if="
        ruleForm.deviceSkillObject.length > 0 &&
        (ruleForm.isDeviceSkill || ruleForm.noMessage)
      "
    >
      <div
        v-for="(item, index) in ruleForm.deviceSkillObject"
        :key="item.id"
        class="diff-param"
      >
        <el-form-item label="事件属性" class="deviceParam">
          <span>{{ item.description }} {{ item.propName }}</span>
        </el-form-item>
        <el-form-item label="命令参数" class="my-select-input deviceParam">
          <div class="command-param">
            <div class="command-left">
              <el-select
                v-model="item.operationSign"
                popper-class="selectCustomAttrs"
                @change="(e) => handleDeviceParamSelect(e, index)"
              >
                <el-option
                  v-for="itms in item.operationSignList"
                  :key="itms.key"
                  :label="itms.value"
                  :value="itms.key"
                ></el-option>
              </el-select>
            </div>
            <div class="command-right">
              <el-form-item
                v-if="
                  item.propValType === 'enum' ||
                  item.propValType === 'bool' ||
                  (item.propValType === 'int' && item.exchangeType === '1')
                "
                :prop="'deviceSkillObject.' + index + '.param'"
                :rules="[
                  {
                    required: true,
                    message: '参数值不能为空',
                    trigger: 'change',
                  },
                ]"
              >
                <el-select
                  v-model="item.param"
                  style="width: 100%"
                  placeholder="请选择参数"
                  popper-class="selectCustomAttrs"
                  @change="(e) => handleSkillSelect(e, index, 'select')"
                >
                  <el-option
                    v-for="itm in item.variantsList"
                    :key="itm.stdValue"
                    :label="itm.description"
                    :value="itm.stdValue"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-else
                :prop="'deviceSkillObject.' + index + '.param'"
                class="my-select-input deviceParam"
                :rules="[
                  {
                    required: true,
                    message: '参数值不能为空',
                    trigger: 'blur',
                  },
                  {
                    validator: (rule, value, callback) => {
                      getVariantsValue(item, value, callback);
                    },
                  },
                ]"
              >
                <el-input
                  v-model="item.param"
                  style="width: 100%"
                  :maxlength="item.propValType === 'string' ? 500 : null"
                  :placeholder="
                    item.variantsList
                      ? `${
                          '请输入' +
                          item.variantsList.minValue +
                          '到' +
                          item.variantsList.maxValue +
                          ',步长:' +
                          item.variantsList.step
                        }`
                      : '请输入字符串值'
                  "
                  @change="(e) => handleSkillSelect(e, index, 'input')"
                />
              </el-form-item>
            </div>
          </div>
        </el-form-item>
        <el-form-item
          label="用户编辑"
          :prop="'deviceSkillObject.' + index + '.require'"
          class="checkbox-style"
        >
          <el-checkbox
            v-model="item.require"
            @change="(e) => handleSkillSelect(e, index, 'check')"
            >支持</el-checkbox
          >
        </el-form-item>
      </div>
    </template>
    <template
      v-else-if="
        ruleForm.deviceSkillObject.length === 0 && ruleForm.isDeviceSkill
      "
    >
      <el-form-item label="命令参数" prop="commandParam">
        <span>无</span>
      </el-form-item>
      <el-form-item label="用户编辑" class="checkbox-style">
        <el-checkbox :disabled="true">支持</el-checkbox>
      </el-form-item>
    </template>
    <div v-else class="diff-param">
      <el-form-item
        v-if="!ruleForm.noMessage"
        label="命令参数"
        class="my-select-input deviceParam"
      >
        <div class="command-param">
          <div class="command-left">
            <el-select
              v-model="ruleForm.operationSign"
              :disabled="ruleForm.noAlarm"
              popper-class="selectCustomAttrs"
              :class="ruleForm.noAlarm ? 'setMaxWidth' : ''"
            >
              <el-option
                v-for="item in ruleForm.operationSignList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </div>
          <div v-if="!ruleForm.noAlarm" class="command-right">
            <el-form-item
              v-if="
                Array.isArray(ruleForm.variantsList) ||
                ruleForm.deviceCommand === ''
              "
              prop="commandParamSelect"
            >
              <el-select
                v-model="ruleForm.commandParamSelect"
                style="width: 100%"
                placeholder="请选择参数"
                popper-class="selectCustomAttrs"
                @change="handleChangeCommad"
              >
                <el-option
                  v-for="item in ruleForm.variantsList"
                  :key="item.stdValue"
                  :label="item.description"
                  :value="item.stdValue"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-else prop="inputValue">
              <div class="input-style">
                <el-input
                  v-model="ruleForm.inputValue"
                  type="text"
                  :maxlength="
                    ruleForm.variantsList &&
                    ruleForm.variantsList.propValType &&
                    ruleForm.variantsList.propValType == 'string'
                      ? 500
                      : null
                  "
                  :class="
                    ruleForm.variantsList &&
                    ruleForm.variantsList.propValType &&
                    ruleForm.variantsList.propValType == 'string'
                      ? 'string-width'
                      : ''
                  "
                  :placeholder="inputPlaceHolder"
                  @blur="handleChangeInput"
                />
              </div>
            </el-form-item>
          </div>
          <div
            v-if="
              !Array.isArray(ruleForm.variantsList) &&
              ruleForm.variantsList &&
              ruleForm.variantsList.unit &&
              !ruleForm.noAlarm
            "
            class="device-unit"
          >
            <span class="device-unit">{{ ruleForm.variantsList.unit }}</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="用户编辑" class="checkbox-style">
        <el-checkbox
          v-model="ruleForm.isRequired"
          :disabled="ruleForm.noAlarm"
          @change="handleUuterSupport"
          >支持</el-checkbox
        >
      </el-form-item>
    </div>
    <el-form-item label="条件描述" style="width: 100%">
      <el-input
        v-model="ruleForm.desc"
        maxlength="100"
        type="textarea"
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
// 同步父数据
import useSyncAttrData from "@/modules/attribute/mainPage/useSyncAttrData";

export default {
  props: {
    fragmentListData: {
      type: Object,
      default() {
        return {};
      },
    },
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
        deviceCommand: "",
        stdDesc: "",
        isRequired: false,
        noMessage: false,
        noAlarm: false,
        desc: "",
        operationSign: "equal", // 命令参数
        operationSignList: [
          {
            key: "equal",
            value: "等于",
          },
        ], // 命令参数列表
        deviceSkillObject: [], // 设备命令是deviceSkill类型
        key: {
          desc: "",
          value: "",
          id: "",
        },
        value: {
          value: "",
          desc: "",
          required: false,
        },
        params: [],
        variantsParamList: null,
        isDeviceSkill: false,
        variantsList: null,
        inputValue: "",
        commandParamSelect: "",
      },
      source: this.$route.query.source || "", // 场景模板来源
      rules: {
        componentId: [
          { required: true, message: "请选择设备产品类型", trigger: "change" },
        ],
        deviceCommand: [
          { required: true, message: "请选择设备命令", trigger: "change" },
        ],
        commandParamSelect: [
          { required: true, message: "请选择命令参数", trigger: "blur" },
        ],
        inputValue: [
          { required: true, message: "请输入命令参数", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              const data = {
                variantsList: this.ruleForm.variantsList,
                propValType: this.ruleForm.variantsList.propValType,
              };
              this.getVariantsValue(data, value, callback);
            },
            trigger: "blur",
          },
        ],
      },
      deviceProductTypeList: [], // 设备产品类型数据
      deviceCommandList: [], // 设备命令
      inputPlaceHolder: "",
      editData: this.singData,
    };
  },
  watch: {
    "ruleForm.componentId": {
      handler(val, old) {
        console.log(val, "val---");
        if (val) {
          if (old && val !== old) {
            this.editData = {};
          }
          const arr = this.deviceProductTypeList.filter((item) => {
            return item.id === val;
          });
          this.ruleForm.stdDesc = arr[0].prodtypeName;
          this.ruleForm.prodtypeName = arr[0].prodtypeName;
          this.ruleForm.prodtypeCode = arr[0].prodtypeCode;
          this.handleDeviceCommand();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.handleDeviceProductType();
    useSyncAttrData(this.$emit, this.ruleForm);
  },
  methods: {
    // 处理外层用户编辑数据
    handleUuterSupport(e) {
      this.ruleForm.value.required = e;
    },
    // 命令参数
    handleDeviceParamSelect(e, index) {
      this.ruleForm.params[index].operationSign = e;
      this.$forceUpdate();
    },
    // 获取设备产品类型
    handleDeviceProductType() {
      let url;
      if (this.source === "southeastAsia") {
        url = "/developerportal/dny/developer/prodtype/getAllProdtypeList";
      } else {
        url = "/developerportal/developer/prodtype/getAllProdtypeList";
      }
      iotRequest("post", url)
        .then((res) => {
          if (res.retCode === "00000") {
            this.deviceProductTypeList = res.data;
            return true;
          }
        })
        .then(() => {
          if (JSON.stringify(this.editData) !== "{}") {
            this.ruleForm.componentId = this.editData.componentId;
          }
        });
    },
    // 设备命令
    handleDeviceCommand() {
      let url;
      if (this.source === "southeastAsia") {
        url =
          "/developerportal/dny/developer/prodtypeFunction/getProdtypeConditionFunctionList";
      } else {
        url =
          "/developerportal/developer/prodtypeFunction/getProdtypeConditionFunctionList";
      }
      iotRequest("post", url, {
        prodtypeId: this.ruleForm.componentId,
      })
        .then((res) => {
          if (res.retCode === "00000") {
            res.data.map((item) => {
              console.log(item.type);
              if (item.type == "skill") {
                item.description = "(语音)" + item.description;
              }
              if (item.type == "deviceSkill") {
                item.description = "(技)" + item.description;
              }
            });
            this.deviceCommandList = res.data;
            this.$nextTick(() => {
              this.$refs.diffForm.clearValidate("deviceCommand");
              this.ruleForm.isDeviceSkill = false;
              this.ruleForm.noMessage = false;
              this.ruleForm.deviceSkillObject = [];
              this.ruleForm.params = [];
              this.ruleForm.variantsParamList = null;
              this.ruleForm.variantsList = null;
              this.ruleForm.inputValue = "";
              this.ruleForm.commandParamSelect = "";
              this.ruleForm.operationSignList = [
                {
                  key: "equal",
                  value: "等于",
                },
              ];
            });
            this.ruleForm.deviceCommand = "";
            return true;
          }
        })
        .then(() => {
          if (JSON.stringify(this.editData) !== "{}") {
            this.ruleForm.deviceCommand = this.editData.key.id;
            this.handleDeviceCommandList(this.ruleForm.deviceCommand);
          }
        });
    },
    handleDeviceCommandList(e) {
      console.log("选中的值", e);
      this.$refs.diffForm.clearValidate();
      if (
        JSON.stringify(this.editData) !== "{}" &&
        e !== this.editData.key.id
      ) {
        this.editData = {};
      }
      this.ruleForm.deviceSkillObject = [];
      this.ruleForm.isDeviceSkill = false;
      this.ruleForm.operationSign = "equal"; // 命令参数
      this.ruleForm.operationSignList = [
        {
          key: "equal",
          value: "等于",
        },
      ];
      this.ruleForm.variantsParamList = null;
      this.ruleForm.variantsList = null;
      this.ruleForm.inputValue = "";
      this.ruleForm.commandParamSelect = "";
      this.ruleForm.isRequired = false;
      this.ruleForm.params = [];
      const data = this.deviceCommandList.filter((item) => {
        return item.id === e;
      });
      if (data[0].type === "property") {
        this.ruleForm.isDeviceSkill = false;
        this.ruleForm.params = [];
        this.noAlarm = false;
        this.noMessage = false;
        this.ruleForm.key = {
          desc: data[0].description,
          value: data[0].name,
          id: data[0].id,
        };
        if (JSON.stringify(this.editData) !== "{}") {
          this.$set(this.ruleForm, "desc", this.editData.desc);
        }
        if (data[0].valType == "int") {
          const datas = JSON.parse(data[0].variants);
          this.inputPlaceHolder =
            "请输入" +
            datas.minValue +
            "到" +
            datas.maxValue +
            ",步长:" +
            datas.step;
          this.ruleForm.variantsList = datas;
          this.ruleForm.variantsList.propValType = data[0].valType;
          this.ruleForm.operationSignList = [
            {
              key: "greaterThan",
              value: "高于",
            },
            {
              key: "equal",
              value: "等于",
            },
            {
              key: "lessThan",
              value: "低于",
            },
          ];
          if (JSON.stringify(this.editData) !== "{}") {
            this.$set(this.ruleForm, "inputValue", this.editData.value.value);
            this.$set(this.ruleForm, "value", this.editData.value);
            this.$set(
              this.ruleForm,
              "operationSign",
              this.editData.operationSign
            );
            this.$set(
              this.ruleForm,
              "isRequired",
              this.editData.value.required
            );
          }
        } else if (data[0].valType == "bool" || data[0].valType == "enum") {
          const datas = JSON.parse(data[0].variants);
          datas.map((item) => {
            if (typeof item.stdValue !== "string") {
              item.stdValue = item.stdValue.toString();
            }
          });
          this.ruleForm.variantsList = datas;

          if (data[0].valType == "bool") {
            this.ruleForm.operationSignList = [
              {
                key: "equal",
                value: "等于",
              },
            ];
          }
          if (data[0].valType == "enum") {
            this.ruleForm.operationSignList = [
              {
                key: "equal",
                value: "等于",
              },
              {
                key: "unequal",
                value: "不等于",
              },
            ];
          }
          if (JSON.stringify(this.editData) !== "{}") {
            this.$set(
              this.ruleForm,
              "commandParamSelect",
              this.editData.value.value
            );
            this.$set(this.ruleForm, "value", this.editData.value);
            this.$set(
              this.ruleForm,
              "operationSign",
              this.editData.operationSign
            );
            this.$set(
              this.ruleForm,
              "isRequired",
              this.editData.value.required
            );
          }
        } else if (data[0].valType == "double") {
          const datas = JSON.parse(data[0].variants);
          this.ruleForm.operationSignList = [
            {
              key: "greaterThan",
              value: "高于",
            },
            {
              key: "equal",
              value: "等于",
            },
            {
              key: "lessThan",
              value: "低于",
            },
          ];
          this.inputPlaceHolder =
            "请输入" +
            datas.minValue +
            "到" +
            datas.maxValue +
            ",步长:" +
            datas.step;
          this.ruleForm.variantsList = datas;
          this.ruleForm.variantsList.propValType = data[0].valType;
          if (JSON.stringify(this.editData) !== "{}") {
            this.$set(this.ruleForm, "inputValue", this.editData.value.value);
            this.$set(
              this.ruleForm,
              "operationSign",
              this.editData.operationSign
            );
            this.$set(this.ruleForm, "value", this.editData.value);
            this.$set(
              this.ruleForm,
              "isRequired",
              this.editData.value.required
            );
          }
        } else if (data[0].valType == "string") {
          if (data[0].variants === undefined) {
            this.ruleForm.variantsList = {};
          } else {
            this.ruleForm.variantsList = JSON.parse(data[0].variants);
          }
          this.ruleForm.operationSignList = [
            {
              key: "greaterThan",
              value: "高于",
            },
            {
              key: "equal",
              value: "等于",
            },
            {
              key: "lessThan",
              value: "低于",
            },
            {
              key: "greaterThanEqual",
              value: "高于或等于",
            },
            {
              key: "unequal",
              value: "不等于",
            },
            {
              key: "lessThanEqual",
              value: "低于或等于",
            },
          ];
          this.inputPlaceHolder = "";
          this.ruleForm.variantsList.propValType = "string";
          if (JSON.stringify(this.editData) !== "{}") {
            this.$set(this.ruleForm, "inputValue", this.editData.value.value);
            this.$set(this.ruleForm, "value", this.editData.value);
            this.$set(
              this.ruleForm,
              "operationSign",
              this.editData.operationSign
            );
            this.$set(
              this.ruleForm,
              "isRequired",
              this.editData.value.required
            );
          }
        }
      }
      if (data[0].type === "deviceSkill") {
        this.ruleForm.key = {
          desc: data[0].stdDescription,
          value: data[0].name,
          id: data[0].id,
          type: "deviceSkill",
        };
        if (JSON.stringify(this.editData) !== "{}") {
          this.$set(this.ruleForm, "desc", this.editData.desc);
          this.$set(this.ruleForm, "params", this.editData.params);
        }
        this.ruleForm.isDeviceSkill = true;
        this.ruleForm.deviceSkillObject = data[0].prodtypeFunctionSubDtoList
          ? data[0].prodtypeFunctionSubDtoList
          : [];
        if (this.ruleForm.deviceSkillObject.length > 0) {
          this.ruleForm.deviceSkillObject.map((item, index) => {
            this.$set(item, "param", "");
            const objName = {
              desc: item.description,
              key: {
                desc: item.description,
                id: item.id,
                type: "deviceSkill",
                value: item.propName,
              },
              logicalSign: "AND",
              operationSign: "equal",
              value: {
                desc: "",
                required: false,
                value: "",
              },
            };
            if (JSON.stringify(this.editData) === "{}") {
              this.ruleForm.params.push(objName);
            }
            if (item.propValType == "enum") {
              if (item.variants) {
                const data = this.isJSON_test(item.variants)
                  ? JSON.parse(item.variants)
                  : [];
                data.map((items) => {
                  if (typeof items.stdValue !== "string") {
                    items.stdValue = items.stdValue + "";
                  }
                });
                item.variantsList = data;
              }
              item.placeholder = "请选择参数";
              item.operationSignList = [
                {
                  key: "equal",
                  value: "等于",
                },
                {
                  key: "unequal",
                  value: "不等于",
                },
              ];
              if (JSON.stringify(this.editData) !== "{}") {
                this.$set(
                  item,
                  "param",
                  this.editData.params[index].value.value
                );
                this.$set(
                  item,
                  "operationSign",
                  this.editData.params[index].operationSign
                );
                this.$set(
                  item,
                  "require",
                  this.editData.params[index].value.required
                );
                this.$set(item, "value", this.editData.value);
                this.$set(item, "params", this.editData.params);
              } else {
                item.operationSign = "equal";
                item.require = false;
              }
            } else if (item.propValType == "string") {
              if (item.variants) {
                item.variantsList = this.isJSON_test(item.variants)
                  ? JSON.parse(item.variants)
                  : "";
                item.placeholder =
                  "请输入" +
                  item.variantsList.minValue +
                  "到" +
                  item.variantsList.maxValue +
                  ",步长:" +
                  item.variantsList.step;
                item.unit = item.variantsList.unit
                  ? item.variantsList.unit
                  : "";
              } else {
                item.placeholder = "请输入字符串";
              }
              item.operationSignList = [
                {
                  key: "greaterThan",
                  value: "高于",
                },
                {
                  key: "equal",
                  value: "等于",
                },
                {
                  key: "lessThan",
                  value: "低于",
                },
                {
                  key: "greaterThanEqual",
                  value: "高于或等于",
                },
                {
                  key: "unequal",
                  value: "不等于",
                },
                {
                  key: "lessThanEqual",
                  value: "低于或等于",
                },
              ];
              if (JSON.stringify(this.editData) !== "{}") {
                this.$set(
                  item,
                  "param",
                  this.editData.params[index].value.value
                );
                this.$set(
                  item,
                  "operationSign",
                  this.editData.params[index].operationSign
                );
                this.$set(
                  item,
                  "require",
                  this.editData.params[index].value.required
                );
                this.$set(item, "value", this.editData.value);
                this.$set(item, "params", this.editData.params);
              } else {
                item.operationSign = "equal";
                item.require = false;
              }
            } else if (item.propValType == "bool") {
              if (item.variants) {
                const data = this.isJSON_test(item.variants)
                  ? JSON.parse(item.variants)
                  : [];
                data.map((items) => {
                  if (typeof items.stdValue !== "string") {
                    items.stdValue = items.stdValue + "";
                  }
                });
                item.variantsList = data;
              }
              item.placeholder = "请选择参数";
              item.operationSignList = [
                {
                  key: "equal",
                  value: "等于",
                },
              ];
              if (JSON.stringify(this.editData) !== "{}") {
                this.$set(
                  item,
                  "param",
                  this.editData.params[index].value.value
                );
                this.$set(
                  item,
                  "operationSign",
                  this.editData.params[index].operationSign
                );
                this.$set(
                  item,
                  "require",
                  this.editData.params[index].value.required
                );
                this.$set(item, "value", this.editData.value);
                this.$set(item, "params", this.editData.params);
              } else {
                item.operationSign = "equal";
                item.require = false;
              }
            } else if (item.propValType == "int") {
              if (item.variants) {
                item.variantsList = this.isJSON_test(item.variants)
                  ? JSON.parse(item.variants)
                  : "";
                item.placeholder =
                  "请输入" +
                  item.variantsList.minValue +
                  "到" +
                  item.variantsList.maxValue +
                  ",步长:" +
                  item.variantsList.step;
                item.unit = item.variantsList.unit
                  ? item.variantsList.unit
                  : "";
              } else {
                item.placeholder = "请输入";
              }
              item.operationSignList = [
                {
                  key: "greaterThan",
                  value: "高于",
                },
                {
                  key: "equal",
                  value: "等于",
                },
                {
                  key: "lessThan",
                  value: "低于",
                },
              ];
              if (JSON.stringify(this.editData) !== "{}") {
                this.$set(
                  item,
                  "param",
                  Number(this.editData.params[index].value.value)
                );
                this.$set(
                  item,
                  "operationSign",
                  this.editData.params[index].operationSign
                );
                this.$set(
                  item,
                  "require",
                  this.editData.params[index].value.required
                );
                this.$set(item, "value", this.editData.value);
                this.$set(item, "params", this.editData.params);
              } else {
                item.operationSign = "equal";
                item.require = false;
              }
            } else {
              if (item.variants) {
                item.variantsList = this.isJSON_test(item.variants)
                  ? JSON.parse(item.variants)
                  : "";
                item.placeholder =
                  "请输入" +
                  item.variantsList.minValue +
                  "到" +
                  item.variantsList.maxValue +
                  ",步长:" +
                  item.variantsList.step;
                item.unit = item.variantsList.unit
                  ? item.variantsList.unit
                  : "";
              } else {
                item.placeholder = "请输入";
              }
              item.operationSignList = [
                {
                  key: "greaterThan",
                  value: "高于",
                },
                {
                  key: "equal",
                  value: "等于",
                },
                {
                  key: "lessThan",
                  value: "低于",
                },
              ];
              if (JSON.stringify(this.editData) !== "{}") {
                this.$set(
                  item,
                  "param",
                  Number(this.editData.params[index].value.value)
                );
                this.$set(
                  item,
                  "operationSign",
                  this.editData.params[index].operationSign
                );
                this.$set(
                  item,
                  "require",
                  this.editData.params[index].value.required
                );
                this.$set(item, "value", this.editData.value);
                this.$set(item, "params", this.editData.params);
              } else {
                item.operationSign = "equal";
                item.require = false;
              }
            }
          });
        } else {
          this.ruleForm.params = [];
        }
      } else {
        this.ruleForm.isDeviceSkill = false;
      }
      if (data[0].type == "message") {
        this.ruleForm.noMessage = true;
        this.ruleForm.key = {
          desc: data[0].stdDescription,
          value: data[0].name,
          id: data[0].id,
          type: "message",
        };
        if (JSON.stringify(this.editData) !== "{}") {
          this.$set(this.ruleForm, "desc", this.editData.desc);
          this.$set(this.ruleForm, "params", this.editData.params);
        }
        this.ruleForm.deviceSkillObject = data[0].prodtypeFunctionSubDtoList
          ? data[0].prodtypeFunctionSubDtoList
          : [];
        if (this.ruleForm.deviceSkillObject.length > 0) {
          this.ruleForm.deviceSkillObject.map((item, index) => {
            this.$set(item, "param", "");
            const objName = {
              desc: item.description,
              key: {
                desc: item.description,
                id: item.id,
                type: "message",
                value: item.propName,
              },
              logicalSign: "AND",
              operationSign: "equal",
              value: {
                desc: "",
                required: false,
                value: "",
              },
            };
            if (JSON.stringify(this.editData) === "{}") {
              this.ruleForm.params.push(objName);
            }
            if (item.propValType == "enum") {
              if (item.variants) {
                const data = this.isJSON_test(item.variants)
                  ? JSON.parse(item.variants)
                  : [];
                data.map((items) => {
                  if (typeof items.stdValue !== "string") {
                    items.stdValue = items.stdValue + "";
                  }
                });
                item.variantsList = data;
              }
              item.placeholder = "请选择参数";
              item.operationSignList = [
                {
                  key: "equal",
                  value: "等于",
                },
                {
                  key: "unequal",
                  value: "不等于",
                },
              ];
              if (JSON.stringify(this.editData) !== "{}") {
                this.$set(
                  item,
                  "param",
                  this.editData.params[index].value.value
                );
                this.$set(
                  item,
                  "operationSign",
                  this.editData.params[index].operationSign
                );
                this.$set(
                  item,
                  "require",
                  this.editData.params[index].value.required
                );
                this.$set(item, "value", this.editData.value);
                this.$set(item, "params", this.editData.params);
              } else {
                item.operationSign = "equal";
                item.require = false;
              }
            } else if (item.propValType == "string") {
              if (item.variants) {
                item.variantsList = this.isJSON_test(item.variants)
                  ? JSON.parse(item.variants)
                  : "";
                item.placeholder =
                  "请输入" +
                  item.variantsList.minValue +
                  "到" +
                  item.variantsList.maxValue +
                  ",步长:" +
                  item.variantsList.step;
                item.unit = item.variantsList.unit
                  ? item.variantsList.unit
                  : "";
              } else {
                item.placeholder = "请输入字符串";
              }
              item.operationSignList = [
                {
                  key: "greaterThan",
                  value: "高于",
                },
                {
                  key: "equal",
                  value: "等于",
                },
                {
                  key: "lessThan",
                  value: "低于",
                },
                {
                  key: "greaterThanEqual",
                  value: "高于或等于",
                },
                {
                  key: "unequal",
                  value: "不等于",
                },
                {
                  key: "lessThanEqual",
                  value: "低于或等于",
                },
              ];
              if (JSON.stringify(this.editData) !== "{}") {
                this.$set(
                  item,
                  "param",
                  this.editData.params[index].value.value
                );
                this.$set(
                  item,
                  "operationSign",
                  this.editData.params[index].operationSign
                );
                this.$set(
                  item,
                  "require",
                  this.editData.params[index].value.required
                );
                this.$set(item, "value", this.editData.value);
                this.$set(item, "params", this.editData.params);
              } else {
                item.operationSign = "equal";
                item.require = false;
              }
            } else if (item.propValType == "bool") {
              if (item.variants) {
                const data = this.isJSON_test(item.variants)
                  ? JSON.parse(item.variants)
                  : [];
                data.map((items) => {
                  if (typeof items.stdValue !== "string") {
                    items.stdValue = items.stdValue + "";
                  }
                });
                item.variantsList = data;
              }
              item.placeholder = "请选择参数";
              item.operationSignList = [
                {
                  key: "equal",
                  value: "等于",
                },
              ];
              if (JSON.stringify(this.editData) !== "{}") {
                this.$set(
                  item,
                  "param",
                  this.editData.params[index].value.value
                );
                this.$set(
                  item,
                  "operationSign",
                  this.editData.params[index].operationSign
                );
                this.$set(
                  item,
                  "require",
                  this.editData.params[index].value.required
                );
                this.$set(item, "value", this.editData.value);
                this.$set(item, "params", this.editData.params);
              } else {
                item.operationSign = "equal";
                item.require = false;
              }
            } else if (item.propValType == "int") {
              if (item.exchangeType === "1") {
                if (item.exchangeVariants) {
                  const data = this.isJSON_test(item.exchangeVariants)
                    ? JSON.parse(item.exchangeVariants)
                    : [];
                  data.map((items) => {
                    if (typeof items.stdValue !== "string") {
                      items.stdValue = items.stdValue + "";
                    }
                  });
                  item.variantsList = data;
                }
                item.placeholder = "请选择参数";
                item.operationSignList = [
                  {
                    key: "equal",
                    value: "等于",
                  },
                  {
                    key: "unequal",
                    value: "不等于",
                  },
                ];
                if (JSON.stringify(this.editData) !== "{}") {
                  this.$set(
                    item,
                    "param",
                    this.editData.params[index].value.value
                  );
                  this.$set(
                    item,
                    "operationSign",
                    this.editData.params[index].operationSign
                  );
                  this.$set(
                    item,
                    "require",
                    this.editData.params[index].value.required
                  );
                  this.$set(item, "value", this.editData.value);
                  this.$set(item, "params", this.editData.params);
                } else {
                  item.operationSign = "equal";
                  item.require = false;
                }
              } else {
                if (item.variants) {
                  item.variantsList = this.isJSON_test(item.variants)
                    ? JSON.parse(item.variants)
                    : "";
                  item.placeholder =
                    "请输入" +
                    item.variantsList.minValue +
                    "到" +
                    item.variantsList.maxValue +
                    ",步长:" +
                    item.variantsList.step;
                  item.unit = item.variantsList.unit
                    ? item.variantsList.unit
                    : "";
                } else {
                  item.placeholder = "请输入";
                }
                item.operationSignList = [
                  {
                    key: "greaterThan",
                    value: "高于",
                  },
                  {
                    key: "equal",
                    value: "等于",
                  },
                  {
                    key: "lessThan",
                    value: "低于",
                  },
                ];
                if (JSON.stringify(this.editData) !== "{}") {
                  this.$set(
                    item,
                    "param",
                    Number(this.editData.params[index].value.value)
                  );
                  this.$set(
                    item,
                    "operationSign",
                    this.editData.params[index].operationSign
                  );
                  this.$set(
                    item,
                    "require",
                    this.editData.params[index].value.required
                  );
                  this.$set(item, "value", this.editData.value);
                  this.$set(item, "params", this.editData.params);
                } else {
                  item.operationSign = "equal";
                  item.require = false;
                }
              }
            } else {
              if (item.variants) {
                item.variantsList = this.isJSON_test(item.variants)
                  ? JSON.parse(item.variants)
                  : "";
                item.placeholder =
                  "请输入" +
                  item.variantsList.minValue +
                  "到" +
                  item.variantsList.maxValue +
                  ",步长:" +
                  item.variantsList.step;
                item.unit = item.variantsList.unit
                  ? item.variantsList.unit
                  : "";
              } else {
                item.placeholder = "请输入";
              }
              item.operationSignList = [
                {
                  key: "greaterThan",
                  value: "高于",
                },
                {
                  key: "equal",
                  value: "等于",
                },
                {
                  key: "lessThan",
                  value: "低于",
                },
              ];
              if (JSON.stringify(this.editData) !== "{}") {
                this.$set(
                  item,
                  "param",
                  Number(this.editData.params[index].value.value)
                );
                this.$set(
                  item,
                  "operationSign",
                  this.editData.params[index].operationSign
                );
                this.$set(
                  item,
                  "require",
                  this.editData.params[index].value.required
                );
                this.$set(item, "value", this.editData.value);
                this.$set(item, "params", this.editData.params);
              } else {
                item.operationSign = "equal";
                item.require = false;
              }
            }
          });
        } else {
          this.ruleForm.params = [];
        }
      } else {
        this.ruleForm.noMessage = false;
      }
      if (data[0].type == "alarm") {
        this.ruleForm.noAlarm = true;
        this.ruleForm.params = [];
        this.ruleForm.key = {
          desc: data[0].description,
          value: data[0].name,
          id: data[0].id,
        };
        this.ruleForm.value = {
          desc: "",
          required: false,
          value: "",
        };
        if (JSON.stringify(this.editData) !== "{}") {
          this.$set(this.ruleForm, "desc", this.editData.desc);
        }
      } else {
        this.ruleForm.noAlarm = false;
      }
    },
    isJSON_test(str) {
      if (typeof str == "string") {
        try {
          var obj = JSON.parse(str);
          console.log(obj);
          return true;
        } catch (e) {
          return false;
        }
      }
    },
    //根据属性ID获取属性取值范围
    getVariantsValue(item, value, callback) {
      if (item.variantsList && value) {
        if (item.propValType === "double") {
          if (!this.$vertifyMethods.isDouble(value, 2)) {
            callback("数据不符合要求");
          }
          if (parseFloat(value) < parseFloat(item.variantsList.minValue)) {
            callback("参数值数据格式不合法，请重新填写");
          } else if (
            parseFloat(value) > parseFloat(item.variantsList.maxValue)
          ) {
            callback("参数值数据格式不合法，请重新填写");
          } else if (
            parseFloat(value) % parseFloat(item.variantsList.step) !==
            0
          ) {
            callback("参数值数据格式不合法，请重新填写");
          } else {
            callback();
          }
        }
        if (item.propValType === "int") {
          let reg = /^[0-9]*$/;
          if (!reg.test(value)) {
            callback("数据不符合要求");
          }
          console.log(Number(value), Number(item.variantsList.minValue));
          if (Number(value) < Number(item.variantsList.minValue)) {
            callback("参数值数据格式不合法，请重新填写");
          } else if (Number(value) > Number(item.variantsList.maxValue)) {
            callback("参数值数据格式不合法，请重新填写");
          } else if (Number(value) % Number(item.variantsList.step) !== 0) {
            callback("参数值数据格式不合法，请重新填写");
          } else {
            callback();
          }
        }
        if (item.propValType === "string") {
          callback();
        }
      } else {
        callback();
      }
    },
    // 技能的select选项
    handleSkillSelect(e, index, type) {
      if (type === "select") {
        this.ruleForm.deviceSkillObject[index].variantsList.filter((item) => {
          if (item.stdValue === e) {
            this.ruleForm.params[index].value = {
              desc: item.description,
              required: this.ruleForm.deviceSkillObject[index].require,
              value: e,
            };
          }
        });
      } else if (type === "input") {
        this.ruleForm.params[index].value = {
          desc: e,
          required: this.ruleForm.deviceSkillObject[index].require,
          value: e,
        };
      } else {
        this.$set(this.ruleForm.deviceSkillObject[index], "require", e);
        this.ruleForm.params[index].value.required = e;
        this.$forceUpdate();
      }
    },
    resetFormData() {
      this.$refs.diffForm.resetFields();
    },
    // 选择除了设备技能外的命令参数
    handleChangeCommad(e) {
      if (e) {
        this.$refs.diffForm.clearValidate("commandParamSelect");
      }
      const data = this.ruleForm.variantsList.filter((item) => {
        return item.stdValue === e;
      });
      this.ruleForm.value = {
        desc: data[0].description,
        value: e,
        required: this.ruleForm.isRequired,
      };
    },
    handleChangeSelectParamSet(e) {
      const data = this.ruleForm.variantsParamList.filter((item) => {
        return item.stdValue === e;
      });
      this.ruleForm.args[0].value = {
        desc: data[0].description,
        value: e,
        required: this.ruleForm.isRequired,
      };
    },
    handleChangeParamSet(e) {
      let desc;
      if (this.ruleForm.variantsList.unit) {
        desc = e.target.value + this.ruleForm.variantsList.unit;
      }
      this.ruleForm.args[0].value = {
        desc: desc,
        value: e.target.value,
        required: this.ruleForm.isRequired,
      };
    },
    handleChangeInput(e) {
      let desc;
      if (this.ruleForm.variantsList.unit) {
        desc = e.target.value + this.ruleForm.variantsList.unit;
      } else {
        desc = e.target.value;
      }
      this.ruleForm.value = {
        desc: desc,
        value: e.target.value,
        required: this.ruleForm.isRequired,
      };
    },
  },
};
</script>
<style lang="scss">
.diff-param {
  margin-bottom: 24px;
}
.deviceParam {
  margin-bottom: 24px;
  > .el-form-item__label::after {
    content: "*";
    color: #f56c6c;
    margin-left: 2px;
  }
}
.device-condition {
  .input-style {
    // width: 150%;
  }
  .el-select,
  .el-textarea {
    width: 100%;
  }
  .my-select-input {
    .command-param {
      display: flex;
      width: 100%;
      .command-left {
        flex: 2;
        .el-select {
          // width: 65%;
        }
      }
      .command-right {
        flex: 5;
        margin-left: 16px;
        .el-form-item__error {
          width: 100%;
        }
      }
      .device-unit {
        margin-left: 5px;
        // flex: 1;
      }
    }
  }
}
.setMaxWidth {
  max-width: 20%;
}
.string-width {
  max-width: 100%;
}
</style>
