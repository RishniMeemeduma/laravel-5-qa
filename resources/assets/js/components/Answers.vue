<template>
    <div>
        <div class="row mt-4" v-cloak v-if="count">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div class="card-title">
                            <h2>{{ title }}</h2>
                        </div>
                        <hr>
                        <answer v-for="(answer,index) in answers" :answer="answer" :key="answer.id" v-on:deleted="remove(index)" ></answer>

                        <div class="text-center mt-3">
                            <button @click="fetch(theNextUrl)" class="btn btn-outline-secondary" v-if="theNextUrl">
                                Load More Answers
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <new-answer :question-id="question.id" v-on:created="add"></new-answer>
    </div>
</template>
<script>
import Answer from './Answer.vue';
import NewAnswer from './NewAnswer.vue';
import highlight from '../mixins/highlight';
import EventBus from '../event-bus';
export default {
    props:['question'],
    mixins:[highlight],
    data(){
        return {
            'question_id' :this.question.id,
            'count':this.question.answers_count,
            'answers':[],
            'nextUrl':null,
            'answerIds':[],
            excludeAnswers:[]
        }
    },
    components:{
        Answer,
        NewAnswer,
        EventBus
    },
    computed:{
        title(){
            return this.count + " "+(this.count > 1 ?'Answers' : 'Answer');
        },
        theNextUrl(){
            if(this.nextUrl && this.excludeAnswers.length > 0){
                return this.nextUrl + this.excludeAnswers.map(a => "&excludes[]="+a.id).join('');
            }
            return this.nextUrl;
        }
    },
    created(){
        this.fetch(`/questions/${this.question_id}/answers`);
        
    },
    methods:{
        fetch(endpoint){
            this.answerIds = [];
            axios.get(endpoint)
            .then(({data})=>{
                console.log(data);
                this.answerIds = data.data.map(a => a.id);
                this.answers.push(...data.data);
                this.nextUrl = data.next_page_url;
            })
            .catch(err=>{

            })
            .then(()=>{
                this.answerIds.forEach(id=>{
                    this.highlight(`answer-${id}`)
                })
            })
        },
        remove(index){
            this.answers.splice(index,1);
            this.count--;
            if (this.count === 0) 
            EventBus.$emit('answers-count-changed',this.count);
        },
        add(answer){
            this.answers.push(answer);
            this.count++;
            this.$nextTick(()=>{
                 this.highlight(`answer-${answer.id}`);
            });
            if (this.count === 1) 
             EventBus.$emit('answers-count-changed',this.count);
             this.excludeAnswers.push(answer)
           
        }
    }
}
</script>