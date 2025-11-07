const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      result: 0
    };
  },
  methods: {
    add(num) {
      console.log("counter = " + this.counter);
    }
  }
});

app.mount('#root');