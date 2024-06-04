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
                @click:append-inner="inputData"
            ></v-text-field>
        </div>
        <div class = mt-6 ref = "pagebottom"></div>
    </div>    
    
</template>
  
<script>
    export default {
        data() {
            return {
                loading_cicle_is_show: true,
                query: "",
                history:[]
            }
        },
        mounted() {
            this.$axios.post("/gemini/getInitData")
            .then((response) =>{
                console.log(response.data.result)
                this.history.push({
                    role: "model",
                    text: response.data.result
                })
                this.loading_cicle_is_show = false
            })
            
        },
        methods: {
            focusLastCard() {
                this.$nextTick(() => {
                    this.$refs.pagebottom.scrollIntoView({ behavior: 'smooth', block: 'end' });
                });
            },
            inputData() {
                this.focusLastCard()
                if (this.query == "") return
                this.loading_cicle_is_show = true
                console.log("보낸 내용"+this.query)
                this.history.push({
                    role: "user",
                    text: this.query
                })
                this.focusLastCard()
                this.$axios.post("/gemini/inputdata", {query: this.query})
                .then((response) => {
                    this.history.push({
                        role: "model",
                        text: response.data.result
                    })
                    this.query = ""
                    this.loading_cicle_is_show = false
                    this.focusLastCard()
                })
            }
            
        }
    }
</script>

<style>
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