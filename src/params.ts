import { defineParams } from "@sveltejs/kit/params";

export const params = defineParams({
    file: (param) => (param.includes(".") ? param : undefined),
});
