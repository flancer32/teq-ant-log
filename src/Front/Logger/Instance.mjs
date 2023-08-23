/**
 * The frontend logger identity (UUID).
 * The model saves data in the browser's Session Storage (a session is a tab in a browser).
 */
export default class Fl32_Log_Front_Logger_Instance {
    /**
     * @param {Fl32_Log_Front_Defaults} DEF
     */
    constructor(
        {
            Fl32_Log_Front_Defaults$: DEF,
        }) {
        // VARS
        const KEY = `${DEF.SHARED.NAME}/instance`;
        /** @type {string} */
        let _uuid = initSession();

        // FUNCS
        /**
         * Load sessionUuid from Session Store or generate new one.
         * @returns {string}
         */
        function initSession() {
            let res = self.sessionStorage.getItem(KEY);
            if (!res) {
                res = self.crypto.randomUUID();
                self.sessionStorage.setItem(KEY, res);
            }
            return res;
        }

        // INSTANCE METHODS

        /**
         * Get UUID for current session (tab in a browser).
         * @return {string}
         */
        this.getUuid = () => _uuid;

    }
}
