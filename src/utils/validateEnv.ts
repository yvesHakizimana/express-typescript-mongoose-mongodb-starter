import { cleanEnv, port, str} from 'envalid'

const validateEnv = () => {
    cleanEnv(process.env, {
        NODE_ENV: str() || 'development',
        PORT: port()
    })
}

export default validateEnv
