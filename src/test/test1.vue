<template>
  <div>
    <van-swipe class="my-swipe" touchable="" :autoplay="3000" indicator-color="white" >
      <van-swipe-item v-for="item in imgs" :key="item" @click="tiao(item.targetId)">
        <img  class="img" :src="item.imageUrl" />
      </van-swipe-item>
    </van-swipe>
    <div class="tuijian">推荐歌单</div>
    <div ref="root" />
    <div class="gedian">
      <div v-for="item in playlists" :key="item.id" class="imgs">
        <div @click="songslist(item.id)" class="imgi">
          <img :src="item.picUrl" alt />
        </div>

        <div class="listName">{{ item.name }}</div>
        <div class="playcount">{{item.playCount}}</div>
      </div>
    </div>
  </div>
</template>
  <script>
import { ref } from "vue";
import { useStore } from "../store/index.js";
import { useScrollParent, useEventListener } from '@vant/use';
import API from "../plugins/axiosInstance.js";
import { useRouter } from "vue-router";
export default {
  setup() {
    const route=useRouter()
    const playlists = ref([]);
    const store=useStore()
    const mainstore = ref({});
    const imgs = ref([]);
    const root = ref();
 
    console.log(navigator.userAgent.match(/(iPhone|Android|iPad)/i));
    const songslist=(id)=>{
      
      route.push({
        name:"gedan",
        query: {
        id: id
  }
      })
    }
 
    API({
      url: "/banner?type=0",
      method: "GET"
    }).then(res => {

      imgs.value = res.data.banners;
    });
    API({
      url: "personalized?limit=8",
      method: "GET"
    }).then(res => {
     
      playlists.value = res.data.result.map(item => {
        if (item.playCount > 10000 && item.playCount < 100000000) {
          item.playCount = Math.floor(item.playCount / 10000);
          item.playCount = item.playCount + "万";
        } else if (item.playCount > 100000000) {
          Math.floor(item.playCount / 100000000);
          item.playCount =Math.floor( item.playCount/100000000) + "亿";
        }
        return item;
      });
    
    });
    const tiao=(id)=>{

      if(id!=0){
        store.musicId = id;
   
      }
     
    }
    return {
      mainstore,
      imgs,
      root ,
      playlists,
      songslist,
      tiao,
      store
    };
  }
};
</script>
<style>
.img{
  width: 100%;
 
}
.my-swipe{

  width: calc(100% - 10% );
  height: calc(40% - 20px);
margin: 0 auto;
border-radius: 20px;
overflow: hidden;
}
.tuijian{
  margin: 20px;
  border-bottom: 1px solid ;
}
.gedian{
  overflow-x: scroll;
  white-space: nowrap;
}
.imgs{
  display: inline-block;
  width: 30%;
  border-radius: 20px;
  position: relative;
  margin: 2%;
  box-sizing: border-box;
  box-shadow: 0 0 5px #D2D2D2;
}
.imgs img {
  border-radius: 20px 20px 0px 0;
  overflow: hidden;
  width: 100%;
  height: 100%


}
.listName{
  font-size: 8px;
  width: calc(100% - 2px);
  overflow: hidden;
  text-overflow: ellipsis;

}
.playcount{
  width: 40px;
  font-size: 8px;
  text-align: center;
  position:absolute;
  color: #d2d2d2;
  top: 0px;
  right: 2px;
}

</style>