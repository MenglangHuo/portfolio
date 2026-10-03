
import { chain } from '../middleware/chain';
import { withI18nMiddleware } from '../middleware/i18nMiddleware';

export default chain([withI18nMiddleware])
console.log("middleware...")
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|assets|sketchbook|favicons|.*\\..*).*)']
}