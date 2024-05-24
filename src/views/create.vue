<template>
    <div>
        <VCardText v-text="result"> </VCardText>
    </div>
    <div class="input-style">
        <v-text-field v-model="content" label="채용공고 링크를 입력해주세요."></v-text-field>
    </div>
    <div class="text-center">
        <v-btn @click = "request" color="primary">채용공고 분석하기</v-btn>
    </div>
    <div class="custom">
        <v-card>
            <v-card-text v-text="q"> </v-card-text>
        </v-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                result: "AI 서비스와 연결 중 입니다.",
                content: "",
                q: ""
            }
        },
        mounted() {
            this.getLinkState()
        },
        methods: {
            getLinkState() {
                this.$axios.post("/gemini/createInterviewer")
                .then((response) => {
                    this.result = response.data.result;
                })
            },
            request() {
                this.$axios.post("/gemini/quiz", {content: this.content})
                .then((response) => {
                    this.q = response.data.result;
                })
            }
        }
    }
</script>

<style>
.input-style {
    height: auto;
    width: 15cm;
    margin: 0 auto;
}
.custom {
    margin: 10px auto;
    height: auto;
    width: 15cm;
}

</style>