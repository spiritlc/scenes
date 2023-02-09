<!--
 * @Descripttion: 
 * @version: 
 * @Author: mry
 * @Date: 2022-03-22 11:16:21
 * @LastEditors: mry
 * @LastEditTime: 2022-05-13 18:11:41
-->
<template>
  <el-form
    ref="diffForm"
    :model="ruleForm"
    class="common-form"
    :rules="rules"
    label-width="100px"
    label-position="top"
  >
    <el-form-item label="免打扰模式" prop="terminalStartHour" class="noDisturb">
      <el-checkbox
        v-model="ruleForm.terminalTime"
        @change="handleChangeTerminalTime"
        >支持</el-checkbox
      >
      <div class="startTime">
        <el-select
          v-model="ruleForm.terminalStartHour"
          style="width: 80px"
          popper-class="selectCustomAttrs"
          placeholder=""
          :disabled="!ruleForm.terminalTime"
        >
          <el-option
            v-for="item in setHour"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <span style="margin: 0 5px">时</span>
        <el-select
          v-model="ruleForm.terminalStartMinutes"
          style="width: 80px"
          popper-class="selectCustomAttrs"
          placeholder=""
          :disabled="!ruleForm.terminalTime"
        >
          <el-option
            v-for="item in setMinutes"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <span style="margin-left: 5px">分</span>
      </div>
      <div class="endTime">
        <el-select
          v-model="ruleForm.terminalEndHour"
          style="width: 80px"
          popper-class="selectCustomAttrs"
          placeholder=""
          :disabled="!ruleForm.terminalTime"
        >
          <el-option
            v-for="item in setHour"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <span style="margin: 0 5px">时</span>
        <el-select
          v-model="ruleForm.terminalEndMinutes"
          style="width: 80px"
          popper-class="selectCustomAttrs"
          placeholder=""
          :disabled="!ruleForm.terminalTime"
        >
          <el-option
            v-for="item in setMinutes"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <span style="margin-left: 5px">分</span>
      </div>
    </el-form-item>
    <el-form-item label="间隔时间" prop="intervalHours" class="noDisturb">
      <el-checkbox
        v-model="ruleForm.intervalTime"
        @change="handleChangeTntervalTime"
        >支持</el-checkbox
      >
      <el-select
        v-model="ruleForm.intervalHours"
        class="startTime"
        placeholder=""
        style="width: 100px"
        popper-class="selectCustomAttrs"
        :disabled="!ruleForm.intervalTime"
      >
        <el-option
          v-for="item in setIntervalHour"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
      <el-select
        v-model="ruleForm.intervalMinutes"
        placeholder=""
        style="width: 100px; margin-left: 15px"
        popper-class="selectCustomAttrs"
        :disabled="!ruleForm.intervalTime"
      >
        <el-option
          v-for="item in setIntervalMinutes"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="终端类型" prop="terminalType">
      <el-select
        v-model="ruleForm.terminalType"
        multiple
        placeholder="请选择终端类型"
        popper-class="selectCustomAttrs"
        style="width: 100%"
      >
        <el-option
          v-for="item in terminalTypeList"
          :key="item.configCode"
          :label="item.description"
          :value="item.configCode"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="弹窗类型" prop="toastType">
      <el-select
        v-model="ruleForm.toastType"
        placeholder="请选择弹窗类型"
        popper-class="selectCustomAttrs toast-maxwidth"
        style="width: 100%"
      >
        <el-option
          v-for="item in toastTypeList"
          :key="item.configCode"
          :label="item.description"
          :value="item.configCode"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="消息优先级" prop="messagePriority">
      <el-select
        v-model="ruleForm.messagePriority"
        style="width: 100%"
        popper-class="selectCustomAttrs"
        placeholder=""
      >
        <el-option
          v-for="item in messagePriorityList"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="消息标题" style="width: 100%" prop="messageTitle">
      <el-input
        v-model="ruleForm.messageTitle"
        placeholder="请输入推送标题，最多20字符"
        maxlength="20"
      />
    </el-form-item>
    <el-form-item label="消息内容" style="width: 100%" prop="messageContent">
      <el-input
        v-model="ruleForm.messageContent"
        placeholder="请输入推送内容，最多20字符"
        maxlength="20"
      />
    </el-form-item>
    <el-form-item class="tag">
      <p class="tip-title">
        <img src="../../../assets/images/tips.png" alt="" class="tip-image" />
        <span class="tip-name">注释</span>
      </p>
      <p class="tip-content">
        支持参数类型：${device.nickname} 设备昵称
        支持编辑带参数的消息，消息内容如需要插入参数，直接将参数粘贴到消息内。例如：“您好！您的${device.nickname}检测到漏水，请及时处理”
      </p>
    </el-form-item>
  </el-form>
</template>

<script>
import { iotRequest } from "@/infrastructure/apis/api";
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
        terminalTime: false,
        terminalStartHour: "00",
        terminalStartMinutes: "00",
        terminalEndHour: "00",
        terminalEndMinutes: "00",
        intervalTime: false,
        intervalHours: "0h",
        intervalMinutes: "10min",
        terminalType: [],
        toastType: "",
        messagePriority: "1",
        messageTitle: "",
        messageContent: "",
      },
      source: this.$route.query.source || "", // 场景模板来源
      rules: {
        terminalStartHour: [
          { required: true, message: "请选择免打扰模式", trigger: "change" },
        ],
        intervalHours: [
          { required: true, message: "请选择间隔时间", trigger: "change" },
        ],
        terminalType: [
          { required: true, message: "请选择终端类型", trigger: "change" },
        ],
        toastType: [
          { required: true, message: "请选择弹窗类型", trigger: "change" },
        ],
        messageTitle: [
          { required: true, message: "请输入消息标题", trigger: "blur" },
        ],
        messageContent: [
          { required: true, message: "请输入消息内容", trigger: "blur" },
        ],
      },
      terminalTypeList: [],
      toastTypeList: [],
      messagePriorityList: [
        {
          key: "0",
          value: "紧急消息",
        },
        {
          key: "1",
          value: "一般消息",
        },
        {
          key: "2",
          value: "中级消息",
        },
        {
          key: "3",
          value: "低级消息",
        },
      ],
      setHour: [],
      setMinutes: [],
      setIntervalHour: [],
      setIntervalMinutes: [],
    };
  },
  mounted() {
    console.log(1111);
    this.getTerminalType();
    this.getToastType();
    this.setHour = getHMSfunc.initHMS(24, true);
    this.setMinutes = getHMSfunc.initHMS(60, true);
    this.setIntervalHour = this.handleSetIntervalHour();
    this.setIntervalMinutes = this.handleSetIntervalMinutes(60);
    if (JSON.stringify(this.singData) !== "{}") {
      const data = this.singData.pushMessage.msgStrategy;
      if (data.maxCount === undefined) {
        console.log(
          this.singData.pushMessage.msgStrategy,
          "this.singData.pushMessage.msgStrategy"
        );
        const startime =
          this.singData.pushMessage.msgStrategy.notWorkTimeStart &&
          this.singData.pushMessage.msgStrategy.notWorkTimeStart.length > 0
            ? this.singData.pushMessage.msgStrategy.notWorkTimeStart.split(":")
            : "";
        this.ruleForm.terminalStartHour =
          typeof startime == "object" ? startime[0] : "00";
        this.ruleForm.terminalStartMinutes =
          typeof startime == "object" ? startime[1] : "00";
        const endTime =
          this.singData.pushMessage.msgStrategy.notWorkTimeEnd &&
          this.singData.pushMessage.msgStrategy.notWorkTimeEnd.length > 0
            ? this.singData.pushMessage.msgStrategy.notWorkTimeEnd.split(":")
            : "";
        this.ruleForm.terminalEndHour =
          typeof endTime == "object" ? endTime[0] : "00";
        this.ruleForm.terminalEndMinutes =
          typeof endTime == "object" ? endTime[1] : "00";
        if (
          (this.singData.pushMessage.msgStrategy.notWorkTimeStart &&
            this.singData.pushMessage.msgStrategy.notWorkTimeStart.length >
              0) ||
          (this.singData.pushMessage.msgStrategy.notWorkTimeEnd &&
            this.singData.pushMessage.msgStrategy.notWorkTimeEnd.length > 0)
        ) {
          this.ruleForm.terminalTime = true;
        } else {
          this.ruleForm.terminalTime = false;
        }
        this.handleDealTime(this.singData.pushMessage.msgStrategy.timeInterval);
      } else if (data.maxCount == null) {
        this.ruleForm = {
          terminalTime: false,
          terminalStartHour: "00",
          terminalStartMinutes: "00",
          terminalEndHour: "00",
          terminalEndMinutes: "00",
          intervalTime: false,
          intervalHours: "0h",
          intervalMinutes: "10min",
        };
      }
      this.$set(
        this.ruleForm,
        "messageTitle",
        this.singData.pushMessage.pushContent.msgTitle
      );
      this.$set(
        this.ruleForm,
        "messageContent",
        this.singData.pushMessage.pushContent.msgContent
      );
      this.$set(
        this.ruleForm,
        "messagePriority",
        this.singData.pushMessage.priority.toString()
      );
      // this.ruleForm.messageTitle = this.singData.pushMessage.pushContent.msgTitle
      // this.ruleForm.messageContent = this.singData.pushMessage.pushContent.msgContent
      // this.ruleForm.messagePriority = this.singData.pushMessage.priority.toString()
      this.handleDealShowTypes(this.singData.pushMessage.showTypes);
    }
  },
  methods: {
    // 获取终端类型数据
    getTerminalType() {
      let url;
      if (this.source === "southeastAsia") {
        url = "/developerportal/dny/developer/config/getConfigType";
      } else {
        url = "/developerportal/developer/config/getConfigType";
      }
      iotRequest("post", url, {
        configParentCode: "pushTerminalType",
      }).then((res) => {
        if (res.retCode == "00000") {
          this.terminalTypeList = res.data;
        }
      });
    },
    // 获取弹框类型数据
    getToastType() {
      let url;
      if (this.source === "southeastAsia") {
        url = "/developerportal/dny/developer/config/getConfigType";
      } else {
        url = "/developerportal/developer/config/getConfigType";
      }
      iotRequest("post", url, {
        configParentCode: "pushShowType",
      }).then((res) => {
        if (res.retCode == "00000") {
          this.toastTypeList = res.data;
        }
      });
    },
    // 重置数据
    resetFormData() {
      this.$refs.diffForm.resetFields();
    },
    // 间隔时间---小时
    handleSetIntervalHour() {
      const data = getHMSfunc.initHMS(24);
      return data.map((item) => {
        return (item = item + "h");
      });
    },
    // 间隔时间--分钟
    handleSetIntervalMinutes(num) {
      const flag = [];
      for (let i = 0; i < num; i += 2) {
        flag.push(i.toString() + "min");
      }
      return flag;
    },
    // 处理时间
    handleDealTime(time) {
      if (time == null) {
        return;
      }
      const hour = parseInt(time / 60);
      this.ruleForm.intervalHours = parseInt(time / 60).toString() + "h";
      this.ruleForm.intervalMinutes =
        parseInt(time - hour * 60).toString() + "min";
      if (time !== null) {
        this.ruleForm.intervalTime = true;
      } else {
        this.ruleForm.intervalTime = false;
      }
    },
    // 处理终端类型&&弹窗类型
    handleDealShowTypes(param) {
      const data = [];
      for (let i in param) {
        data.push(i);
        this.$set(this.ruleForm, "toastType", param[i]);
        // this.ruleForm.toastType = param[i]
      }
      this.$set(this.ruleForm, "terminalType", data);
      // this.ruleForm.terminalType = data
    },
    // 免打扰模式取消选中，数据重置
    handleChangeTerminalTime(e) {
      if (!e) {
        this.ruleForm.terminalStartHour = "00";
        this.ruleForm.terminalStartMinutes = "00";
        this.ruleForm.terminalEndHour = "00";
        this.ruleForm.terminalEndMinutes = "00";
      }
    },
    // 间隔时间取消选中，数据重置
    handleChangeTntervalTime(e) {
      if (!e) {
        this.ruleForm.intervalHours = "0h";
        this.ruleForm.intervalMinutes = "10min";
      }
    },
  },
};
</script>
<style lang="scss">
.noDisturb {
  .el-form-item__content {
    display: flex;
  }
  .startTime,
  .endTime {
    margin-left: 16px;
  }
}
.tag {
  margin-top: -12px;
  width: 100%;
  background: #f4f5f9;
  border-radius: 4px;
  padding: 16px;
  .tip-title {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    color: #3d485d;
    line-height: 19px;
    .tip-image {
      width: 21px;
      margin-right: 4px;
    }
  }
  .tip-content {
    margin-top: 8px;
    font-size: 14px;
    font-family: AlibabaPuHuiTi_2_55_Regular;
    color: #98a3b7;
    line-height: 21px;
  }
}
.toast-maxwidth {
  .el-select-dropdown__item span {
    max-width: 490px;
  }
}
</style>
