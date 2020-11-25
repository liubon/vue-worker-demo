<template>
  <div class="input-box">
    <textarea
      v-model="text"
      placeholder="add multiple lines"
      @input="onInput"
    ></textarea>
    <div class="split-Symbol">
      <div class="split-section">
        <div>段落</div>
        <input type="radio" id="section0" value="0" v-model="sectionSymbol" />
        <label for="section0">新一行</label>
        <br />
        <input type="radio" id="section1" value="1" v-model="sectionSymbol" />
        <label for="section1">分号</label>
        <br />
      </div>
      <div class="split-card">
        <div>内容</div>
        <input type="radio" id="content0" value="0" v-model="contentSymbol" />
        <label for="content0">Tab</label>
        <br />
        <input type="radio" id="content1" value="1" v-model="contentSymbol" />
        <label for="content1">逗号</label>
        <br />
      </div>
    </div>
    <div>
      <button>提交</button>
    </div>
  </div>
</template>
<script>
import { sectionSplice, contentSplice } from '@/utils/handleInput';
export default {
  name: 'InputCom',
  components: {},
  data() {
    return {
      text: '',
      operationId: 0,
      sectionSymbol: 0,
      contentSymbol: 0,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    onInput() {
      const sectionArr = sectionSplice(this.text, this.sectionSymbol);
      const res = contentSplice(
        sectionArr,
        this.contentSymbol,
        this.operationId
      );
      this.$emit('putCard', res);
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="css" scoped>
.input-box {
  /* width: 80%; */
  margin: 10%;
  text-align: center;
}
textarea {
  width: 80%;
  height: 200px;
}
button {
  width: 160px;
  height: 40px;
  font-size: 22px;
}
.split-Symbol {
  display: flex;
}
.split-section,
.split-card {
  width: 50%;
}
</style>
