declare module 'math-expression-evaluator' {
  namespace Mexp {
    export interface Token {
      type: number
      token: string
      value: any
      show: string
    }
  }

  class Mexp {
    static eval (exp: string, tokens?: Mexp.Token[], pair?: {[index: string]: number}): number
  }

  export = Mexp
}