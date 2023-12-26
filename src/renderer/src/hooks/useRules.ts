import type { FormProps } from 'ant-design-vue';

export type AntdRules = Required<FormProps>['rules'];

export type AntdRuleObject = ExtractObj<AntdRules[string]>;

export type AntdValidator<V, RulesForm = any> = (rules: RulesForm, value: V, callback: (errMsg?: string) => void) => Promise<string | void>;

export type RuleObject<V, RulesForm> = Omit<AntdRuleObject, 'validator'> & {
  validator: AntdValidator<V, RulesForm>;
};

export type Rules<R, RulesForm = any> = {
  [Key in keyof R]: RuleObject<R[Key], RulesForm>;
};

export type ValidatorFn<T> = (value: T) => boolean;

export const is = <T>(validatorFn: ValidatorFn<T>, errMessage: string): AntdValidator<T> => {
  return (rules, value, callback) => new Promise(async (resolve, reject) => {
    const r = await validatorFn(value);
    if (r) resolve();
    else reject(errMessage);
  })
}

export type ValidatorFnArg<T> = [...ValidatorFn<T>[], string];

export const and = <T>(...validatorFns: ValidatorFnArg<T>): AntdValidator<T> => {
  const errMsg = validatorFns.pop() as string;

  return (rules, value, callback) => new Promise((resolve, reject) => {
    Promise.all((validatorFns as ValidatorFn<T>[]).map(fn => is(fn, errMsg)(rules, value, callback))).then(() => {
      resolve();
    }).catch(() => reject(errMsg))
  })
}
export const or = <T>(...validatorFns: ValidatorFnArg<T>): AntdValidator<T> => {

}
export const not = <T>(...validatorFns: ValidatorFnArg<T>): AntdValidator<T> => {

}

export function useRules<R, T = Rules<R>>(rules: Partial<T>): AntdRules {


  return rules as unknown as AntdRules;
}


type Response = {
  name: string;

  age: string;
}


useRules<Response>({

});
