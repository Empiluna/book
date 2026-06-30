import { defineStore } from 'pinia'
import { request } from '../api/request'
export const useUserStore = defineStore('user', { state:()=>({token:uni.getStorageSync('token')||'', user:uni.getStorageSync('user')||null}), actions:{ async login(account,password){ const res=await request('/user/login',{method:'POST',data:{account,password}}); this.token=res.access_token; this.user=res.user; uni.setStorageSync('token',this.token); uni.setStorageSync('user',this.user); return res }, logout(){this.token='';this.user=null;uni.removeStorageSync('token');uni.removeStorageSync('user')} } })
