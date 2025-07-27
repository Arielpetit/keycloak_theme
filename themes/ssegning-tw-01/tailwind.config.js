import preset from "@vymalo/ui-preset";
import { merge } from "lodash";

/** @type {import("tailwindcss").Config} */
export default merge({}, preset, {
    content: ["./src/**/*.{ts,js,html,scss,tsx,jsx}", "./data/**/theme.properties"],
    theme: {
        extend: {
            fontSize: {
                "3xl": "2rem"
            }
        }
    }
});
