<template> 
    <div class="d-flex flex-column h-100 templetestyle">
        <div class="flex-grow-1 overflow-auto" ref="items">
            <v-card v-for="(item, index) in history" 
            :key="index" 
            :class="item.role == 'user' ? 'userstyle' : 'aistyle'" 
            > 
                <v-card-title :class="item.role == 'user' ? 'usercontent' : 'aicontent'">{{ item.role }}</v-card-title>
                <v-card-text :class="item.role == 'user' ? 'usercontent' : 'aicontent'">{{ item.text }}</v-card-text> 
            </v-card>
            <div class="text-center lodingstyle" 
                ref="loading_cicle">
                <v-progress-circular
                class="mt-4"
                v-if="loading_cicle_is_show"
                :size="50"
                color="primary"
                indeterminate
                ></v-progress-circular>
            </div>
            <div class = "mt-6 text-center" 
                ref = "pagebottom">
                <v-btn
                color="primary"
                class="btnstyle"
                v-if="endcheck"
                @click="saveTitle"
                >저장하기</v-btn>
                <v-btn
                color="primary"
                class="btnstyle"
                v-if="endcheck"
                @click="$router.push('/')"
                >나가기</v-btn>
            </div>
        </div>
        <div 
            class="fixed-bottom-center"
            ref="text_input"
        >
            <v-text-field
                class="inputcontent"
                variant="solo-filled"
                label="질문을 입력하세요"
                :append-inner-icon="'mdi-send'"
                aligen="center"
                v-model="query"
                v-if="!endcheck"
                @click:append-inner="inputData"
            >
            </v-text-field>
        </div>
        <div>
            <v-btn
                v-if="!endcheck"
            >중지하기</v-btn>
        </div>
    </div>    
    
</template>
  
<script>
import moment from "moment"
    
    export default {
        data() {
            return {
                loading_cicle_is_show: true,
                endcheck: false,
                query: "",
                history:[],
                title: "",
                titleNo: ""
            }
        },
        async mounted() {
            await this.saveTitle()
            this.$axios.post("/gemini/getInitData")
            .then(async (response) =>{
                console.log(response.data.result)
                await this.history.push({
                    role: "model",
                    text: response.data.result
                })
                this.loading_cicle_is_show = false
            })
        },
        watch: {
            history: {
                handler(newVal, oldVal) {
                    this.saveContent();
                },
                deep: true
            }
        },
        methods: {
            async saveTitle() {
                try {
                    this.$axios.post("/history/writetitle", {title: "지정되지 않은 타이틀"})
                    .then((response) => {
                        this.titleNo = response.data.no;
                    })
                } catch (error) {
                    console.error("Error saving title:", error);
                }
            },
            async saveContent() {
                let lastItem = this.history[this.history.length-1]
                let savetalk = {
                        titleNo: this.titleNo,
                        writer: lastItem.role,
                        content: lastItem.text
                    };
                await this.$axios.post("/history/writecontent", savetalk);
                console.log(savetalk + "항목이 저장되었습니다.");
            },
            focusLastCard() {
                this.$nextTick(() => {
                    this.$refs.pagebottom.scrollIntoView({ behavior: 'smooth', block: 'end' });
                });
            },
            stop() {
                this.endcheck = true;
            },
            async inputData() {
                this.focusLastCard();
                if (this.query == "") return;
                if (this.loading_cicle_is_show) return;
                if (this.endcheck) return;
                this.loading_cicle_is_show = true;
                console.log("보낸 내용" + this.query);
                await this.history.push({
                    role: "user",
                    text: this.query
                });
                this.focusLastCard();
                await this.$axios.post("/gemini/inputdata", {query: this.query})
                .then((response) => {
                    let result = response.data.result;
                    if (result.includes('endInterview')) {
                        result = result.split('endInterview')[0];
                        this.endcheck = true;
                    }
                    this.history.push({
                        role: "model",
                        text: result
                    });
                    this.query = "";
                    this.loading_cicle_is_show = false;
                    this.focusLastCard();
                });
            },
        }
    }
</script>


<style>
.btnstyle{
    margin: 2%;
    align-self: center;
}
.templetestyle{
    background-color: rgb(232, 218, 198);
    height: 100%;
}
.lodingstyle{
    height: 4%;
}
.userstyle {
    align-self: right;
    text-align: right;
    background-color: rgb(235, 172, 77);
    margin-top: 2%;
    margin-left: 40%;
    margin-right: 4%;
}
.usercontent {
    align-self: right;
    text-align: right;
    background-color: rgb(235, 172, 77);
}
.aistyle {
    margin-right: 40%;
    align-self: left;
    text-align: left;
    background-color: rgb(55, 136, 228);
    margin-top: 2%;
    margin-left: 4%;
}
.aicontent {
    align-self: left;
    text-align: left;
    background-color: rgb(55, 136, 228);
}
.inputcontent {
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 2%;
    background-color: rgb(232, 218, 198);
    width: 100% auto;
    height: 100% auto;
}
</style>
