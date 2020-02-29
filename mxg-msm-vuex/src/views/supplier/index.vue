<template>
    <div>
        <!-- 注意这个和 searc是一个后接口的 -->
        <el-form ref="searchForm" :inline="true" :model="searchMap" style="margin-top:20px">
            <el-form-item prop="name">
                <el-input v-model="searchMap.name" placeholder="供应商" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item prop="linkman" v-if="!isDialog">
                <el-input v-model="searchMap.linkman" placeholder="联系人" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item prop="mobile" v-if="!isDialog">
                <el-input v-model="searchMap.mobile" placeholder="联系电话" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetchData">查询</el-button>
                <el-button type="primary" @click="handleAdd" v-if="!isDialog">新增</el-button>
                <el-button @click="resetForm('searchForm')" v-if="!isDialog">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table
        :highlight-current-row="isDialog"
        @current-change="clickCurrentChange"
        :data="list"
        height="380"
        border
        style="width: 100%">
        <el-table-column type="index" label="序号" ></el-table-column>
        <el-table-column prop="name" label="供应商名称" ></el-table-column>
        <el-table-column prop="linkman" label="联系人" ></el-table-column>
        <el-table-column prop="mobile" label="联系电话" ></el-table-column>
        <el-table-column prop="remark" label="备注" ></el-table-column>
        <el-table-column label="操作" width="150" >
            <template slot-scope="scope">
                <el-button v-if="!isDialog"
                size="mini"
                @click="handleEdit(scope.row.id)">编辑</el-button>
                <el-button v-if="!isDialog"
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
        </el-table>

        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="10"
        :layout="!isDialog ? 'total, sizes, prev, pager, next, jumper' : 'prev, pager, next'"
        :total="total">
        </el-pagination>

        <!-- 一个对话框 -->
    <el-dialog title="供应商编辑" :visible.sync="dialogFormVisible" width="500px">
        <el-form ref="pojoForm" label-width="100px" label-position="right" style="width:400px" :model="pojo" :rules="rules">
        <el-form-item label="供应商" prop="name">
            <el-input v-model="pojo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
            <el-input v-model="pojo.linkman" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
            <el-input v-model="pojo.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="评论" prop="remark">
            <el-input type="textarea" v-model="pojo.remark" autocomplete="off"></el-input>
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

import memberApi from "@/api/supplier";

export default {
    props:{
        isDialog:Boolean
    },
    data() {
        return {
            list:[],
            total:0,
            currentPage:1,
            pageSize:10,
            searchMap:{
                name: '',
                linkman: '',
                mobile:'',
                remark:'',
            },
            dialogFormVisible:false,
            pojo:{
                name: '',
                linkman: '',
                mobile:'',
                remark:'',
            },
            rules:{
                name:[
                    {required:true, message:'供应商不能为空', trigger:'blur'}
                ],
                linkman:[
                    {required:true, message:'联系人不能为空', trigger:'blur'}
                ],
                mobile:[
                    {required:true, message:'联系人电话不能为空', trigger:'blur'}
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
        clickCurrentChange(currentRow){
            console.log(currentRow);
            this.$emit('option-supplier',currentRow)
        }
    },
}
</script>