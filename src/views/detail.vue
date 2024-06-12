<template>
    <div class="d-flex flex-column h-100 templetestyle">
        <div class="page-title" @click="moveHome">
            <h1> AI_INTERVIEW </h1>
        </div>
        <div class="page-title">
            <h1>{{ this.title }}</h1>
        </div>
        <div class="page-title">
            <h2>면접 평가 점수 {{ this.score }}점</h2>
        </div>
        <div class="flex-grow-1 overflow-auto" ref="items">
            <v-card v-for="(item, index) in history" 
            :key="index" 
            :class="item.writer == 'user' ? 'userstyle' : 'aistyle'" 
            > 
                <v-card-title :class="item.writer == 'user' ? 'usercontent' : 'aicontent'">{{ item.writer }}</v-card-title>
                <v-card-text :class="item.writer == 'user' ? 'usercontent' : 'aicontent'">{{ item.content }}</v-card-text> 
            </v-card>
            <div class="mt-6 text-center" ref="pagebottom">
                <v-btn color="primary" class="btnstyle" @click="remove">삭제하기</v-btn>
                <v-btn color="primary" class="btnstyle" @click="exit">나가기</v-btn>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
  data() {
    return {
        title: "",
        score: 0,
        history: [],
        no: ""
    };
  },
  mounted() {
    this.no = this.$route.params.id;
    this.$axios.get("history/title/" + this.no)
    .then(response => {
        this.title = response.data.title,
        this.score = response.data.score
    })
    this.$axios.get("history/contents/" + this.no)
    .then(response => {
        this.history = response.data
    })
  },
  methods: {
    exit() {
        this.$router.push("/list")
    },
    remove() {
        this.$axios.post("/history/deleteHistory", {no: this.no})
        .then(response => {
            if (response.data.result == "success") {
                this.$router.push("/list")   
            }
        })
    },
    moveHome() {
      this.$router.push("/" )
    }
  }
}
</script>

<style>
.btnstyle{
    margin: 2%;
    align-self: center;
}
.templetestyle{
    background-color: rgb(232, 218, 198);
    height: 100%;
}
.lodingstyle{
    height: 4%;
}
.userstyle {
    align-self: right;
    text-align: right;
    background-color: rgb(235, 172, 77);
    margin-top: 2%;
    margin-left: 40%;
    margin-right: 4%;
}
.usercontent {
    align-self: right;
    text-align: right;
    background-color: rgb(235, 172, 77);
}
.aistyle {
    margin-right: 40%;
    align-self: left;
    text-align: left;
    background-color: rgb(55, 136, 228);
    margin-top: 2%;
    margin-left: 4%;
}
.aicontent {
    align-self: left;
    text-align: left;
    background-color: rgb(55, 136, 228);
}
.inputcontent {
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 2%;
    background-color: rgb(232, 218, 198);
    width: 100% auto;
    height: 100% auto;
}
.page-title {
    text-align: center;
    margin: 20px 0;
}
.page-title h1 {
    font-size: 2.5em;
    font-weight: bold;
    color: #333;
}
</style>
