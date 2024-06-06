<template>
    <div class="top-margin"></div>
    <div class="input-style">
        <v-text-field v-model="information.company_name" label="기업명"></v-text-field>
    </div>
    <div class="input-style">
        <v-text-field v-model="information.job_description" label="직무내용"></v-text-field>
    </div>
    <div class="input-style">
        <v-text-field v-model="information.qualification_conditions" label="자격요건"></v-text-field>
    </div>
    <div class="input-style">
        <v-textarea v-model="information.preferred_qualifications" label="우대사항"></v-textarea>
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
                loading_cicle_is_show: false,
                information: {
                    company_name: "",
                    job_description: "",
                    qualification_conditions: "",
                    preferred_qualifications: ""
                }
            }
        },
        methods: {
            request() {
                if (this.information.company_name == "" && 
                    this.information.job_description == "" &&
                    this.information.qualification_conditions == "" &&
                    this.information.preferred_qualifications == ""
                ) {
                    alert("모든 내용을 기입해주세요.")
                    return
                }
                this.loading_cicle_is_show = true
                this.$axios.post("/gemini/createInterviewer", this.information)
                .then((response) => {
                    if (response.data.result != "success") {
                        this.result = "현재 오류가 있어 잠시 후에 다시 시도해주세요."
                        this.loading_cicle_is_show = false
                        return
                    }
                    this.result = ""
                })
                this.$router.push("/interview")
            }
        }
    }
</script>

<style>
.top-margin {
    margin-top: 2%;
}
.input-style {
    height: min-content;
    width: 15cm;
    margin: 4px auto;
}
.custom {
    margin: 10px auto;
    height: auto;
    width: 15cm;
}

</style>