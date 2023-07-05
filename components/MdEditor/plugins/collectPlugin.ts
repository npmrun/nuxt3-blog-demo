import type { BytemdPlugin } from 'bytemd'
import remarkCollect from './remark-collect'
import Directive from 'remark-directive';

export default function collectPlugin(): BytemdPlugin {
    return {
        remark: (processor) => {
            processor.use(Directive)
            processor.use(remarkCollect)
            return processor
        }
    }
}