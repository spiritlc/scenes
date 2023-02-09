<!--
 * @Descripttion: 
 * @version: 
 * @Author: mry
 * @Date: 2022-03-22 09:41:45
 * @LastEditors: mry
 * @LastEditTime: 2022-05-13 18:19:52
-->
<template>
  <el-form
    ref="diffForm"
    class="command-action common-form"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    label-position="top"
  >
    <el-form-item label="设备产品类型" prop="componentId">
      <el-select
        v-model="ruleForm.componentId"
        popper-class="selectCustomAttrs"
        filterable
        placeholder="请选择设备产品类型"
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
        popper-class="selectCustomAttrs"
        filterable
        placeholder="请选择设备命令"
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
      v-if="ruleForm.deviceSkillObject.length > 0 && ruleForm.isDeviceSkill"
    >
      <div
        v-for="(item, index) in ruleForm.deviceSkillObject"
        :key="item.id"
        class="diff-param"
      >
        <el-form-item label="参数名称">
          <span>{{ item.description }}</span>
        </el-form-item>
        <!-- :rules="deviceSkillObjectRules.deviceSkillObjectDesc" -->
        <el-form-item
          v-if="item.propValType === 'enum' || item.propValType === 'bool'"
          label="参数值"
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
          label="参数值"
          :prop="'deviceSkillObject.' + index + '.param'"
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
      <el-form-item label="命令参数" class="my-select-input deviceParam">
        <div class="command-param">
          <div class="command-left">
            <h-button
              type="third"
              :disabled="ruleForm.propClass == 'group' || ruleForm.isSkill"
              >定量</h-button
            >
          </div>
          <div
            v-if="
              ruleForm.deviceCommand !== '' &&
              ruleForm.propClass !== 'group' &&
              ruleForm.propClass !== 'skill'
            "
            class="command-right"
          >
            <el-form-item
              v-if="Array.isArray(ruleForm.variantsList)"
              prop="commandParamSelect"
            >
              <el-select
                v-model="ruleForm.commandParamSelect"
                style="max-width: 100%"
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
              <div
                :class="
                  ruleForm.variantsList.propValType === 'string'
                    ? 'input-string'
                    : 'input-style'
                "
              >
                <el-input
                  v-model="ruleForm.inputValue"
                  type="text"
                  :placeholder="inputPlaceHolder"
                  @blur="handleChangeInput"
                />
              </div>
            </el-form-item>
          </div>
          <div
            v-if="
              ruleForm.propClass === 'skill' && ruleForm.variantsList.length > 0
            "
            class="command-right"
          >
            <el-form-item
              v-if="Array.isArray(ruleForm.variantsList)"
              prop="commandParamSelect"
            >
              <el-select
                v-model="ruleForm.commandParamSelect"
                placeholder="请选择参数"
                popper-class="selectCustomAttrs"
                @change="handleSkillChangeCommad"
              >
                <el-option
                  v-for="item in ruleForm.variantsList"
                  :key="item.id"
                  :label="item.description"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-else prop="inputValue">
              <div class="input-style">
                <el-input
                  v-model="ruleForm.inputValue"
                  type="text"
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
              ruleForm.variantsList.unit
            "
            class="device-unit"
          >
            <span class="device-unit">{{ ruleForm.variantsList.unit }}</span>
          </div>
        </div>
      </el-form-item>
      <!-- 参数配置select -->
      <el-form-item
        v-if="
          ruleForm.commandParamSelect !== '' &&
          ruleForm.deviceSkillObject.length > 0 &&
          (ruleForm.deviceSkillObject[0].propValType === 'enum' ||
            ruleForm.deviceSkillObject[0].propValType === 'bool')
        "
        prop="paramSelectSet"
        label="参数配置"
      >
        <el-select
          v-model="ruleForm.paramSelectSet"
          placeholder="请选择参数"
          popper-class="selectCustomAttrs"
          @change="handleChangeSelectParamSet"
        >
          <el-option
            v-for="item in ruleForm.variantsParamList"
            :key="item.stdValue"
            :label="item.description"
            :value="item.stdValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 参数配置input -->
      <el-form-item
        v-if="
          ruleForm.commandParamSelect !== '' &&
          ruleForm.deviceSkillObject.length > 0 &&
          (ruleForm.deviceSkillObject[0].propValType === 'string' ||
            ruleForm.deviceSkillObject[0].propValType === 'int' ||
            ruleForm.deviceSkillObject[0].propValType === 'double')
        "
        prop="paramInputSet"
        label="参数配置"
      >
        <el-input
          v-model="ruleForm.paramInputSet"
          style="width: 100%"
          @blur="handleChangeParamSet"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户编辑" class="checkbox-style">
        <el-checkbox
          v-model="ruleForm.isRequired"
          :disabled="ruleForm.propClass == 'group' || ruleForm.isSkill"
          >支持</el-checkbox
        >
      </el-form-item>
    </div>
    <el-form-item label="动作描述">
      <el-input
        v-model="ruleForm.description"
        maxlength="100"
        type="textarea"
        :class="{ 'input-focus': inputFocus }"
        show-word-limit
        placeholder="请填写动作描述，最多100字符"
        @focus="inputFocus = true"
        @blur="inputFocus = false"
      ></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { iotRequest } from "@/infrastructure/apis/api";
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
        description: "",
        deviceSkillObject: [
          {
            param: "",
            require: false,
          },
        ], // 设备命令是deviceSkill类型
        args: [],
        operation: {
          desc: "",
          id: "",
          value: "",
        },
        variantsParamList: null,
        isDeviceSkill: false,
        isSkill: false,
        propClass: "",
        variantsList: null,
        inputValue: "",
        commandParamSelect: "",
        paramSelectSet: "",
        paramInputSet: "",
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
        paramSelectSet: [
          { required: true, message: "请选择参数配置", trigger: "change" },
        ],
        paramInputSet: [
          { required: true, message: "请输入参数配置", trigger: "blur" },
        ],
        inputValue: [
          { required: true, message: "请输入命令参数", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              console.log(rule, value, callback);
              console.log(this.ruleForm.variantsList, "---");
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
      deviceSkillObjectRules: {
        deviceSkillObjectId: [
          {
            required: true,
            message: "jaaa",
            trigger: "blur",
          },
          {
            validator: (rule, value, callback) => {
              console.log(rule, value, callback);
            },
          },
        ],
        deviceSkillObjectDesc: [
          {
            required: true,
            message: "jaaa",
            trigger: "blur",
          },
          {
            validator: (rule, value, callback) => {
              console.log(rule);
              console.log(value);
              console.log(callback);
            },
          },
        ],
      },
      deviceProductTypeList: [], // 设备产品类型数据
      deviceCommandList: [], // 设备命令
      sceneDeviceCondition: {
        sceneInfo: null,
        status: null,
        FragmentList: null,
        triggerType: null,
      },
      inputPlaceHolder: "",
      editData: this.singData,
    };
  },
  watch: {
    "ruleForm.componentId": {
      handler(val, old) {
        if (val) {
          if (old && val !== old) {
            this.editData = {};
          }
          const arr = this.deviceProductTypeList.filter((item) => {
            return item.id === val;
          });
          this.ruleForm.stdDesc = arr[0].prodtypeName;
          this.handleDeviceCommand();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.handleDeviceProductType();
  },
  methods: {
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
            this.ruleForm.componentId = this.editData.control.componentId;
          }
        });
    },
    // 设备命令
    handleDeviceCommand() {
      let url;
      if (this.source === "southeastAsia") {
        url =
          "/developerportal/dny/developer/prodtypeFunction/getProdtypeActionFunctionList";
      } else {
        url =
          "/developerportal/developer/prodtypeFunction/getProdtypeActionFunctionList";
      }
      iotRequest("post", url, {
        prodtypeId: this.ruleForm.componentId,
      })
        .then((res) => {
          if (res.retCode === "00000") {
            res.data.map((item) => {
              console.log(item.type, item.valType, "----");
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
              this.ruleForm.isSkill = false;
              this.ruleForm.deviceSkillObject = [];
              this.ruleForm.args = [];
              this.ruleForm.variantsParamList = null;
              this.ruleForm.variantsList = null;
              this.ruleForm.inputValue = "";
              this.ruleForm.commandParamSelect = "";
              this.ruleForm.paramSelectSet = "";
              this.ruleForm.paramInputSet = "";
              this.ruleForm.propClass = "";
              this.ruleForm.operation = {
                desc: "",
                id: "",
                value: "",
              };
            });
            this.ruleForm.deviceCommand = "";
            return true;
          }
        })
        .then(() => {
          if (JSON.stringify(this.editData) !== "{}") {
            // 有的没有args
            if (
              this.editData.control.args &&
              !this.editData.control.operation
            ) {
              this.ruleForm.deviceCommand =
                this.editData.control.args[0].name.id;
            } else {
              this.ruleForm.deviceCommand = this.editData.control.operation.id;
            }
            this.handleDeviceCommandList(this.ruleForm.deviceCommand);
          }
        });
    },
    handleDeviceCommandList(e) {
      console.log("选中的值", e);
      this.$refs.diffForm.clearValidate();
      this.ruleForm.isDeviceSkill = false;
      this.ruleForm.isSkill = false;
      this.ruleForm.deviceSkillObject = [];
      this.ruleForm.args = [];
      this.ruleForm.variantsParamList = null;
      this.ruleForm.variantsList = null;
      this.ruleForm.isRequired = false;
      this.ruleForm.inputValue = "";
      this.ruleForm.paramSelectSet = "";
      this.ruleForm.paramInputSet = "";
      this.ruleForm.commandParamSelect = "";
      if (JSON.stringify(this.editData) !== "{}") {
        if (this.editData.control.args && !this.editData.control.operation) {
          if (e !== this.editData.control.args[0].name.id) {
            this.editData = {};
            this.$set(this.ruleForm, "args", []);
          } else {
            this.$set(this.ruleForm, "args", this.editData.control.args);
          }
        } else {
          if (e !== this.editData.control.operation.id) {
            this.editData = {};
            this.$set(this.ruleForm, "args", []);
          } else {
            this.$set(this.ruleForm, "args", this.editData.control.args);
          }
        }
      }
      const data = this.deviceCommandList.filter((item) => {
        return item.id === e;
      });
      // description
      if (JSON.stringify(this.editData) !== "{}") {
        this.$set(this.ruleForm, "description", this.editData.description);
      }
      if (data[0].type === "property") {
        this.ruleForm.isDeviceSkill = false;
        this.ruleForm.isSkill = false;
        this.ruleForm.propClass = "";
        const obj = {
          name: {
            desc: data[0].description,
            id: data[0].id,
            value: data[0].propName,
          },
        };
        if (JSON.stringify(this.editData) === "{}") {
          this.ruleForm.args.push(obj);
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
          if (JSON.stringify(this.editData) !== "{}") {
            this.$set(
              this.ruleForm,
              "inputValue",
              this.editData.control.args[0].value.value
            );
            this.$set(
              this.ruleForm,
              "isRequired",
              this.editData.control.args[0].value.required
            );
          }
        } else if (data[0].valType == "bool" || data[0].valType == "enum") {
          const datas = JSON.parse(data[0].variants);
          datas.map((item) => {
            if (typeof item.stdValue !== "string") {
              item.stdValue = item.stdValue + "";
            }
          });
          this.ruleForm.variantsList = datas;
          if (JSON.stringify(this.editData) !== "{}") {
            this.$set(
              this.ruleForm,
              "commandParamSelect",
              this.editData.control.args[0].value.value
            );
            this.$set(
              this.ruleForm,
              "isRequired",
              this.editData.control.args[0].value.required
            );
          }
          console.log(this.ruleForm.variantsList, "pro");
        } else if (data[0].valType == "double") {
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
          if (JSON.stringify(this.editData) !== "{}") {
            this.$set(
              this.ruleForm,
              "inputValue",
              this.editData.control.args[0].value.value
            );
            this.$set(
              this.ruleForm,
              "isRequired",
              this.editData.control.args[0].value.required
            );
          }
        } else if (data[0].valType == "string") {
          console.log(data[0], "data------------");
          if (data[0].variants) {
            const datas = JSON.parse(data[0].variants);
            if (datas.minValue) {
              this.inputPlaceHolder =
                "请输入" +
                datas.minValue +
                "到" +
                datas.maxValue +
                ",步长:" +
                datas.step;
              this.ruleForm.variantsList = datas;
              this.ruleForm.variantsList.propValType = data[0].valType;
            } else {
              this.ruleForm.variantsList = {
                propValType: data[0].valType,
              };
            }
          } else {
            this.ruleForm.variantsList = {
              propValType: "string",
            };
          }
          if (JSON.stringify(this.editData) !== "{}") {
            this.$set(
              this.ruleForm,
              "inputValue",
              this.editData.control.args[0].value.value
            );
            this.$set(
              this.ruleForm,
              "isRequired",
              this.editData.control.args[0].value.required
            );
          }
        }
      }
      if (data[0].type === "group") {
        console.log(222);
        this.ruleForm.isDeviceSkill = false;
        this.ruleForm.isSkill = false;
        this.ruleForm.propClass = "group";
        this.ruleForm.operation = {
          desc: data[0].stdDescription,
          id: data[0].id,
          value: data[0].name,
        };
        console.log("group");
      }
      if (data[0].type === "skill") {
        this.ruleForm.isDeviceSkill = false;
        this.ruleForm.propClass = "skill";
        this.ruleForm.operation = {
          desc: data[0].stdDescription,
          id: data[0].id,
          value: data[0].name,
        };
        this.ruleForm.deviceSkillObject = data[0].prodtypeFunctionSubDtoList
          ? data[0].prodtypeFunctionSubDtoList
          : [];
        this.ruleForm.variantsList = this.ruleForm.deviceSkillObject;
        if (this.ruleForm.deviceSkillObject.length > 0) {
          this.ruleForm.isSkill = false;
          this.ruleForm.deviceSkillObject.map((item) => {
            const objName = {
              name: {
                desc: item.description,
                id: item.id,
                required: false,
                value: item.propName,
              },
              value: {
                desc: "",
                required: false,
                value: "",
              },
            };
            if (JSON.stringify(this.editData) === "{}") {
              this.ruleForm.args.push(objName);
            }
            if (item.variants) {
              this.ruleForm.variantsParamList = this.isJSON_test(item.variants)
                ? JSON.parse(item.variants)
                : [];
            }
            console.log(
              this.ruleForm.variantsParamList,
              "this.ruleForm.variantsParamList"
            );
            if (JSON.stringify(this.editData) !== "{}") {
              this.$set(
                this.ruleForm,
                "commandParamSelect",
                this.singData.control.args[0].name.id
              );
              this.$set(
                this.ruleForm,
                "paramSelectSet",
                this.singData.control.args[0].value.value
              );
              this.$set(
                this.ruleForm,
                "paramInputSet",
                this.singData.control.args[0].value.value
              );
              this.$set(
                this.ruleForm,
                "isRequired",
                this.editData.control.args[0].value.required
              );
            }
          });
          console.log(this.ruleForm.args, "---this.ruleForm.args");
        } else {
          this.ruleForm.args = [];
          this.ruleForm.isSkill = true;
        }
      }
      if (data[0].type === "deviceSkill") {
        console.log(444);
        this.ruleForm.isSkill = false;
        this.ruleForm.propClass = "deviceSkill";
        this.ruleForm.operation = {
          desc: data[0].stdDescription,
          id: data[0].id,
          value: data[0].name,
        };
        this.ruleForm.isDeviceSkill = true;
        this.ruleForm.deviceSkillObject = data[0].prodtypeFunctionSubDtoList
          ? data[0].prodtypeFunctionSubDtoList
          : [];
        if (this.ruleForm.deviceSkillObject.length > 0) {
          this.ruleForm.deviceSkillObject.map((item, index) => {
            this.$set(item, "param", "");
            const objName = {
              name: {
                desc: item.description,
                id: item.id,
                required: false,
                value: item.propName,
              },
              value: {
                desc: "",
                required: false,
                value: "",
              },
            };
            console.log(item, "item------");
            if (item.variants) {
              let data;
              if (item.propValType == "enum" || item.propValType == "bool") {
                data = this.isJSON_test(item.variants)
                  ? JSON.parse(item.variants)
                  : [];
                data.map((items) => {
                  if (typeof items.stdValue !== "string") {
                    items.stdValue = items.stdValue + "";
                  }
                });
              } else {
                data = this.isJSON_test(item.variants)
                  ? JSON.parse(item.variants)
                  : "";
              }
              item.variantsList = data;
            }
            if (JSON.stringify(this.editData) === "{}") {
              this.ruleForm.args.push(objName);
            }
            if (JSON.stringify(this.editData) !== "{}") {
              this.$set(
                item,
                "param",
                this.editData.control.args[index].value.value
              );
              this.$set(
                item,
                "require",
                this.editData.control.args[index].value.required
              );
            } else {
              item.require = false;
            }
          });
        } else {
          this.ruleForm.args = [];
        }
      }
      console.log(data, "data------");
    },
    isJSON_test(str) {
      if (typeof str == "string") {
        try {
          var obj = JSON.parse(str);
          console.log("转换成功：" + obj);
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
      console.log(e, index, type);
      if (type === "select") {
        this.ruleForm.deviceSkillObject[index].variantsList.filter((item) => {
          if (item.stdValue === e) {
            this.ruleForm.args[index].value = {
              desc: item.description,
              required: this.ruleForm.deviceSkillObject[index].require,
              value: e,
            };
          }
        });
      } else if (type === "input") {
        this.ruleForm.args[index].value = {
          desc: e,
          required: this.ruleForm.deviceSkillObject[index].require,
          value: e,
        };
      } else {
        this.$set(this.ruleForm.deviceSkillObject[index], "require", e);
        console.log(this.ruleForm.args, "this.ruleForm.args");
        this.ruleForm.args[index].value.required = e;
        this.$forceUpdate();
      }
    },
    resetFormData() {
      this.$refs.diffForm.resetFields();
    },
    // 选择除了设备技能外的命令参数(group,property)
    handleChangeCommad(e) {
      console.log(e, "e----");
      if (e) {
        this.$refs.diffForm.clearValidate("commandParamSelect");
      }
      console.log(this.ruleForm.variantsList, " this.ruleForm.variantsList");
      const data = this.ruleForm.variantsList.filter((item) => {
        return item.stdValue === e;
      });
      this.ruleForm.args[0].value = {
        desc: data[0].description,
        value: e,
        required: this.ruleForm.isRequired,
      };
    },
    // 语音技能参数
    handleSkillChangeCommad(e) {
      if (e) {
        this.$refs.diffForm.clearValidate("commandParamSelect");
      }
      console.log(this.ruleForm.variantsList, " this.ruleForm.variantsList");
      const data = this.ruleForm.variantsList.filter((item) => {
        return item.id === e;
      });
      this.ruleForm.args[0].value = {
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
      console.log(e, "eeeeee");
      let desc;
      if (this.ruleForm.variantsList.unit) {
        desc = e.target.value + this.ruleForm.variantsList.unit;
      } else {
        desc = e.target.value;
      }
      this.ruleForm.args[0].value = {
        desc: desc,
        value: e.target.value,
        required: this.ruleForm.isRequired,
      };
      console.log(this.ruleForm.args[0].value, "this.ruleForm.args[0].value");
    },
    handleChangeInput(e) {
      let desc;
      if (this.ruleForm.variantsList.unit) {
        desc = e.target.value + this.ruleForm.variantsList.unit;
      }
      this.ruleForm.args[0].value = {
        desc: desc || e.target.value,
        value: e.target.value,
        required: this.ruleForm.isRequired,
      };
      console.log(this.ruleForm.args[0].value);
    },
  },
};
</script>
<style lang="scss">
.command-action {
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
  .input-style {
    // width: 88%;
    // width: 150%;
  }
  .input-string {
    width: 100%;
  }
  .el-select,
  .el-textarea {
    width: 100%;
  }
  .my-select-input {
    .command-param {
      display: flex;
      .command-left {
        .el-select {
          width: 50%;
        }
      }
      .command-right {
        flex: 22;
        margin-left: 16px;
        .el-form-item__error {
          // width: 115%;
        }
      }
      .device-unit {
        flex: 1;
        margin-left: 5px;
      }
    }
  }
}
</style>
