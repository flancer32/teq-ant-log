/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Fl32_Log_Front_Defaults {

    /** @type {Fl32_Log_Shared_Defaults} */
    SHARED;

    /**
     * @param {Fl32_Log_Shared_Defaults} SHARED
     */
    constructor(
        {
            Fl32_Log_Shared_Defaults$: SHARED
        }
    ) {
        this.SHARED = SHARED;
        Object.freeze(this);
    }
}
