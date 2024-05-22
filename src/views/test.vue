<template>
    <div>
        <VCardText v-text="result"> </VCardText>
    </div>
    <div class="text-center">
        <v-btn @click = "request">질문하기</v-btn>
        <v-text-field v-model="content" ></v-text-field>
        <v-list lines="one">
            <v-list-item
                v-for="n in 1"
                :title="q"
                :lines="true"
            ></v-list-item>
        </v-list>
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
