<template>
    <div>
        <VCardText v-text="result"> </VCardText>
    </div>
    <div class="text-center">
        <v-text-field v-model="content" ></v-text-field>
    </div>
    <div class="text-center">
        <v-btn @click = "request">질문하기</v-btn>
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
            this.$axios.post("/gemini/basic")
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
.custom {
    margin-top: 20px ;
}

</style>