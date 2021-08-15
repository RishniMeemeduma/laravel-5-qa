<template>
    <div>
        <a  v-if="canAccept" title="Mark this answer as best answer" 
            :class="classes"
            @click.prevent="acceptedbest">
            <i class="fas fa-check fa-2x"></i>                                    
        </a>


        <a v-if="accepted" title="The question owner accepted this answer as best answer" 
            :class="classes"          
            >
            <i class="fas fa-check fa-2x"></i>                                    
        </a>

    </div>
</template>
<script>
export default {
    props:['answer'],
    data(){
        return{
            isBest: this.answer.is_best,
            answer_id : this.answer.id,
        }
    },
    computed:{
        canAccept(){
            return this.authorize('accept',this.answer);
        },
        accepted(){
            return !this.canAccept && this.isBest
        },
        classes(){
            return [
                'mt-2',
                this.isBest ? 'vote-accepted' : ''
            ]
        }
    },
    methods:{
        acceptedbest(){
            axios.post(`/answers/${this.answer_id}/accept`)
            .then(res=>{
                this.$toast.success(res.data.message,"success",{
                    timeout:3000,
                    position:'bottomLeft'
                });
                this.isBest = true;
            })
            .catch(err=>{

            })
        }
    }
}
</script>