<template>
  <div>
    <van-nav-bar @click-left="tuihui" title="蜘蛛音乐" left-arrow>
      <template #right>
        <van-icon @click="search" name="search" size="18" />
      </template>
    </van-nav-bar>
    <router-view></router-view>
    <div class="dibu">
      <div class="cc">
        <van-swipe class="musie" @change="huadong">
          <van-swipe-item v-for="item in 3" :key="item" indicator-color="white">
            <div class="qq">
              <div class="aa">
                <div @click.native="xiangqin(music.id)">
                  <img
                    class="music-disk-picture"
                    :class="{'music-disk-playing-style': ! store.bofang}"
                    :src="url"
                  />
                </div>
                <div class="geming1">{{music.name}}</div>
                <div class="geshou1">{{music.ar}}</div>
              </div>
              <div class="zanting">
                <svg
                  t="1668855558863"
                  class="icon"
                  v-if=" store.bofang"
                  @click="bofang"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2950"
                  width="40"
                  height="40"
                >
                  <path
                    d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z"
                    p-id="2951"
                  />
                  <path
                    d="M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z"
                    p-id="2952"
                  />
                </svg>
                <svg
                  t="1668855406828"
                  class="icon"
                  viewBox="0 0 1048 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2682"
                  @click="bofang"
                  v-else
                  width="40"
                  height="40"
                >
                  <path
                    d="M524.272128 0.018022C241.513165 0.018022 12.288102 229.245952 12.288102 512.005018c0 112.734003 36.43904 216.957952 98.17897 301.537997l38.667981-40.258048C97.458176 699.230003 67.143168 609.158963 67.143168 512.005018 67.143168 259.540992 271.807078 54.872986 524.272128 54.872986c252.45696 0 457.120973 204.668006 457.120973 457.132032 0 252.460954-204.664013 457.118003-457.120973 457.118003-96.240026 0-185.530982-29.744026-259.189043-80.53504l-34.539008 42.797978c83.150029 58.344038 184.437965 92.596019 293.728973 92.596019 282.758963 0 511.984026-229.220966 511.984026-511.976038C1036.256154 229.245952 807.031091 0.018022 524.272128 0.018022zM615.693107 256.011981l0 511.987 54.855 0L670.548107 256.012 615.693128 256.012zM377.996083 256.011981l0 511.987 54.855 0L432.851083 256.012 377.996128 256.012z"
                    p-id="2683"
                  />
                </svg>
              </div>
            </div>
          </van-swipe-item>
          <template #indicator="{}"></template>
        </van-swipe>
      </div>
      <van-tabbar v-model="active" class="tabbar">
        <van-tabbar-item @click="shouye" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item @click="paihangbang" icon="search">排行榜</van-tabbar-item>
        <van-tabbar-item @click="chengyun" icon="more-o">成员介绍</van-tabbar-item>
        <van-tabbar-item @click="user" icon="friends-o">个人中心</van-tabbar-item>
      </van-tabbar>
    </div>
    <van-popup
      v-model:show="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
    <van-popup
  v-model:show="show3"

  position="bottom"
    class="show3"
  :style="{ height: '30%' }"
>
<div style="  margin:2% ;">
  <div style=" font-size: 10px;   color: #999;">该歌曲有多个歌手</div>
    <div class="geshoux">
      <div class="geshouitem" @click="tiaozhianggeshou(item.id)" v-for="item in store.singers" :key="item" >{{item.name}}</div>
    </div>
</div>

</van-popup>
    <div class="geming2">{{music.name}}</div>
    <div @click="geshou" class="geshou2">歌手：{{music.ar}}</div>
      <div class="cipan" v-if="panduan" @click="dianji" >
        <img
          src="./static/needle-ab.png"
          class="img_cz"
          :class="{ img_cz_active: !store.bofang}"
          alt
        />
        <img src="./static/d7e4e3a244701ee85fecb5d4f6b5bd57.png" class="img_cp" alt />
        <img
          :src="url"
          class="img_dt"
          :class="!store.bofang ? 'img_dt_active' : 'img_dt_paused'"
          alt
        />
      </div>

     
     
        <div class="content" v-else @click="dianji" >
        <el-scrollbar ref="scrollbarRef" height="400px">
          <p
            v-for="item in arr"
            :key="item"
            :class="{active:(currentime*1000>=item.time&&currentime*1000<item.per)}"
          >{{ item.lrc }}</p>
        </el-scrollbar>
      </div>
      
      <div>
      
        <div class="range">
          <el-slider
            v-model="playTime"
            :format-tooltip="tooltipFormat"
            size="small"
            :max="sliderLength"
            @change="changePlayTime"
          />
        </div>
      </div>
      <div class="bofang">
        <svg
          t="1668856763461"
          class="icon"
          @click="lastButtonClick"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4288"
          width="40"
          height="40"
        >
          <path
            d="M803.584 134.592c-18.176-10.048-39.936-10.112-58.112 0L192 443.008l0-282.88c0-17.664-14.336-32-32-32S128 142.464 128 160.128l0 344.896C127.744 507.2 127.104 509.248 127.104 511.488S127.744 515.84 128 518.016l0 346.112c0 17.664 14.336 32 32 32s32-14.336 32-32L192 579.968l553.408 308.352C754.56 893.44 764.48 896 774.528 896s19.968-2.56 29.056-7.616c18.176-10.112 28.992-28.224 28.992-48.576L832.576 183.104C832.576 162.88 821.76 144.768 803.584 134.592zM768.192 829.248 198.016 511.488 771.328 192 768.192 829.248z"
            p-id="4289"
          />
        </svg>
        <div class="zanting">
          <svg
            t="1668855558863"
            class="icon"
            v-if=" store.bofang"
            @click="bofang"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2950"
            width="40"
            height="40"
          >
            <path
              d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z"
              p-id="2951"
            />
            <path
              d="M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z"
              p-id="2952"
            />
          </svg>
          <svg
            t="1668855406828"
            class="icon"
            viewBox="0 0 1048 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2682"
            @click="bofang"
            v-else
            width="40"
            height="40"
          >
            <path
              d="M524.272128 0.018022C241.513165 0.018022 12.288102 229.245952 12.288102 512.005018c0 112.734003 36.43904 216.957952 98.17897 301.537997l38.667981-40.258048C97.458176 699.230003 67.143168 609.158963 67.143168 512.005018 67.143168 259.540992 271.807078 54.872986 524.272128 54.872986c252.45696 0 457.120973 204.668006 457.120973 457.132032 0 252.460954-204.664013 457.118003-457.120973 457.118003-96.240026 0-185.530982-29.744026-259.189043-80.53504l-34.539008 42.797978c83.150029 58.344038 184.437965 92.596019 293.728973 92.596019 282.758963 0 511.984026-229.220966 511.984026-511.976038C1036.256154 229.245952 807.031091 0.018022 524.272128 0.018022zM615.693107 256.011981l0 511.987 54.855 0L670.548107 256.012 615.693128 256.012zM377.996083 256.011981l0 511.987 54.855 0L432.851083 256.012 377.996128 256.012z"
              p-id="2683"
            />
          </svg>
        </div>

        <svg
          t="1668856826950"
          class="icon"
          viewBox="0 0 1024 1024"
          @click="nextButtonClick"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5051"
          width="40"
          height="40"
        >
          <path
            d="M832 160.128c0-17.664-14.336-32-32-32S768 142.464 768 160.128l0 282.88L214.592 134.592c-18.176-10.112-39.936-10.048-58.112 0C138.24 144.768 127.424 162.88 127.424 183.168l0 656.64c0 20.224 10.816 38.464 29.056 48.576C165.568 893.44 175.488 896 185.472 896s19.968-2.56 29.056-7.616L768 579.968l0 284.096c0 17.664 14.336 32 32 32s32-14.336 32-32L832 160.128zM191.808 829.248 188.672 192l573.312 319.488L191.808 829.248z"
            p-id="5052"
          />
        </svg>
      </div>
    </van-popup>
    <audio ref="musicAudio" preload="auto" @canplay="changeDuration">
      <source ref="musicSource" type="audio/mpeg" />
    </audio>
  </div>
</template>
<script>
import { ref, watch, reactive, onMounted } from "vue";
import { useStore } from "./store";
import { useRouter } from "vue-router";
import API from "../src/plugins/axiosInstance.js";

export default {
  setup() {
    const playTime = ref(0.0);
    const panduan=ref(false)
    const show = ref(false);
    const musicCursor = ref(0);
    //是否静音
    const voiceMute = ref(false);
    const list = ref([]);
    //音量大小
    const voicePower = ref(0.5);
    //歌曲的时间长度
    const playDuration = ref(0.0);

    //进度条长度
    const sliderLength = ref(100);
    const jishiqi = reactive({
      timeInter: null
    });

    const url = ref("src/static/5651d19798154fda8fd2cda8454cdd4a.png");
    const music = ref({});
    const store = useStore();
    //实现音乐播放的标签
    const musicSource = ref(null);
    //播放器标签
    const musicAudio = ref(null);
    //是否正在播放
    const biaozhi = ref(true);
    const router = useRouter();
    const active = ref(0);
    const value = ref();
    const aa = ref(0);
    const scrollbarRef=ref()
    const xiangqin = id => {
      show.value = true;
    };
    const arr = ref();
    const currentime = ref();
    const show3 = ref(false);
    const huadong = e => {
      if (aa.value == 2 && e == 0) {
        nextButtonClick();
        aa.value = 0;
        return;
      }
      if (aa.value == 0 && e == 2) {
        lastButtonClick();
        aa.value = 2;
        return;
      }
      if (aa.value < e) {
        nextButtonClick();

        aa.value = e;
      } else {
        lastButtonClick();
        aa.value = e;
      }
    };
    const bofang = () => {
      if (playDuration.value == 0) {
        return;
      }
      if (store.bofang == false) {
        clearInterval(jishiqi.timeInter);
        store.bofang = true;
        musicAudio.value.pause();
      } else {
        update();
        store.bofang = false;
        musicAudio.value.play();
      }
      playTime.value = musicAudio.value.currentTime;
    };
    const update = () => {
      jishiqi.timeInter = setInterval(updatePlayTimePerSecond, 1000);
    };
    onMounted(() => {
      update();
    });
    watch(
      () => store.musicId,
      aa => {
        if(aa==""){
          return
        }
        list.value = list.value.filter(res => res != aa);
        store.jishue = store.songslist.length;
        store.songslist.push(aa);

        changeMusic(aa);
      }
    );
    const nextButtonClick = () => {
      if (store.songslist.length == 0) {
        return;
      }
      if (store.jishu == store.songslist.length - 1) {
        store.jishu = 0;
      } else {
        store.jishu += 1;
      }

      changeMusic(store.songslist[store.jishu]);
    };
    const lastButtonClick = () => {
      if (store.songslist.length == 0) {
        return;
      }

      if (store.jishu == 0) {
        store.jishu = store.songslist.length - 1;
      } else {
        store.jishu -= 1;
      }

      changeMusic(store.songslist[store.jishu]);
    };
    const updatePlayTimePerSecond = () => {
      if (musicAudio.value) {
        if (store.songslist.length == 0) {
          return;
        }

        if (musicAudio.value.currentTime) {
          store.shijain = musicAudio.value.currentTime;
        }

        if (!store.bofang) {
          playTime.value += 1;

          if (playTime.value >= playDuration.value) {
            nextButtonClick();
            playTime.value = 0;
          }
        }
      }
    };

    watch(
      () => store.jishu,
      aa => {
        changeMusic(store.songslist[aa]);
      }
    );
    const shouye = () => {
      router.push({
        path: "/",
        params: {}
      });
    };
    const paihangbang = () => {
      router.push({
        path: "/test2",
        params: {}
      });
    };
    const user = () => {
      router.push({
        path: "/test3",
        params: {}
      });
    };
    const search = () => {
      router.push({
        path: "/sousuo",
        params: {}
      });
    };
    const tuihui = e => {
      router.go(-1);
    };

    const changeMusic = aa => {
      ss(aa)
   
      API({
        url: "/song/url/v1?id=" + aa + "&level=exhigh",
        method: "GET"
      }).then(res => {
        if (res.data.code == 200) {
          musicSource.value.src = res.data.data[0].url;

          musicAudio.value.load();

          playTime.value = musicAudio.value.currentTime;

          sliderLength.value = musicAudio.value.duration;
        
          let playPromise = musicAudio.value.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                musicAudio.value.play();
              })
              .catch(() => {});
          }

          store.bofang = false;
        }
      });
    };
    const changePlayTime = val => {
      musicAudio.value.currentTime = val;
    };
    const changeDuration = () => {
      if (playDuration.value != musicAudio.value.duration) {
        sliderLength.value = musicAudio.value.duration;

        playDuration.value = musicAudio.value.duration;
      }
    };
    const tooltipFormat = val => {
      let strTime = playTime.value;

      let strMinute = parseInt(strTime / 60 + "");

      let strSecond = parseInt((strTime % 60) + "");

      return strMinute + ":" + strSecond;
    };
    function ss(id) {
     API({
        url: "/song/detail?ids=" + id
      }).then(res => {
        if (res.data.code == 200) {
          store.singers= res.data.songs[0].ar
        
          music.value = res.data.songs;
          url.value = res.data.songs[0].al.picUrl;
    
          music.value.filter(res => {
            let b = "";
            for (let i = 0; i < res.ar.length; i++) {
              if(i==3){
                b+=res.ar[i].name+'...'
                break
              }
              if (i == res.ar.length - 1) {
                b += res.ar[i].name;
              } else {
                b += res.ar[i].name + "/";
              }
            }
            res.ar = b;
          });
          music.value = music.value[0];
        }
      });
   API({
        url: "/lyric?id=" + id
      }).then(res => {
        arr.value = res.data.lrc.lyric.split(/[\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          let lrc = item.slice(11, item.length);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }

          return { min, sec, time, mill, lrc };
        });

        arr.value.forEach((item, i) => {
          if (i == arr.value.length - 1) {
            item.per = 0;
          } else {
            item.per = arr.value[i + 1].time;
          }
        });
       
      });
    }
    watch(
      () => store.shijain,
      aa => {
        if(aa==0){
          scrollbarRef.value.setScrollTop(0)
        }
        let p=document.querySelector('p.active')
        if(p){
         
       if( p.offsetTop>150){
        scrollbarRef.value.setScrollTop(p.offsetTop-150)
       }
        }
       
        currentime.value = aa;
        
      }
    );
  const dianji=()=>{
    panduan.value=!panduan.value
  }
  const chengyun=()=>{
    router.push({
      path:"test4"
    })
  }
  const geshou=()=>{
    if(store.singers.length==1){
      show.value=false
      router.push({
        path:"/geshou",
        query:{
          id:store.singers[0].id
        }
      })
    }else{
      show3.value=true
    }
  
  }
  const tiaozhianggeshou=id=>{
   
    show.value=false
    show3.value=false
      router.push({
        path:"/geshou",
        query:{
          id:id
        }
      })
  }


    return {
      tuihui,
      value,
      active,
      shouye,
      paihangbang,
      user,
      router,
      search,
      musicSource,
      musicAudio,
      playTime,
      musicCursor,
      voiceMute,
      list,
      voicePower,
      playDuration,
      sliderLength,
      store,
      url,
      music,
      bofang,
      changeDuration,
      huadong,
      show,
      xiangqin,
      lastButtonClick,
      nextButtonClick,
      changePlayTime,
      tooltipFormat,
      arr,
      currentime,
      scrollbarRef,
      panduan,
      dianji,
      chengyun,
      show3,
      geshou,
      tiaozhianggeshou
    };
  }
};
</script>
<style >
.aa {
  position: relative;
  bottom: 20 px;
  left: 20px;
}
.musie {
  position: relative;
  bottom: 0px;
  width: 100%;
  z-index: 99;
}
.tabbar {
  position: relative;
}
.dibu {
  position: fixed;
  bottom: 0;
  width: 100%;

  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.music-disk-picture {
  width: 40px;
  height: 40px;
  pointer-events: none;
  border-radius: 50%;
  border: 1px solid black;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.geming1 {
  white-space: nowrap;
  position: absolute;
  top: 10%;
  font-size: 8px;
  left: 60px;
}
.geshou1 {
  white-space: nowrap;
  position: absolute;
  top: 50%;
  font-size: 8px;
  left: 60px;
}
.zanting {
  margin: 2%;
}
.qq {
  width: 100%;
  height: 50px;
  background-color: rgb(62, 68, 68);
  justify-content: space-between;
  display: flex;
  align-items: center;
}
.cc {
  width: 100%;
}

.music-disk-playing-style {
  animation: music-disk-rotate 3s linear infinite;
  animation-play-state: running;
}

@keyframes music-disk-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.cipan {
  display: flex;
  width: 100%;
  height: 450px;
}
.img_cz {
  width: 90px;
  height: 120px;
  position: absolute;
  left: calc(50% - 45px);
  top: 120px;

  z-index: 1011;
  transform-origin: 0 0;
  transform: rotate(-30deg);
  transition: all 2s;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.img_cz_active {
  width: 90px;
  position: absolute;
  left: calc(50% - 45px);

  height: 120px;
  transform-origin: 0 0;
  transform: rotate(0deg);
  transition: all 2s;
}
.img_cp {
  z-index: 99;
  position: absolute;
  left: calc(50% - 150px);
  top: 180px;
  width: 300px;
  height: 300px;

  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.img_dt {
  position: absolute;

  left: calc(50% - 105px);

  top: 230px;
  width: 210px;
  height: 210px;
  border-radius: 50%;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  animation: rotate_dt 10s linear infinite;
}
.img_dt_active {
  animation-play-state: running;
}
.img_dt_paused {
  animation-play-state: paused;
}
@keyframes rotate_dt {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.bofang {
  width: 100%;
  left: 0px;
  height: 100px;

  position: fixed;
  bottom: 0px;
  z-index: 99;
  justify-content: space-around;
  display: flex;
  align-items: center;
}
.range {
  margin: 0 auto;
  width: 80%;
  margin-left: 10%;
  position: absolute;
  bottom: 20%;
}
.content {
  height: 300px;
  text-align: center;
  width: 100%;
  font-size: 10px;
  line-height: 30px;
}

p {
    transition: all 1.5s;
    color: #999;
  }
  .active {

color: rgb(23, 3, 3);
font-size: 20px;
}
.geming2{
  margin-top: 8%;
text-align: center;
font-size: 20px;
font-weight: bold;
}
.geshou2{
  text-align: center;
margin:8% auto;
}
.show3{
  border-radius: 20px 20px 0 0;
  background-color: #777; 
}
.geshoux{
  font-size: 2ex;
  background-color: #eee; 
}
.geshouitem{
  display: flex;
  align-items: center;
  border-bottom: 1px solid  ;
  padding: 4%;
}
</style>