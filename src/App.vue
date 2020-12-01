<template>
  <div class="worker-demo">
    <div class="content">
      <div class="input-box">
        <textarea
          v-model="text"
          placeholder="add multiple lines"
          @input="onInput"
        ></textarea>
        <div>
          以换行分割对象，以'，'分割属性
        </div>
      </div>
    </div>
    <div class="content">
      <div class="loading" v-show="loading">
        加载中.....
      </div>
      <div class="output">
        <div v-for="(item, index) in cardList" :key="index" class="card-item">
          <div>Title:{{ item.title }}</div>
          <div>Des:{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cards from '@/utils/cards';
import WorkerQueue from '@/utils/workerQueue';
import { sectionSplice, contentSplice } from '@/utils/handleInput';
export default {
  name: 'App',
  components: {},
  data() {
    return {
      cardList: [],
      text: '',
      operationId: 0,
      myworker: {},
      workerQueue: {},
      loading: false,
      timer: null,
    };
  },
  mounted() {
    this.workerQueue = new WorkerQueue();
  },
  methods: {
    //优化前
    onInput() {
      this.loading = true;
      const temp = sectionSplice(this.text);
      this.cardList = contentSplice(temp).data;
      this.loading = false;
    },
    // vue-worker未加线程数量控制版本
    // onInput() {
    //   if (this.timer) {
    //     clearTimeout(this.timer);
    //     this.timer = setTimeout(() => {
    //       clearTimeout(this.timer);
    //       this.timer = null;
    //     }, 2000);
    //     return;
    //   }
    //   this.loading = true;
    //   const option = [this.text, this.sectionSymbol];
    //   this.workerInput = this.$worker
    //     .run(sectionSplice, option)
    //     .then((res) => {
    //       this.handleCards(res);
    //     })
    //     .catch((e) => console.log(e));
    // },
    // handleCards(data) {
    //   let cardList = [];
    //   this.operationId++;
    //   if (data.length <= 100) {
    //     this.workerCards = this.$worker
    //       .run(contentSplice, [data, this.contentSymbol])
    //       .then((res) => {
    //         this.cardList = res.data;
    //         this.loading = false;
    //       })
    //       .catch((e) => console.log(e));
    //   } else {
    //     let sliceData = data;
    //     if (data.length > 1000) {
    //       sliceData = data.slice(0, 1000);
    //     }
    //     let dataArr = this.Sectioning(sliceData, 50);
    //     let length = dataArr.length;
    //     const operationId = this.operationId;
    //     const cards = new Cards(operationId, length);
    //     for (let i = 0; i < length; i++) {
    //       this.workerCards = this.$worker
    //         .run(contentSplice, [dataArr[i], this.contentSymbol, operationId])
    //         .then((res) => {
    //           cardList = cards.addCards(operationId, res.data);
    //           if (cardList.length > 0) {
    //             this.loading = false;
    //             this.cardList = cardList;
    //           }
    //         })
    //         .catch((e) => console.log(e));
    //     }
    //   }
    // },
    // vue-worker线程数量控制版本
    // onInput() {
    //   if (this.timer) {
    //     clearTimeout(this.timer);
    //     this.timer = setTimeout(() => {
    //       clearTimeout(this.timer);
    //       this.timer = null;
    //     }, 2000);
    //     return;
    //   }
    //   this.loading = true;
    //   this.workerQueue.push(
    //     sectionSplice,
    //     (res) => {
    //       this.handleCards(res);
    //     },
    //     this.text
    //   );
    // },
    handleCards(data) {
      let cardList = [];
      this.operationId++;
      if (data.length <= 100) {
        this.workerQueue.push(
          contentSplice,
          (res) => {
            this.cardList = res.data;
            this.loading = false;
          },
          data,
          this.contentSymbol
        );
      } else {
        let sliceData = data;
        if (data.length > 1000) {
          sliceData = data.slice(0, 1000);
        }
        let dataArr = this.Sectioning(sliceData, 50);
        let length = dataArr.length;
        const operationId = this.operationId;
        const cards = new Cards(operationId, length);
        for (let i = 0; i < length; i++) {
          this.workerQueue.push(
            contentSplice,
            (res) => {
              cardList = cards.addCards(operationId, res.data);
              if (cardList.length > 0) {
                this.loading = false;
                this.cardList = cardList;
              }
            },
            dataArr[i],
            this.contentSymbol,
            operationId
          );
        }
      }
    },
    Sectioning(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)));
      }
      return newArray;
    },
  },
};
</script>

<style>
.worker-demo {
  display: flex;
  justify-content: space-between;
}
.content {
  width: 50%;
  position: relative;
  border: 1px solid #cccccc;
}
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
.output {
  height: calc(100vh - 20px);
  overflow: auto;
}
.card-item {
  padding: 40px;
  border: 1px solid #eeeeee;
}
.loading {
  position: absolute;
  /* top: 30%; */
  left: 50%;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 200px;
  background: #ffffff;
  opacity: 0.6;
  transform: translateX(-50%);
  text-align: center;
}
</style>
