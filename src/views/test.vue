<template>
    <div>
        {{ result }}
    </div>
</template>
<script>


    export default {
        data() {
            result: ""
        },
        mounted() {
            this.getLinkState()
        },
        methods: {
            getLinkState() {
                this.$axios.post("/gemini/basic")
                .then((response) => {
                    this.result = response.result;
                    console.log(response.result)
                })
            }
        }
    }
</script>
