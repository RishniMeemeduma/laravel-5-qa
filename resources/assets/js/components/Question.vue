<template>
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <form class="card-body" v-if="editing" @submit.prevent="update">
                    <div class="card-title">
                        <input type="text" class="form-control form-control-lg" v-model="title">                       
                    </div>

                    <hr>

                    <div class="media">
                        
                        <div class="media-body">
                            <div class="form-group">
                                <textarea name="" class="form-control" id="" cols="30" rows="10" v-model="body" ></textarea>
                            </div>
                            
                            <button class="btn  btn-primary" :disabled="inValid">Update</button>
                            <button class="btn  btn-outline-secondary" @click ="cancel" type="button">cancel</button>
                        </div>
                    </div>
                </form>
                <div class="card-body" v-else >
                    <div class="card-title">
                        <div class="d-flex align-items-center">
                            <h1>{{ title }}</h1>
                            <div class="ml-auto">
                                <a href="/questions" class="btn btn-outline-secondary">Back to all Questions</a>
                            </div>
                        </div>                        
                    </div>

                    <hr>

                    <div class="media">
                        <vote :model="question" name="question"></vote>
                        
                        <div class="media-body">
                            <div v-html="bodyHtml"></div>
                            <div class="row">
                                <div class="col-4">
                                    <div class="ml-auto">
                                        <a v-if="authorize('modify',question)" @click.prevent="edit" class="btn btn-sm btn-outline-info">Edit</a>
                                        <button v-if="authorize('deleteQuestion',question)" class="btn btn-sm btn-outline-danger" @click="destroy">Delete</button>
                                    </div>
                                </div>
                                <div class="col-4"></div>
                                <div class="col-4">
                                    <user-info :model="question" label ='asked'> </user-info>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import UserInfo from './UserInfo.vue';
import Vote from './Vote.vue';
import modification from '../mixins/modifications';

export default {
    props:['question'],
    mixins:[modification],
    components:{
        UserInfo,
        Vote
    },
    data(){
        return{
            title:this.question.title,
            body:this.question.body,
            bodyHtml:this.question.body_html,
            id: this.question.id,
            beforeEditCache: {}
        }
    },
    computed:{
        isInvalid(){
            return this.body.length < 10 || this.title.length < 10
        },
        endpoint(){
            return `/questions/${this.id}`;
        }
    },
    methods:{
        setEditCache(){
            this.beforeEditCache = {
                body : this.body,
                title :this.title,
            }
        },
        restoreFormCache(){
            this.body = this.beforeEditCache.body;
            this.title = this.beforeEditCache.title;

        },
        payload(){
            return {
                'body':this.body,
                'title':this.title
            }
        },
        delete(){
            axios.delete(this.endpoint)
                    .then(res=>{
                        this.$emit('deleted');
                        // $(this.$el).fadeOut(500,()=>{
                        //     swal("Good job!", res.data.message, "success");
                        // })
                        
                        
                    })
                    .catch(err=>{})
            setTimeout(()=>{
                            window.location.href ="/questions"
                        },3000)
        }
    }
}
</script>