<template>
  <div id="Schedule">
    <div class="schedule-wrapper" v-for="(schedule, key) in schedules"
         :key="key"
         :style="{
           width: 100 * duration(schedule.start, schedule.end) / duration(start, end) + '%',
           left: 100 * duration(start, schedule.start) / duration(start, end) + '%'
         }">
      <div class="tag" :style="tagStyle(key)" @click="focus(schedule)">
        {{schedule.content}}
      </div>
      <div class="schedule">
        <div v-for="(todo, key) in schedule.todo" :key="key">
          {{todo.content}} {{todo.done}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import {duration} from "@/shared/process";

export default {
  name: "Schedule",
  props:{
    schedules: Array,
    start: String,
    end: String
  },
  setup(props, {emit}){
    let isFocus = false;

    const focus = (schedule)=>{
      if(!isFocus) {
        emit('focusOne', schedule);
      }
      else{
        emit('focusAll');
      }
      isFocus = !isFocus;
    }

    const tagStyle = (i)=>{
      if(i % 2 === 0){
        return {bottom: '100%'};
      }
      else{
        return {top: '100%'};
      }
    }

    return {
      duration,
      focus,
      tagStyle
    }
  }
}
</script>

<style lang="less" scoped>
  #Schedule{
    width: 100%;
    height: 100%;
    .schedule-wrapper{
      position: absolute;
      height: 70%;
      top: 20%;
      .tag{
        cursor: pointer;
        min-width: 100px;
        position: absolute;
        font-size: 50px;
        color: white;
        background-color: dodgerblue;
      }
      .schedule{
        position: absolute;
        width: 100%;
        top: 0;
        height: 100%;
        box-sizing: border-box;
        box-shadow: 0 0 10px black;
        background-color: white;
        transition: width 0.5s;
      }
    }
  }
</style>