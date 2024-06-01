<template>
    <div>
    <v-card
        v-for="(item, index) in history"
        :key="index"
        class="ma-5"
    >
        <v-card-title>{{ item.role }}</v-card-title>
        <v-card-text>{{ item.text }}</v-card-text>
    </v-card>
    </div>

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
    <div class="text-center">
        <v-btn @click = "inputData">질문 보내기</v-btn>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loading_cicle_is_show: true,
                count: 0,
                query: "안녕하세요. 이번 안드로이드 개발 공고에 지원하게 된 이성태입니다.",
                history:[]
            }
        },
        mounted() {
            this.$axios.post("/gemini/getInitData")
            .then((response) =>{
                console.log(response.data.result)
                this.count = response.data.result
                this.history.push({
                    role: "model",
                    text: response.data.result
                })
            })
            
        },
        methods: {
            inputData() {
                console.log("보낸 내용"+this.query)
                this.count += this.query
                this.history.push({
                    role: "user",
                    text: this.query
                })
                this.$axios.post("/gemini/inputdata", {query: this.query})
                .then((response) => {
                    this.count += "\n\n" + response.data.result
                    this.history.push({
                        role: "model",
                        text: response.data.result
                    })
                })
            }
            
        }
    }
</script>