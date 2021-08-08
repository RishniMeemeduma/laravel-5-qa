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
            })
            .catch(error=>{
                console.log(error.response.data.message);
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
                        // $(this.$el).fadeOut(500,()=>{
                        //     alert(res.data.message);
                        // })
                        swal("Good job!", res.data.message, "success");
                        this.$router.go()
                    })
                    .catch(err=>{})
                }
            });
        }

    }
}


</script>