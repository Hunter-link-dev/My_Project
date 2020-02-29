<template>
    <div>
        <!-- 注意这个是一个查询的表单 -->
        <el-form ref="searchForm" :inline="true" :model="searchMap" style="margin-top:20px">
            <el-form-item prop="name">
                <el-input v-model="searchMap.name" placeholder="商品商户" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="searchMap.code" placeholder="商品编码" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item prop="supplierName">
                <el-input readonly @click.native="dialogSupplierVisible = true"
                v-model="searchMap.supplierName" placeholder="供应商名称" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetchData">查询</el-button>
                <el-button type="primary" @click="handleAdd">新增</el-button>
                <el-button @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table
        :data="list"
        height="380"
        border
        style="width: 100%">
        <el-table-column type="index" label="序号" ></el-table-column>
        <el-table-column prop="name" label="商品商户" ></el-table-column>
        <el-table-column prop="code" label="编码" ></el-table-column>
        <el-table-column prop="spec" label="规格" ></el-table-column>
        <el-table-column prop="retailPrice" label="零售" ></el-table-column>
        <el-table-column prop="purchasePrice" label="进价" ></el-table-column>
        <el-table-column prop="storageNum" label="库存" ></el-table-column>
        <el-table-column prop="supplierName" label="供应商" ></el-table-column>
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

        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>

        <!-- 一个对话框 -->
    <el-dialog title="商品编辑" :visible.sync="dialogFormVisible" width="500px">
        <el-form ref="pojoForm" label-width="100px" label-position="right" style="width:400px" :model="pojo" :rules="rules">
        <el-form-item label="商品商户" prop="name">
            <el-input v-model="pojo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
            <el-input v-model="pojo.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="spec">
            <el-input v-model="pojo.spec" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="零售" prop="retailPrice">
            <el-input v-model="pojo.retailPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="进价" prop="purchasePrice">
            <el-input v-model="pojo.purchasePrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="storageNum">
            <el-input v-model="pojo.storageNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplierName">
            <el-input v-model="pojo.supplierName" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="pojo.id === null ? addData('pojoForm') : updateData('pojoForm')">确 定</el-button>
    </div>
    </el-dialog>

    <!-- supply 的弹窗 -->
    <el-dialog title="商品编辑" :visible.sync="dialogSupplierVisible" width="500px">
        <supplier @option-supplier="optionSupplier" :isDialog="true"></supplier>
    </el-dialog>
    </div>
</template>

<script>

import memberApi from "@/api/goods";
import Supplier from "@/views/supplier";

export default {
    components:{
        Supplier
    },
    data() {
        return {
            list:[],
            total:0,
            currentPage:1,
            pageSize:10,
            searchMap:{
                name: '',
                code: '',
                spec: '',
                retailPrice: '',
                purchasePrice: '',
                storageNum: '',
                supplierName:'',
            },
            dialogFormVisible:false,
            dialogSupplierVisible:false,
            pojo:{
                name: '',
                code: '',
                spec: '',
                retailPrice: '',
                purchasePrice: '',
                storageNum: '',
                supplierName:'',
            },
            rules:{
                name:[
                    {required:true, message:'商品商户不能为空', trigger:'blur'}
                ],
                code:[
                    {required:true, message:'编码不能为空', trigger:'blur'}
                ],
                spec:[
                    {required:true, message:'规格不能为空', trigger:'blur'}
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
        //这里的currentRow 是可以写成其他的参数也是可以的比如 data 
        optionSupplier(currentRow){
            console.log('parent',currentRow);
            this.searchMap.supplierName = currentRow.name 
            this.searchMap.supplierId = currentRow.id
            this.dialogSupplierVisible = false
        }
    },
}
</script>