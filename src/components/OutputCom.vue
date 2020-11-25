<template>
  <div class="output">
    <div v-for="(item, index) in cardList" :key="index" class="card-item">
      <div>Title:{{ item.title }}</div>
      <div>Des:{{ item.des }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OutputCom',
  props: ['cardList'],
  components: {},
  data() {
    return {
      cardList: [{ id: '1', title: 'asd', des: '1' }],
    };
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>
<style rel="stylesheet/scss" lang="css" scoped>
.output {
  padding: 20px;
}
.card-item {
  padding: 40px;
  border: 1px solid #eeeeee;
}
</style>
