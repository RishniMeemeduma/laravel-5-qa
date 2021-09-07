<template>
    <div class="media post">
       <vote :model="answer" name="answer"></vote>
        <div class="media-body">

            <form  v-show="editing" @submit.prevent="update">

                
                    <div class="form-group">
                        <m-editor :body="body" :name="uniqueName">
                        <textarea name="" class="form-control" id="" cols="30" rows="10" v-model="body" ></textarea>
                        </m-editor>
                    </div>
                
                
                <button class="btn  btn-primary" :disabled="inValid">Update</button>
                <button class="btn  btn-outline-secondary" @click ="cancel" type="button">cancel</button>
            </form>

            <div v-show="!editing">
                <div v-html="bodyHtml" ref="bodyHtml" :id="uniqueName"></div>
                <div class="row">
                    <div class="col-4">
                        <div class="ml-auto">
                            
                            <a v-if="authorize('modify',answer)" @click.prevent="edit" class="btn btn-sm btn-outline-info">Edit</a>
                             <button v-if="authorize('modify',answer)" class="btn btn-sm btn-outline-danger" @click="destroy">Delete</button>
                            
                        </div>
                    </div>
                    <div class="col-4"></div>
                    <div class="col-4">
        
                        <user-info :model='answer' label="answered"></user-info>
                    </div>
                </div>   
            </div>                         
        </div>
    </div>
</template>

<script>

import modification from '../mixins/modifications';

    
export default {
    props:['answer'],
    mixins:[modification],

    data(){
        return {
            editing : false,
            body: this.answer.body,
            bodyHtml:this.answer.body_html,
            id:this.answer.id,
            question_id:this.answer.question_id,
            beforeEditCache : null,
            
        }
    },
    computed:{
        inValid(){
            return  this.body.length < 10 ;
        },
        endpoint(){
            return `/questions/${this.question_id}/answers/${this.id}`;
        },
        uniqueName(){
            return `answer-${this.id}`;
        }
    },
    methods:{
        payload(){
            return {
                body:this.body
            }
        },

        setEditCache(){
            this.beforeEditCache = this.body;
        },

        restoreFromCache(){
            this.body = this.beforeEditCache;
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
        }

    }
}


</script>