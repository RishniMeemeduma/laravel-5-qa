<template>
    <div class="row mt-4">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <div class="card-title">
                        <h3>Your Answer</h3>
                    </div>
                    <hr>
                    <form @submit.prevent="create">
                        <div class="form-group">
                            <textarea class="form-control" rows="7" name="body" required v-model="body"></textarea>
                        </div>
                        <div class="form-group">
                            <button type="submit" :disabled="isInvalid" class="btn btn-lg btn-outline-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['questionId'],
    data(){
        return{
            body:'',
        }
    },
    computed:{
        isInvalid(){
            return !this.signedIn || this.body.length < 10 ;
        },
        endpoint(){
            return `/questions/${this.questionId}/answers`;
        }
    },
    methods:{
        create(){
            axios.post(this.endpoint,{
                'body':this.body,
            })
            .then(({data})=>{
                swal({
                    title:'success',
                    text: data.message,
                    buttons: true,
                    icon:'success'
                });
                this.body = '';
                this.$emit('created',data.answer);
            })
            .catch(err=>{
                swal({
                    title:'Error',
                    text: err.response.data.message,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                });
            })
        }
    }
}
</script>