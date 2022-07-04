<template>
  <div id="Background"
       :style="{
          width: 100 * process + '%',
          height: '100%',
          backgroundColor: bgColor,
          opacity: opacity
        }">
    {{now}}
  </div>
</template>

<script>
/* eslint-disable */
import {ref, toRefs, reactive, watch} from 'vue';
import {duration, TIME_FORMAT, TIME_VERBOSE_FORMAT} from "@/shared/process";
import dayjs from "dayjs";

export default {
  name: "Background",
  props:{
    start: String,
    end: String
  },
  setup(props){
    const getProcess = ()=>{
      return Math.min(1, Math.max(0, duration(props.start) / duration(props.start, props.end)));
    }

    const now = ref(dayjs().format(TIME_VERBOSE_FORMAT));
    const process = ref(getProcess());

    watch(props, ()=>{process.value = getProcess();});

    const bgStyle = reactive({
      bgColor: 'green',
      opacity: 0.3
    });

    setInterval(()=>{
      process.value = getProcess();
      now.value = dayjs().format(TIME_VERBOSE_FORMAT);
    }, 1000);

    return {
      ...toRefs(bgStyle),
      process,
      now
    }
  },
}
</script>

<style lang="less" scoped>
  @keyframes twinkle {
    0%{
      opacity: 0.6;
    }
    50%{
      opacity: 0.5;
    }
    100%{
      opacity: 0.6;
    }
  }  

  #Background{
    position: absolute;
    top: 0;
    left: 0;
    animation-name: twinkle;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    transition: width 0.5s;
    font-size: 50px;
    color: white;
    text-align: right;
  }
</style>