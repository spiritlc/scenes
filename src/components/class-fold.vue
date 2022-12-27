<template>
  <div></div>
  <div class="class-fold">
    <div class="fold-title" @click="foldShow = !foldShow">
      {{ name }}
      <div class="icon-fold" :class="{ 'fold-show': !foldShow }">
        <i class="el-icon-arrow-up"></i>
      </div>
    </div>
    <div v-if="foldShow" class="fold-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClassFold",
  props: {
    name: {
      type: String,
      required: true,
      default: "",
    },
    fold: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      foldShow: false,
    };
  },
  created() {
    this.foldShow = this.fold;
  },
};
</script>

<style lang="scss" scoped>
.class-fold {
  width: 100%;
  .fold-title {
    position: relative;
    font-size: 12px;
    color: $default-color;
    padding: 0 48px 0 12px;
    line-height: 36px;
    height: 36px;
    cursor: pointer;
    @include text-ellipsis();
    .icon-fold {
      display: inline-block;
      font-size: 16px;
      height: 36px;
      line-height: 36px;
      position: absolute;
      right: 12px;
      top: 0;
      transition: all 0.3s;
      &.fold-show {
        transform: rotate(180deg);
      }
    }
  }
  .fold-content {
    padding: 5px;
  }
}
</style>
