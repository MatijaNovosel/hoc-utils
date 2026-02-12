import * as rules from "@vee-validate/rules";
import { configure, defineRule } from "vee-validate";

configure({
  validateOnBlur: false,
  validateOnChange: false,
  validateOnInput: false,
  validateOnModelUpdate: false
});

Object.keys(rules).forEach((rule) => {
  if (rule != "default" && rule !== "all") {
    // @ts-ignore
    defineRule(rule, rules[rule]);
  }
});
