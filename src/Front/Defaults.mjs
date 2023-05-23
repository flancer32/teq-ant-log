/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Fl32_Log_Front_Defaults {

    /** @type {Fl32_Log_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        this.SHARED = spec['Fl32_Log_Shared_Defaults$'];
        Object.freeze(this);
    }
}
