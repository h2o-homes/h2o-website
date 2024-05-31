import { createApp } from 'vue'
import '@/assets/css/index.less'
import App from './App.vue'
import router from './router'
import store from './store'
import SvgIcon from './icons'

import {
    Row,
    Col,
    Layout,
    Dropdown,
    Menu,
    Modal,
    Button,
    Input,
    Spin,
    Empty,
    Form,
    Textarea,
    BackTop
} from 'ant-design-vue'
import Notification from 'ant-design-vue/lib/notification'
import message from 'ant-design-vue/lib/message'

const app = createApp(App)
app.config.globalProperties.$notification = Notification
app.config.globalProperties.$message = message

app.use(Row)
    .use(Col)
    .use(Layout)
    .use(Dropdown)
    .use(Menu)
    .use(Modal)
    .use(Button)
    .use(Input)
    .use(Spin)
    .use(Empty)
    .use(Form)
    .use(Textarea)
    .use(BackTop)
app.use(SvgIcon).use(store).use(router).mount('#app')
