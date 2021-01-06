<script>
  import { Line, mixins } from 'vue-chartjs'
  const { reactiveProp } = mixins


  export default {
    extends: Line,
    name: 'LineChart',
    props: ['chartData', 'options'],
    // props: {
    //   data: {
    //     type: Object,
    //     default: null
    //     },
    //   options: {
    //     type: Object,
    //     default: null
    //     }
    //   },
    mixins: [reactiveProp],
    mounted () {
      console.log("グラフ",this.chartData);
      this.renderChart(this.chartData, this.options)
    },
    watch:{
    chartData(){
      console.log("chart通った");
      this.$data._chart.update()
    },
    options(){
      this.$data._chart.update()
    }
  }
  //   watch: {
  //   chartData () {
  //   this.$data._chart.update()
  // },
  // watch: {
  //   props: function() {
  //       this.renderChart(this.data, this.options);
  //   }
  // },
  // options: function() { 
  //    this._data._chart.destroy(); 
  //    this.renderChart(this.data, this.options); 
  //   } 
  

    // methods: {
    //   Vue.set(this.chartDataSets,this.data, this.options)
    //   reRenderChart() {
    //   this.renderChart(this.data, this.options)
    //  }
    // }
  }
</script>
