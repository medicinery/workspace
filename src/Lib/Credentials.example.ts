import { IS_DEBUG, USE_PRODUCTION_DB } from "./Constants"

const developmentCredentials = {}

const productionCreds = {}

export const firebaseConfig = !USE_PRODUCTION_DB && IS_DEBUG ? developmentCredentials : productionCreds
