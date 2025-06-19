import { VariantsType } from './shared/models/shared-product.model'

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace PrismaJson {
    // Define your custom types here!
    type Variants = VariantsType
  }
}

// The file MUST be a module!
export {}
