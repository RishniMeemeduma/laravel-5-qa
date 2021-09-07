import QuestionsPage from '../pages/QuestionsPage';
import QuestionPage from '../pages/QuestionPage';
import MyPostsPage from '../pages/MyPostsPage';
import NotFoundPage from '../pages/NotFoundPage';
import CreateQuestionPage from '../pages/CreateQuestions';
import EditQuestionPage from '../pages/EditQuestions';

const routes = [
    {
    path : '/',
    component : QuestionsPage,
    name: 'home'
    },
    {
        path:'/questions',
        component: QuestionsPage,
        name:'questions'
    },
    {
        path:'/my-posts',
        component:MyPostsPage,
        name:'my-posts',
        meta: {
            requiresAuth: true
        }
    },
    {
        path:'/question/create',
        component:CreateQuestionPage,
        name:'question.create'
    },
    {
        path:'/questions/:slug',
        component:QuestionPage,
        name:'questions.show',
        props: true
    },
    {
        path:'/questions/:id/edit',
        component:EditQuestionPage,
        name:'question.edit'
    },
    {
        path:'*',
        component: NotFoundPage,

    }
]

export default routes