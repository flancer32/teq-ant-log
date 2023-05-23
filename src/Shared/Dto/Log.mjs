/**
 * Log item DTO to transfer data between back and front.
 * @see https://github.com/flancer32/teq-ant-log-server
 */
// MODULE'S VARS
const NS = 'Fl32_Log_Shared_Dto_Log';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Log_Shared_Dto_Log
 */
class Dto {
    static namespace = NS;
    /**
     * Backend ID for the log entry.
     * @type {number}
     */
    bid;
    /**
     * UTC date-time.
     * @type {Date}
     */
    date;
    /**
     * Identifier for an application instance (something like UUID for the frontend or backend).
     * @type {string}
     */
    instance;
    /** @type {number} */
    level;
    /** @type {string} */
    message;
    /**
     * Other metadata for the log entry.
     * @type {Object}
     */
    meta;
    /**
     * Namespace for source of the log entry.
     * @type {string}
     */
    source;
    /**
     * Log source type (see Fl32_Log_Shared_Enum_Log_Type)
     * @type {string}
     */
    type;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Fl32_Log_Shared_Dto_Log {

    constructor(spec) {
        /** @type {TeqFw_Core_Shared_Util_Cast.castDate|function} */
        const castDate = spec['TeqFw_Core_Shared_Util_Cast.castDate'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castEnum|function} */
        const castEnum = spec['TeqFw_Core_Shared_Util_Cast.castEnum'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castInt|function} */
        const castInt = spec['TeqFw_Core_Shared_Util_Cast.castInt'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];
        /** @type {typeof Fl32_Log_Shared_Enum_Log_Level} */
        const LEVEL = spec['Fl32_Log_Shared_Enum_Log_Level$'];
        /** @type {typeof Fl32_Log_Shared_Enum_Log_Type} */
        const TYPE = spec['Fl32_Log_Shared_Enum_Log_Type$'];

        // INSTANCE METHODS
        /**
         * @param {Fl32_Log_Shared_Dto_Log.Dto} data
         * @return {Fl32_Log_Shared_Dto_Log.Dto}
         */
        this.createDto = function (data = null) {
            // create new DTO
            const res = new Dto();
            // cast known attributes
            res.bid = castInt(data?.bid);
            res.date = castDate(data?.date);
            res.instance = castString(data?.instance);
            res.level = castEnum(data?.level, LEVEL);
            res.message = castString(data?.message);
            res.meta = structuredClone(data?.meta);
            res.source = castString(data?.source);
            res.type = castEnum(data?.type, TYPE);
            return res;
        };
    }

}