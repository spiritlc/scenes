<template>
  <div class="node " :class="status">
    <img :src="imgCot.logo" alt="">
    <span class="label">{{ label }}</span>
    <span class="status">
      <img :src="imgCot[status]" alt="">
    </span>
  </div>
</template>

<script>

export default {
  name: 'condition',

  inject: ['getGraph', 'getNode'],
  data() {
    return {
      status: 'logo',
      label: '',
      imgCot: {
        logo: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*evDjT5vjkX0AAAAAAAAAAAAAARQnAQ',
        success:
            'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*6l60T6h8TTQAAAAAAAAAAAAAARQnAQ',
        failed:
            'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SEISQ6My-HoAAAAAAAAAAAAAARQnAQ',
        running:
            'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*t8fURKfgSOgAAAAAAAAAAAAAARQnAQ'
      }
    }
  },
  mounted() {
    const self = this
    const node = this.getNode()
    this.label = node.data.label

    // 监听数据改变事件
    node.on('change:data', ({current}) => {
      self.label = current.label
      self.status = current.status
    })
  }
}
</script>
<style xml:lang="scss" scoped>

.node {
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 50%;
  background: #ccecc0;;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}

img {
  width: 20px;
}

p {
  color: #ffffff;
  font-size: 16px;
  overflow: hidden;
  display: contents;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
