import type { BytemdPlugin } from "bytemd";
import Directive from "remark-directive";
import remarkCollect from "./remark-collect";

export default function collectPlugin(): BytemdPlugin {
	return {
		remark: (processor) => {
			processor.use(Directive);
			processor.use(remarkCollect);
			return processor;
		},
	};
}
