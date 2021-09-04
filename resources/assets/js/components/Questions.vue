<template>
<div>
  <div class="card-body">
    <div v-if="questions.length">
      <question-excerpt
        v-for="question in questions"
        v-bind:question="question"
        :key="question.id"
      ></question-excerpt>
    </div>
    <div class="alert alert-warning" v-else>
      <strong>Sorry</strong> There are no questions available.
    </div>

    <!-- pagination -->
  </div>
  <div class="card-footer">
      <pagination :meta="meta" :links="links"></pagination>
  </div>
  </div>
</template>
<script>
import QuestionExcerpt from '../components/QuestionExcerpt.vue';
import Pagination from "../Pagination.vue";
export default {

    components:{
        QuestionExcerpt,
        Pagination
    },
    data(){
        return {
            questions:[],
            meta:{},
            links:{}
        }
    },
    watch:{
        '$route':'fetchQuestions'
    },
    mounted(){
        this.fetchQuestions()
    },
    methods:{
        fetchQuestions(){
            axios.get('/questions',{params:this.$route.query})
            .then(({data}) => {
                this.questions = data.data;
                this.meta= data.meta;
                this.links = data.link;
            })
        }
    }
}
</script>