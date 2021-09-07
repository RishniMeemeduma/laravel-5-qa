<template>
    <form @submit.prevent="handleSubmit">
         <div class="form-group">
            <label for="question-title">Question Title</label>
            <input type="text" name="title" v-model="title" :class="errorClass('title')">

                <div class="invalid-feedback" v-if="errors['title'][0]">
                    <strong>{{ errors['title'][0] }}</strong>
                </div>
        </div>
        <div class="form-group">
            <label for="question-body">Explain you question</label>
            <m-editor :body="body" name="question-body">
             <textarea name="body" rows="10" :class="errorClass('body')" v-model="body"></textarea>

             <div class="invalid-feedback" v-if="errors['body'][0]">
                    <strong>{{ errors['body'][0] }}</strong>
                </div>
            </m-editor>

                
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-outline-primary btn-lg">
                <spinner :small="true" v-if="$root.loading"></spinner>
                <span v-else>
                {{ buttonText }} </span></button>
</div>
      </form>
</template>
<script>
import EventBus from '../event-bus';
import MEditor from './MEditor.vue';
export default {
    props:{'isEdit':{
        Boolean,
        default:false,
    }},
  components: { MEditor },
    data(){
        return{
            title:'',
            body:'',
            errors:{
                title:[],
                body:[]
            },

        }
    },
    components:{MEditor},
    computed:{
        buttonText(){
            return !this.isEdit ? 'Ask Question' :' Edit Question'
        }
    },
    mounted(){
        EventBus.$on('error', errors => this.errors = errors)

        if(this.isEdit){
            this.fetchQuestion()
        }
    },
    methods:{
        errorClass($title){
            return [
                'form-control',
                this.errors[$title] && this.errors[$title][0]? 'is-invalid' : ''
            ]
        },
        handleSubmit(){
            this.$emit('submitted',{
                title:this.title,
                body:this.body
            })
        },
        fetchQuestion(){
            axios.get(  `/question/${this.$route.params.id}`)
            .then(({data}) => {
                console.log(data);
                this.title = data.title;
                this.body = data.body;
            })
        }
    }
}
</script>