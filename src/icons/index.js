import SvgIcon from '@/components/common/SvgIcon'

const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)

export default {
    install: (app) => {
        app.component('SvgIcon', SvgIcon)
    }
}
