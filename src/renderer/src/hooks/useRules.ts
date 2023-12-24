import type { FormProps } from 'ant-design-vue';

export type AntdRules = Required<FormProps>['rules'];

export type AntdRuleObject = ExtractObj<AntdRules[string]>;

export type RuleObject<V> = Omit<AntdRuleObject, 'validator'> & {
  required: boolean;
  validator: (rules: Rules<any>, value: V, callback: BaseCb) => Promise<string | void>;

};

export type Rules<R> = {
  [Key in keyof R]: RuleObject<R[Key]>;
};

export function useRules<R, T = Rules<R>>(rules: Partial<T>): AntdRules {



  return rules as unknown as AntdRules;
}


type Response = {
  name: string;

  age: string;
}


useRules<Response>({

});
