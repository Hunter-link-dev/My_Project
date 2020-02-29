<template>
    <div>
        <!-- 这是一个searchForm的表单，位于上面的那个位置 -->
        <el-form ref="searchForm" :inline="true" :model="searchMap" style="margin-top:20px">
            <el-form-item prop="cardNum">
                <el-input v-model="searchMap.cardNum" placeholder="会员卡号" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-input v-model="searchMap.name" placeholder="会员姓名" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item prop="payType">
                <el-select v-model="searchMap.payType"  placeholder="支付类型" style="width:200px">
                <el-option v-for="option in payTypeOptions" :key="option.type" :value="option.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="birthday">
                <el-date-picker
                v-model="searchMap.birthday" start-placeholder="出生日期" style="width:200px">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetchData">查询</el-button>
                <el-button type="primary" @click="handleAdd">新增</el-button>
                <el-button @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form>

        <!-- 这是在主区域的那个渲染数据的地方 -->
        <el-table
        :data="list"
        height="380"
        border
        style="width: 100%">
        <el-table-column type="index" label="序号" ></el-table-column>
        <el-table-column prop="cardNum" label="会员卡号" ></el-table-column>
        <el-table-column prop="name" label="会员姓名" ></el-table-column>
        <el-table-column prop="birthday" label="会员生日" ></el-table-column>
        <el-table-column prop="phone" label="手机号码" ></el-table-column>
        <el-table-column prop="money" label="开卡金额"></el-table-column>
        <el-table-column prop="payType" label="支付类型">
            <template slot-scope="scope">
                <span>{{scope.row.payType | payTypeFilter}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="address" label="会员地址"></el-table-column>
        <el-table-column label="操作" width="150">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.row.id)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 这是一个分页器 -->
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 20, 50]"
    :page-size="10"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
    </el-pagination>

    <!-- 一个编辑的对话框 -->
    <el-dialog title="会员编辑" :visible.sync="dialogFormVisible" width="500px">
        <el-form ref="pojoForm" label-width="100px" label-position="right" style="width:400px" :model="pojo" :rules="rules">
        <el-form-item label="会员卡号" prop="cardNum">
            <el-input v-model="pojo.cardNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
            <el-input v-model="pojo.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="会员生日">
                <el-date-picker
                v-model="pojo.birthday" start-placeholder="出生日期" style="width:200px">
                </el-date-picker>
            </el-form-item>

        <el-form-item label="手机号码">
            <el-input v-model="pojo.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额">
            <el-input v-model="pojo.money" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="可用积分">
            <el-input v-model="pojo.integral" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="支付类型" prop="payType">
                <el-select v-model="pojo.payType"  placeholder="支付类型" style="width:200px">
                <el-option v-for="option in payTypeOptions" :key="option.type" :value="option.name"></el-option>
                </el-select>
            </el-form-item>

        <el-form-item label="会员地址">
            <el-input type="textarea" v-model="pojo.address" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="pojo.id === null ? addData('pojoForm') : updateData('pojoForm')">确 定</el-button>
    </div>
    </el-dialog>
    </div>
</template>

<script>
import memberApi from "@/api/member";

const payTypeOptions = [
    {type:'1',name:'现金'},
    {type:'2',name:'微信'},
    {type:'3',name:'支付宝'},
    {type:'4',name:'银行卡'},
]
    
export default {

    data() {
        return {
            list:[],
            total:0,
            currentPage:1,
            pageSize:10,
            searchMap:{
                cardNum:'',
                name:'',
                payType:'',
                birthday:'',
            },
            payTypeOptions,
            dialogFormVisible:false,
            pojo:{
                id:null,
                cardNum:'',
                name:'',
                birthday:'',
                phone:'',
                money:'',
                integral:'',
                payType:'',
                address:'',
            },
            rules:{
                cardNum:[
                    {required:true, message:'卡号不能为空', trigger:'blur'}
                ],
                name:[
                    {required:true, message:'姓名不能为空', trigger:'blur'}
                ],
                payType:[
                    {required:true, message:'支付类型不能为空', trigger:'change'}
                ],
            }
        }
    },

    created(){
        this.fetchData()
    },
    

    methods: {
        handleSizeChange(val){
            this.currentPage = val,
            this.fetchData()
        },
        handleCurrentChange(val){
            this.pageSize = val,
            this.fetchData()
        },
        fetchData(){
            memberApi.search(this.currentPage,this.pageSize,this.searchMap).then(response => {
                const resp = response.data
                console.log(resp)
                this.list = resp.data.rows
                this.total = resp.data.total
            })
        },
        resetForm(formName){
            this.$refs[formName].resetFields()
        },
        addData(formName){
            this.$refs[formName].validate(valid => {
                if (valid) {
                    memberApi.add(this.pojo).then(response => {
                        const resp = response.data
                        if (resp.flag) {
                            this.fetchData()
                            this.dialogFormVisible = false
                        } else {
                            this.$message({
                                message:'Error',
                                type:'warning'
                            })
                        }
                    })
                } else {
                    return false
                }
            })
        },
        // 弹出新增窗口
        handleAdd(){
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['pojoForm'].resetFields()
            })
        },
        updateData(formName){
            console.log('update');
            this.$refs[formName].validate(valid => {
                if (valid) {
                    memberApi.update(this.pojo).then(response => {
                        const resp = response.data
                        if (resp.flag) {
                            this.fetchData()
                            this.dialogFormVisible = false
                        } else {
                            this.$message({
                                message:'Error',
                                type:'warning'
                            })
                        }
                    })
                } else {
                    return false
                }
            })
        },
        handleEdit(id){
            console.log('edit',id);
            memberApi.getById(id).then(response => {
                const resp = response.data
                if (resp.flag) {
                    this.handleAdd()
                    this.pojo = resp.data
                } else {
                    return false
                }
            })
        },
        handleDelete(id){
            console.log('delete',id);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            memberApi.deleteById(id).then(response => {
                const resp = response.data
                this.$message({
                    message:resp.message,
                    type:resp.flag ? 'success' : 'error'
                })
                if (resp.flag) {
                    this.fetchData()
                } else {
                    return false
                }
            })
            }).catch(() => {
            this.$message({
                message: '已取消删除',
                type: 'info',
            });          
            });

        },
    },
    filters:{
            payTypeFilter(type){
                const payObj = payTypeOptions.find(obj => {
                    return obj.type === type
                })
                return payObj ? payObj.name : null
            }
        }
}
</script>