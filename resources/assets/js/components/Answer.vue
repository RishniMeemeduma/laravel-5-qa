<template>
    <div class="media post">
       <vote :model="answer" name="answer"></vote>
        <div class="media-body">

            <form  v-if="editing" @submit.prevent="update">

                <div class="form-group">
                    <textarea name="" class="form-control" id="" cols="30" rows="10" v-model="body" ></textarea>
                </div>
                
                <button class="btn  btn-primary" :disabled="inValid">Update</button>
                <button class="btn  btn-outline-secondary" @click ="cancel" type="button">cancel</button>
            </form>

            <div v-else>
                <div v-html="bodyHtml"></div>
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
export default {
    props:['answer'],
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
        }
    },
    methods:{
        update() {
            axios.patch(this.endpoint,{
                body:this.body
            })
            .then(res=>{
                this.editing= false;
                this.bodyHtml = res.data.body_html;
                // this.$toast.success(res.data.message,"Success",{timeout:3000});
                swal('Updated !!',res.data.message, "success")
            })
            .catch(error=>{
                this.$toast.error(res.response.data.message,"Error",{timeout:3000})
            });
        },

        edit(){
            this.beforeEditCache = this.body;
            this.editing = true;
        },

        cancel(){
            this.body = this.beforeEditCache;
            this.editing = false;
        },

        destroy(){
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willdelete) =>{
                if(willdelete){
                    axios.delete(this.endpoint)
                    .then(res=>{
                        this.$emit('deleted');
                        // $(this.$el).fadeOut(500,()=>{
                        //     swal("Good job!", res.data.message, "success");
                        // })
                        
                    })
                    .catch(err=>{})
                }
            });
        }

    }
}


</script>