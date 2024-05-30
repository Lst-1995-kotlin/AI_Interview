<template>
    <div>
        <VCardText v-text="result"> </VCardText>
    </div>
    <div class="input-style">
        <v-text-field v-model="information.company_name" label="기업명"></v-text-field>
    </div>
    <div class="input-style">
        <v-text-field v-model="information.job_description" label="직무내용"></v-text-field>
    </div>
    <div class="input-style">
        <v-text-field v-model="information.qualification_conditions" label="자격요건"></v-text-field>
    </div>
    <div class="text-center">
        <v-btn @click = "request" color="primary">면접 보러가기</v-btn>
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
</template>
<script>
    export default {
        data() {
            return {
                result: "AI 서비스와 연결 중 입니다.",
                content: "",
                loading_cicle_is_show: false,
                information: {
                    company_name: "",
                    job_description: "",
                    qualification_conditions: ""
                },
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
                    if (!response.data.model_result == "fail" && !response.data.chat_result == "fail") {
                        this.result = "현재 오류가 있어 잠시 후에 다시 시도해주세요."
                        return
                    }
                    this.result = ""
                })
            },
            request() {
                if (this.information.company_name == "" && 
                    this.information.job_description == "" &&
                    this.information.qualification_conditions == ""
                ) {
                    alert("모든 내용을 기입해주세요.")
                    return
                }
                console.log(this.information)
                this.loading_cicle_is_show = true
                this.$axios.post("/gemini/inputdata", this.information)
                .then((response) => {
                    this.loading_cicle_is_show = false
                    this.$router.push("/interview")
                })
            }
        }
    }
</script>

<style>
.input-style {
    height: auto;
    width: 15cm;
    margin: 4px auto;
}
.custom {
    margin: 10px auto;
    height: auto;
    width: 15cm;
}

</style>