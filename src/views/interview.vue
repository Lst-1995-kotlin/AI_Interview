<template>
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
        <VCardText v-model="information.company_name"></VCardText>
        <VCardText v-model="information.job_description"></VCardText>
        <VCardText v-model="information.qualification_conditions"></VCardText>
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
                    qualification_conditions: ""
                },
            }
        },
        mounted() {
            this.$axios.get("/interview/"+this.$route.params.information)
            .then(response => {
                this.information = response.data;
            })
            console.log("객체 확인" + this.$route.params.information)
        },
        methods: {
            setCompanyData() {
                this.$axios.post("/gemini/inputdata", this.information)
                .then((response) => {
                    this.loading_cicle_is_show = false
                    this.$router.push("/interview", this.information)
                })
            }
        }
    }
</script>