<template>
  <div class="page-title" @click="moveHome">
            <h1> AI_INTERVIEW </h1>
  </div>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="6" md="6" v-for="(item, index) in interviewTitles" :key="index">
            <v-card class="card mb-4"
            @click="moveDetail(item.no)">
              <v-card-title>{{ item.title }}
                <div> 평가 점수: {{ item.score}}점</div>
              </v-card-title>
              <v-card-text class="score">인터뷰 날짜: {{ formattedWriteDate(item.writeDate) }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-pagination :length="totalPage" v-model="page" @input="updatePage"></v-pagination>
    </v-main>
  </v-app>
</template>

<script>
import moment from "moment"
export default {
  data() {
    return {
      interviewTitles: [],
      page: 0,
      totalPage: 0
    };
  },
  mounted() {
    this.getInterviewHistory();
  },
  methods: {
    moveDetail(no){
      this.$router.push("/detail/" + no)
    }
    ,
    formattedWriteDate(date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss")
    },
    getInterviewHistory() {
      this.$axios.post("/history/interviewTitles", { page: this.page, perPage: 10 })
        .then((response) => {
          this.interviewTitles = response.data.titles;
          this.totalPage = response.data.totalPage;
        });
    },
    updatePage(page) {
      this.page = page
      this.getInterviewHistory();
    },
    moveHome() {
      this.$router.push("/" )
    }
  }
};
</script>

<style scoped>
.mb-4 {
  margin-bottom: 4px;
}
.score {
  text-align: right;
}
.card {
  background-color: paleturquoise;
  transition: background-color 0.3s ease;
}
.card:hover {
  background-color: lightcoral;
}
</style>
