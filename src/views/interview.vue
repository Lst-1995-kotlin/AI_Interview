<template style="background-color: #f5f5f5;"> 
    <div class="d-flex flex-column h-100">
        <div class="flex-grow-1 overflow-auto templetestyle">
            <v-card v-for="(item, index) in history" 
            :key="index" 
            :class="item.role == 'user' ? 'userstyle' : 'aistyle'" 
            ref="card"> 
                <v-card-title :class="item.role == 'user' ? 'usercontent' : 'aicontent'">{{ item.role }}</v-card-title>
                <v-card-text :class="item.role == 'user' ? 'usercontent' : 'aicontent'">{{ item.text }}</v-card-text> 
            </v-card>
            <div class="text-center">
                <v-progress-circular
                class="mt-4"
                ref="loading_cicle"
                v-if="loading_cicle_is_show"
                :size="50"
                color="primary"
                indeterminate
                ></v-progress-circular>
            </div>
        </div>
        <div class="fixed-bottom-center inputcontent">
            <v-text-field
                label="질문을 입력하세요"
                aligen="center"
                ref="text_input"
                v-model="query"
                append-outer-icon="mdi-microphone"
                append-icon="mdi-send"
                @click:append="inputData"
            ></v-text-field>
        </div>
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
                const cards = this.$refs.card;
                if (cards && cards.length) {
                    const lastCard = cards[cards.length - 1];
                    if (lastCard) {
                        lastCard.scrollIntoView({ behavior: 'smooth', block: 'end' });
                    }
                } else {
                    return
                }
                const text_input = this.$refs.text_input
                text_input.scrollIntoView({ behavior: 'smooth', block: 'end' });
            },
            inputData() {
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
                    this.focusLastCard()
                    this.loading_cicle_is_show = false
                })
            }
            
        }
    }
</script>

<style>
.templetestyle{
    max-height: 80%;
    height: auto 80%;
    width: 100%;
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
    max-height: 20%;
    height: auto 20%;
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 4%;
}
</style>