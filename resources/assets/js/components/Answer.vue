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
        }
    },
    methods:{
        update() {
            axios.patch(`/questions/${this.question_id}/answers/${this.id}`,{
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
    }

}
</script>