<template>
    <div class="login-container">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="login-form">
            <h1 class="login-title">学生管理系统</h1>
            <el-form-item label='账号' prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {login,getUserInfo} from "@/api/login";

export default {
data() {
    return {
        form: {
            username:'',
            password:''
        },
        rules:{
            username:[
                {required:true, message:'账号不能为空', trigger:'blur'}
            ],
            password:[
                {required:true, message:'密码不能为空', trigger:'blur'}
            ]
        }
    }
},
methods: {
    submitForm(formName) {
        this.$refs[formName].validate( valid => {
            if (valid) {
                this.$store.dispatch('Login',this.form).then(response => {
                    //这里的这个就是响应回来的真实的信息
                    if (response.flag) {
                        this.$router.push('/')
                    }
                    else{
                        this.$message({
                            message:response.message,
                            type:'warning'
                        })
                    }
                })
                
                //将相关的放在 vuex 那里
                // login(this.form.username,this.form.password).then(response => {
                //     const resp = response.data;
                //     console.log(resp.data)
                //     if (resp.flag) {
                //             const respUser = response.data
                //             if (respUser.flag) {
                //                 getUserInfo(resp.data.token).then(response => {
                //                     console.log('userInfo',respUser.data);
                //                     localStorage.setItem('mxg-msm-user',JSON.stringify(respUser.data))
                //                     localStorage.setItem('mxg-msm-token',resp.data.token)
                //                     this.$router.push('/')
                //                 })
                //             }
                //             else{
                //             this.$message({
                //                 message:respUser.message,
                //                 type:'warnning'
                //             })
                //         }
                        
                //     }
                //     else{
                //         this.$message({
                //             message:resp.message,
                //             type:'warnning'
                //         })
                //     }

                // })
            } else {
                console.log('验证失败');
                return false
            }
        })
    }
}
}
</script>

<style scoped>
    .login-form{
        width: 400px;
        margin:160px auto;
        padding:30px;
        border-radius: 18px;
        background-color: rgb(255,255,255,0.8);
    }
    .login-title{
        color: cyan;
        text-align: center;
        font-family: '宋体';
    }
    .login-container{
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(../../assets/790d5c87ba4e9f59b1b2058f74f796a5.jpg)
    }
</style>