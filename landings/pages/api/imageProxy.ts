import { withImageProxy } from '@blazity/next-image-proxy'  

export default withImageProxy({ whitelistedPatterns: [/^https?:\/\/(.*).varzesh3.com/, /^https?:\/\/(.*).vidaneh.com/, /^https?:\/\/(.*).sabavision.com/, /^https?:\/\/(.*).farakav.com/, /^https?:\/\/(.*).adivery.com/] })