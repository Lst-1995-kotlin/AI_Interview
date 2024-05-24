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
                    this.result = response.data.result + response.data.result2;
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
                this.$axios.post("/gemini/quiz", this.information)
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