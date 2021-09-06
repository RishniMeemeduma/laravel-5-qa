<template>
<div>
  <div class="card-body">
    <spinner v-if="$root.loading"></spinner>
    <div v-else-if="questions.length">
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
import EventBus from "../event-bus";

export default {

    components:{
        QuestionExcerpt,
        Pagination,
        EventBus
    },
    data(){
        return {
            questions:[],
            meta:{},
            links:{},
        }
    },
    watch:{
        '$route':'fetchQuestions'
    },
    mounted(){
        this.fetchQuestions(),
        EventBus.$on('deleted',(id) => {
          let index = this.questions.findIndex(question => id === question.id)  
            this.remove(index)
        })
        
    },
    methods:{
        fetchQuestions(){
            axios.get('/questions',{params:this.$route.query})
            .then(({data}) => {
                this.questions = data.data;
                this.meta= data.meta;
                this.links = data.link;
            })
        },
        remove(index){
          this.questions.splice(index,1);
          
        }
    }
}
</script>