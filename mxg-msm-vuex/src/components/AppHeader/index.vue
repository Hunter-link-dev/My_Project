<template>
<div class="header">
    <a href="#/">
    <img src="@/assets/133.png" width="25px" class="logo" />
    <span>用户管理系统</span>
    </a>

    <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
        {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">修改密码</el-dropdown-item>
        <el-dropdown-item command="b">退出管理</el-dropdown-item>
    </el-dropdown-menu>
    </el-dropdown>

    <!-- 弹出一个对话框 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="500px">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" style="width:400px">
            <el-form-item label="原密码" prop="oldpass">
                <el-input type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="$refs['ruleForm'].resetFields()">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</div>
</template>

<script>
import {logout} from '@/api/login'
import passwordApi from "@/api/password";
export default {
    data() {

        const validatePass = (rule, value, callback) => {
            // console.log(this.user.id);
            passwordApi.checkPwd(this.user.id,value).then(response => {
                const resp = response.data
                if (resp.flag) {
                    callback()
                } else {
                    callback(new Error('请再次输入密码'));
                }
            })
        }
        var validatePass2 = (rule, value, callback) => {
            if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return {
            // user:JSON.parse(localStorage.getItem('mxg-msm-user')),
            user:this.$store.state.user.user,
            dialogFormVisible:false,
            ruleForm:{
                oldpass:'',
                pass:'',
                checkPass:''
            },
            rules:{
                oldpass:[
                    {required:true, message:'原密码不能为空', trigger:'blur'},
                    { validator: validatePass, trigger: 'blur' }
                ],
                pass:[
                    {required:true, message:'密码不能为空', trigger:'blur'}
                ],
                checkPass:[
                    {required:true, message:'校验密码不能为空', trigger:'blur'},
                    { validator: validatePass2, trigger: 'change' }
                ],
            },
        }
    },
    methods:{
        handleCommand(command){
            // this.$message(`你点击了${command}`)
            switch (command) {
                case 'a':
                    this.handlePassword()
                    break;
                case 'b':
                    this.handleLogout()
                    break;
                default:
                    break;
            }
        },
        handleLogout(){
            this.$store.dispatch('Logout').then(response => {
                    if (response.flag) {
                        this.$router.push('/login')
                    } else { 
                        this.$message({
                                message:resp.message,
                                type:'warnning',
                                duration:500
                            })
                    }
                }).catch(error => {

                }) 
            // logout(localStorage.getItem('mxg-msm-token')).then(response => {
            //             const resp = response.data
            //             if (resp.flag) {
            //                 localStorage.removeItem('mxg-msm-token')
            //                 localStorage.removeItem('mxg-msm-user')
            //                 this.$router.push('/login')
            //             } else {
            //                 this.$message({
            //                     message:resp.message,
            //                     type:'warnning',
            //                     duration:500
            //                 })
            //             }
            //         })
        },
        handlePassword(){
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['ruleForm'].resetFields()
            })
        },
        submitForm(formName){
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log('successful');
                    passwordApi.updatePwd(this.user.id,this.ruleForm.checkPass).then(response => {
                        const resp = response.data
                        this.$message({
                            message:resp.message,
                            type:resp.flag ? 'succcess' : 'warning'
                        })
                        if (resp.flag) {
                            this.handleLogout()
                            this.dialogFormVisible = false
                        } else {
                            return false
                        }
                    })
                } else {
                    return false
                }
            })
        }
    }
}
</script>

<style scoped>
    .logo {
        /* display:block; */
        vertical-align: middle;
        margin: auto 10px;
        padding: 0 10px 0 40px;
    }
    span {
        color: white;
    }
    .el-dropdown{
        margin-right: 40px;
        float: right;
        cursor: pointer;
    }
    a{
        text-decoration: none
    }
</style>
