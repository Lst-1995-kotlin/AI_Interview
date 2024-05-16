<template>
    <div>
        <vModelText result></vModelText>
        {{ result }}
    </div>
</template>
<script>


export default {
    data() {
        return {
            result: "AI 서비스와 연결 중 입니다."
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
        }
    }
}
</script>
