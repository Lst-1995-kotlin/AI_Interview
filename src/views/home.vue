<template>
    <div class="d-flex flex-column h-100 background">
        <div class="page-title" @click="moveHome">
            <h1> AI_INTERVIEW </h1>
        </div>
        <div class="top-margin"></div>
        <v-container fluid>
            <v-textarea class="input-style" auto-grow row-height="15" rows="1" variant="solo" v-model="information.company_name" label="기업명"></v-textarea>
            <v-textarea class="input-style" auto-grow row-height="15" rows="1" variant="solo" v-model="information.job_description" label="직무내용"></v-textarea>
            <v-textarea class="input-style" auto-grow row-height="15" rows="1" variant="solo" v-model="information.qualification_conditions" label="자격요건"></v-textarea>
            <v-textarea class="input-style" auto-grow row-height="15" rows="1" variant="solo" v-model="information.preferred_qualifications" label="우대사항"></v-textarea>
            <div class="text-center">
                <v-btn @click = "request" color="primary" class="btn">면접 보러가기</v-btn>
                <v-btn @click = "goHistory" color="primary" class="btn">기록 보러가기</v-btn>
            </div>
        </v-container>
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
            moveHome() {
                this.$router.push("/" )
            },
            goHistory() {
                this.$router.push("/list")
            },
            request() {
                if (this.information.company_name == "" || 
                    this.information.job_description == "" ||
                    this.information.qualification_conditions == "" ||
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
                    this.$router.push("/interview")
                })
            }
        }
    }
</script>

<style>
.top-margin {
    margin-top: 2%;
}
.input-style {
    width: 15cm;
    margin: 4px auto;

}
.custom {
    margin: 10px auto;
    height: auto;
    width: 15cm;
}
.btn{
    margin: 1%;
}
.background {
    background-color: rgb(232, 218, 198);
    height: 100%;
}
</style>