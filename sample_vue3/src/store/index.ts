import type {App} from 'vue'
import { createPinia } from "pinia";
// 持久化处理
const store = createPinia()

export function setupStore(app:App<Element>) {
    app.use(store)
}
export {store}