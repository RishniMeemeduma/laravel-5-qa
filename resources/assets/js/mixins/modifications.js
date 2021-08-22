import highlight from '../mixins/highlight';
import UserInfo from '../components/UserInfo.vue';
import Vote from '../components/Vote.vue';
import MEditor from '../components/MEditor.vue';

export default{
    mixins:[highlight],
    data(){
        return{
            editing:false,
        }
    },
    components:{
        UserInfo,
        Vote,
        MEditor
    },
    methods:{
        edit(){
            this.setEditCache();
            this.editing =true;
        },
        cancel(){
            this.restoreFromCache();
            this.editing = false;

        },
        setEditCache(){

        },
        restoreFromCache(){},
        update(){
            axios.put(this.endpoint,this.payload())
            .then(({data})=>{
                this.bodyHtml = data.body_html;
                 swal({
                    title:'success',
                    text: data.message,
                    buttons: true,
                    icon:'success'
                });
                this.editing = false;
            })
            .catch(err=>{
                swal({
                    title:'Error',
                    text:err.response.data.message,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
            })
            .then(()=>this.highlight())
        },

        payload(){},
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
                    this.delete()
                }
            });
        },
        delete(){},
    }
}