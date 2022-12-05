<template >
  <div>

    <div class="img33"><img :src="user.img1v1Url" alt="">
    <div>{{user.name}}</div>
    </div>
    <div class="jianjie">
        <div>艺人简介</div>
        <div class="wenzi">{{user.briefDesc}}</div>
    </div>
    <div style="  margin: 2%;  border-bottom: 1px solid;">歌手单曲</div>
    <div>
        <div v-for="(item,index) in songs" :key="item" class="gedan" @click="dianji(item.id)">
      <div style=" color: #D2D2D2;">{{index+1}}</div>
      <div class="xinxi">
        <div class="geming">{{item.name}}</div>
        <div class="geshou">{{item.ar[0].name}}</div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import { ref ,watch} from "vue";
import { useRoute } from "vue-router";
import API from "../plugins/axiosInstance.js";
import { useStore } from "../store/index.js";
export default {
  setup() {
    const user = ref({});
    const route = useRoute();
    const store = useStore();
    const songs=ref([])

    watch(()=>route.query.id,(aa)=>{
        console.log(aa);
       
    API("/artist/top/song?id=" + aa).then(res => {
     songs.value=res.data.songs
    });
    API("/artists?id=" +aa).then(res => {
        console.log(res);
      user.value = res.data.artist;

    });
    },{immediate:true})
    const dianji=(id)=>{
      if(store.musicId==id){
        store.musicId=''
      }
      store.musicId = id;
      
    }
    return{user,songs,dianji}
  }
};
</script>
<style>
.img33{
    margin: 10% auto;
 text-align: center;

}
.img33 img{
border-radius: 50%;
width: 20%;
}
.jianjie{
    margin: 2%;
    box-shadow: 0 0 5px #D2D2D2;
    padding: 2%;
    border-radius: 20px;
}
.wenzi{
    margin-top: 2%;
    font-size: 4px;
    color: rgba(29, 32, 34, 0.27);
  
}
</style>