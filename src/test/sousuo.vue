<template>
    <div>
        <van-search
  v-model="value"
  show-action
  label="歌名"
  placeholder="请输入歌曲"
  @search="onSearch"

>
  <template #action>
    <div @click="onSearch">搜索</div>
  </template>
</van-search> 
<div v-for="(item,index) in songs" :key="item" class="gedan" @click="dianji(item.id)">
      <div style=" color: #D2D2D2;">{{index+1}}</div>
      <div class="xinxi">
        <div class="geming">{{item.name}}</div>
        <div class="geshou">{{item.ar[0].name}}</div>
      </div>
    </div>
  </div>
 
</template>
  <script>
import { reactive, ref } from "vue";
import API from "../plugins/axiosInstance.js";
import { useRoute } from "vue-router";
import { watch } from "vue";
import { useStore } from "../store";
export default {
  setup() {
    const mainstore = ref({});
    const value=ref("")
    const store =useStore()
    const songs=ref([])
    const dianji=(id)=>{
      if(store.musicId==id){
        store.musicId=''
      }
      store.musicId = id;
      
    }
    const onSearch=()=>{
      API({
      url: "/search?keywords=" + value.value,
      method: "GET"
    }).then(res => {
    

      songs.value= res.data.result.songs.map(res => {

        let b = "";
        for (let i = 0; i < res.ar.length; i++) {
       
          if (i == res.ar.length - 1) {
            b += res.ar[i].name;
          } else {
            b += res.ar[i].name + "/";
          }
        }
        res.ar[0].name = b;
        res.dt= Math.floor(res.dt / 1000 / 60) +
          ":" +
          ((res.dt / 1000 / 60 - Math.floor(res.dt / 1000 / 60)) * 60).toFixed(
            0
          ) +
          "分";
        return res;
      });
    });
    }
    return {
      mainstore,
      value,
      onSearch,
      songs,
      dianji
    };
  }
};
</script>
<style>
.gedan {
  margin: 2%;
  display: flex;
  align-items: center;
}
.geshou {
  font-size: 8px;
  color: #d2d2d2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.xinxi {
  margin: 2%;
}
</style>