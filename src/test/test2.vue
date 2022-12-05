<template>
  <div>
    <van-card
    v-for="item in toplist"
    :key="item"
      :desc="item.description"
      @click="dianji(item.id)"
      :thumb="item.coverImgUrl"
    >
    <template #title>
      <p class="name">{{item.name}}</p>
      <p class="updateFrequency">{{item.updateFrequency}}</p>
  </template>
   </van-card>
  </div>
</template>
    <script>
import { ref } from "vue";
import { useStore } from "../store/index.js";
import { useRouter } from "vue-router";
import API from "../plugins/axiosInstance.js";
export default {
  setup() {
    const mainstore = ref({});
    const route = useRouter();
    const toplist=ref([])
  
    API({
      url: "/toplist"
    }).then(res => {
      toplist.value=res.data.list;
    });
    const dianji=id=>{

      route.push({
        name:"gedan",
        query: {
        id: id
  }
      })
    }
    return {
      mainstore,
      route,
      toplist,
      dianji
    };
  }
};
</script>
<style>
.name{
  font-size: 20px;
  color: black;
  display: inline-block;
}
.updateFrequency{
  display: inline-block;
  position: absolute;
  right: 10px;
}
</style>