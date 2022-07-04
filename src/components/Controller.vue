<template>
  <background
      :start="start"
      :end="end"></background>
  <schedule
      :start="start"
      :end="end"
      :schedules="schedules"
      @focusOne="focusOne"
      @focusAll="focusAll"></schedule>
</template>

<script>
/* eslint-disable */
import Background from "@/components/Background";
import {reactive, ref} from "vue";
import Schedule from "@/components/Schedule";
export default {
  name: "Controller",
  components: {Schedule, Background},
  setup(){
    const originSchedules = [
      {content: '起床', start: '08:00', end: '08:30'},
      {content: '数学', start: '08:30', end: '12:30', todo: []},
      {content: '午休', start: '12:30', end: '13:30'},
      {content: '数模', start: '13:30', end: '18:00'},
      {content: '运动', start: '18:00', end: '18:30'},
      {content: '晚休', start: '18:30', end: '19:00'},
      {content: '计算机',start:  '19:00',end: '23:59'},
      // {content: '睡眠', start: '00:00', end: '08:00'},
    ];

    const schedules = reactive(originSchedules.slice());

    const start = ref('00:00');
    const end = ref('23:59');

    const focusOne = (schedule)=>{
      schedules.splice(0, schedules.length, schedule);
      start.value = schedule.start;
      end.value = schedule.end;
    }

    const focusAll = ()=>{
      schedules.splice(0, 1, ...originSchedules);
      start.value = '00:00';
      end.value = '23:59';
    }

    return {
      schedules,
      start,
      end,
      focusOne,
      focusAll
    }
  }
}
</script>

<style scoped>

</style>