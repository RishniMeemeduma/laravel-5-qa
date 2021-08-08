<template>
    <a title="Click to mark as favorite question (Click again to undo)" 
    :class="classes "
    @click.prevent="toggle"
    >
    <i class="fas fa-star fa-2x"></i>
    <span class="favorites-count">{{ count }}</span>
</a>
</template>
<script>
export default {
    props:['question'],
    data(){
        return {
            isFavorite: this.question.is_favorited,
            question_id:this.question.id,
            count: this.question.favorites_count,
            signedIn : true,
        }
    },
    computed: {
        classes(){
            return [
                'favorite',
                'mt-2',
                ! this.signedIn ? 'off' : ( this.isFavorite ? 'favorited' : ''),
            ]
        },

    },
    methods:{
        toggle(){
            if(! this.isFavorite){
                axios.post(`/questions/${this.question_id}/favorites`)
                .then(res=>{
                    this.count++;
                    this.isFavorite = true;
                })
                .catch(err=>{

                })
            }else{
                
                axios.delete(`/questions/${this.question_id}/favorites`)
                .then(res=>{
                    this.count--;
                    this.isFavorite = false;
                })
                .catch(err=>{

                })
            }
        },
    }
}
</script>