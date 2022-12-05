<template>
  <div>
    <div style="   display: flex;     justify-content: space-around;">
      <div class="imga">
        <img style :src="gedan.coverImgUrl" alt />
      </div>
      <div class="wenben">
        {{gedan.name}}
        <div>
          风格:
          <div class="fengge" v-for="item in gedan.tags" :key="item.id">{{ item }}</div>
        </div>

        <div class="jianji">简介： {{gedan.description}}</div>
      </div>
    </div>

    <div v-for="(item,index) in songs" :key="item" class="gedan" @click="dianji(index)">
      <div style=" color: #D2D2D2;">{{index+1}}</div>
      <div class="xinxi">
        <div class="geming">{{item.name}}</div>
        <div class="geshou">{{item.ar[0].name}}</div>
      </div>
    </div>
  </div>
</template>
    <script>
import { ref } from "vue";
import { useStore } from "../store/index.js";
import { useRoute } from "vue-router";
import API from "../plugins/axiosInstance.js";
export default {
  setup() {
    const router = useRoute();
    const gedan = ref({});
    const songs = ref([]);
    const store = useStore();
    if(store.jishu==0){
      store.jishu=-1
    }
 
    const dianji=(id)=>{
      
      store.songslist=[]
      songs.value.filter(res=>{
        store.songslist.push(res.id)
        store.jishu=id
      })
   
    }
    API({
      url: "/playlist/detail?id=" + router.query.id,
      method: "GET"
    }).then(res => {
      gedan.value = res.data.playlist;
    });
    API({
      url: "/playlist/track/all?id=" + router.query.id,
      method: "GET"
    }).then(res => {
      songs.value = res.data.songs.map(res => {
        let b = "";
        for (let i = 0; i < res.ar.length; i++) {
          if (i == res.ar.length - 1) {
            b += res.ar[i].name;
          } else {
            b += res.ar[i].name + "/";
          }
        }
        res.ar[0].name = b;

        res.dt =
          Math.floor(res.dt / 1000 / 60) +
          ":" +
          ((res.dt / 1000 / 60 - Math.floor(res.dt / 1000 / 60)) * 60).toFixed(
            0
          ) +
          "分";
        return res;
      });
    });

    return {
      gedan,
      songs,
      store,
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
}
.xinxi {
  margin: 2%;
}
.imga{
  width: 30%;
  margin-left: 5%;
  padding-top: 20px;
}
.imga img {
  width: 100%;
  height: 100%;
}
.wenben {
  line-height: 15px;
  width: 45%;
  padding-top: 20px;
  font-size: 8px;
}
.fengge {
  display: inline-block;
  margin: 2px;
  margin-top: 10%;
  font-size: 12px;
  border: 1px solid #d2d2d2;
  border-radius: 20px;
  text-align: center;
  width: 40px;
}

.jianji {
  font-size: 8px;
  margin-top: 10%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>