<template>
    <div>
        <div style="text-align: center">
            <el-transfer style="text-align: left; display: inline-block" v-model="value" filterable
                :render-content="renderFunc" :titles="['受限文件', '可查看文件']" :button-texts="['受限', '可查阅']" :format="{
                  noChecked: '${total}',
                  hasChecked: '${checked}/${total}'
                }" @change="handleChange" :data="data">
            </el-transfer>
        </div>
    </div>
</template>


<style  scoped lang="less">
.transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
}

/deep/.el-transfer {
    width: 100%;
}

/deep/ .el-transfer-panel {
    width: 40%;
}

/deep/ .el-transfer__buttons {
    width: 10%;
    padding: 0 10px;
}

/deep/ .el-transfer-panel__body {
    height: auto;
}

/deep/.el-transfer-panel__list {
    height: 650px;
}

/deep/ .el-button {
    width: 100%;
}
</style>

<script>
export default {
    props: {
        id: {
            type: [String, Number]
        }
    },
    data() {
        const generateData = _ => {
            const data = [];
            for (let i = 1; i <= 150; i++) {
                data.push({
                    key: i,
                    label: `2222222222备选项 ${i}`,

                });
            }
            return data;
        };
        return {
            data: generateData(),
            value: [1],
            value4: [1],
            renderFunc(h, option) {
                return <span>{option.key} - {option.label}</span>;
            }
        };
    },

    methods: {
        handleChange(value, direction, movedKeys) {
            console.log(value, direction, movedKeys);
        }
    }
};
</script>
  

