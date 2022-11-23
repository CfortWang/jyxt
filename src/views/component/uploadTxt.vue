<template>
    <div>
        <label for="uploadTxt" :class="$style.upload">
            <el-tooltip class="item" effect="dark" content="请选择格式为txt的原始数据文件" placement="top">
                <div :class="$style.btn"><i class="el-icon-upload"/>选择文件</div>
            </el-tooltip>
            <span :class="$style.file">{{ fileName }}</span>
            <input
                id="uploadTxt"
                type="file"
                accept=".txt"
                hidden
                @change="onChange"
            >
        </label>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                fileName: ''
            }
        },
        mounted() {
            (function(){
                // 定义一个变量让setItem函数的值指向它
                let originalSetItem = localStorage.setItem
                // 重写setItem函数
                localStorage.setItem = (key, value) => {
                    // 创建setItemEvent事件
                    let event = new Event('setItemEvent')
                    event.key = key
                    event.value = value
                    // 提交setItemEvent事件
                    window.dispatchEvent(event)
                    // 执行原setItem函数
                    originalSetItem.apply(this, arguments)
                }
            })()

            let ele = document.getElementById('uploadTxt')
            // 监听localStorage, 清除已选文件
            window.addEventListener('setItemEvent', e => {
                if (e.key === 'areaData') {
                    ele.value = ''
                    this.fileName = ''
                }
            })
        },
        methods: {
            onChange(e) {
                const { files } = e.dataTransfer || e.target
                // console.log(files)
                this.fileName = files[0].name
            }
        }
    }
</script>
<style lang="scss" module>
    .upload {
        // display: block;
        // width: 200px;
        .btn {
            display: inline-block;
            width: 100px;
            font-size: 12px;
            line-height: 20px;
            text-align: center;
            background-color: #409eff;
            color: #fff;
            border-radius: 5px;
            padding: 7px 15px;
            i{
                margin-right: 5px;
            }
        }
        .file {
            display: inline-block;
            font-size: 12px;
            color: #666;
            margin-left: 20px;
        }
    }
</style>