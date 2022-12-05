<template>
  <div>
    <div class="touxiang" v-if="store.token!=''">
      <img :src="user.avatarUrl" alt />
      <p>{{user.nickname}}</p>
    </div>
    <div class="aaa" v-if="store.token==''">
      <div> 未登录</div>
      <van-button type="primary" @click="denglu">登录</van-button>
      
      </div>
    <van-grid :border="false" :column-num="3" v-if="store.token!=''">
      <van-grid-item v-for="item in mysongs" :key="item" @click="tianzhan(item.id)">
        <van-image :src="item.coverImgUrl" />
        <p class="PP">{{item.name}}</p>
      </van-grid-item>
    </van-grid>
    <div class="btn" v-if="store.token!=''">
      <van-button type="primary" @click="tuichu">退出登录</van-button>
    </div>
    <van-popup v-model:show="show" class="from">
      <div class="from">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field
              v-model="phone"
              name="phone"
              label="手机号"
              placeholder="手机号"
              :rules="[{ required: true, message: '手机号' }]"
            />
            <van-field
              v-model="password"
              type="password"
              name="password"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
          </van-cell-group>
          <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
    <van-notify v-model:show="show1" :type="type">
      <span>{{tishi}}</span>
    </van-notify>
  </div>
</template>
    <script>
import { ref,onMounted } from "vue";
import { useStore } from "../store";
import API from "../plugins/axiosInstance.js";
import { Notify } from "@/../vant";
import { useRouter } from "vue-router";
export default {
  setup() {
    const mainstore = ref({});
    const user = ref({});
    const show = ref(false);
    const phone = ref("");
    const password = ref("");
    const show1 = ref(false);
    const router = useRouter();
    const tishi = ref("");
    const type = ref("");
    const url = ref("");
    const store = useStore();
    const mysongs = ref();
    const tianzhan = id => {
      router.push({
        name: "gedan",
        query: {
          id: id
        }
      });
    };
 
    const tuichu = () => {
      user.value = {};
      store.token = "";
      show.value = true;
    };
    const gedan = () => {
      API({
        url: "/user/playlist?uid=" + window.localStorage.getItem("userId")
      }).then(res => {
   
        mysongs.value = res.data.playlist;
     
      });
      API({
        url: "likelist?uid=" + window.localStorage.getItem("userId")
      }).then(res => {
        console.log(res);

      });
    };
    onMounted(()=>{
      if (store.user.profile) {
      user.value = store.user.profile;
     gedan()
    }
    })

  const onSubmit = values => {
      let shijian = Date.parse(new Date());
      console.log(values);
     API({
        url:
          "/login/cellphone?phone=" +
          values.phone +
          "&password=" +
          values.password+'&withCredentials=true&'+'timestamp='+shijian
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          store.user = res.data;
          window.localStorage.setItem("userId", res.data.profile.userId);
          console.log(res.data.cookie);
          let cookie=res.data.cookie.split(";").filter(res=>{
            document.cookie="res"
            console.log(res);
          })
          console.log(cookie);
          user.value = store.user.profile;
          tishi.value = "登录成功";
          type.value = "success";
          show.value = false;
          store.token = res.data.token;
          gedan();
        } else {
          show.value = true;
          tishi.value = "账户密码不正确";
          type.value = "warning";
        }

        show1.value = true;
        setTimeout(() => {
          show1.value = false;
        }, 2000);
      });
    };

    const denglu=()=>{
      show.value=true
    }
    return {
      mainstore,
      user,
      show,
      phone,
      password,
      onSubmit,
      show1,
      tishi,
      type,
      store,
      url,
      tuichu,
      gedan,
      mysongs,
      tianzhan,
      denglu
    };
  }
};
</script>
<style>
.from {
  border-radius: 20px;
  overflow: hidden;
}
.touxiang {
  margin: 50px auto;
  text-align: center;
  width: 100px;
  height: 100px;
}
.touxiang img {
  width: 100%;
  border-radius: 50%;
}

.btn {
  margin-bottom: 40%;
  width: 26%;
  text-align: center;
  margin-left: calc(50% - 13%);
}
.PP {
  font-size: 8px;
}
.aaa{
  font-size: 50px;
  color: rgb(119, 223, 22);
  text-align: center;
  margin-top: 20%;
}
</style>