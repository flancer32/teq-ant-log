/**
 * Logging transport implementation to send log records to aggregation server.
 *
 * @implements TeqFw_Core_Shared_Api_Logger_Transport
 */
export default class Fl32_Log_Front_Logger_Transport {
    constructor(spec) {
        // DEPS
        /** @type {Fl32_Log_Front_Defaults} */
        const DEF = spec['Fl32_Log_Front_Defaults$'];
        /** @type {TeqFw_Core_Shared_Logger_Transport_Console} */
        const transConsole = spec['TeqFw_Core_Shared_Logger_Transport_Console$'];
        /** @type {Fl32_Log_Shared_Dto_Log} */
        const dtoLog = spec['Fl32_Log_Shared_Dto_Log$'];
        /** @type {Fl32_Log_Front_Logger_Instance} */
        const instance = spec['Fl32_Log_Front_Logger_Instance$'];
        /** @type {typeof Fl32_Log_Shared_Enum_Log_Level} */
        const LEVEL = spec['Fl32_Log_Shared_Enum_Log_Level$'];
        /** @type {typeof Fl32_Log_Shared_Enum_Log_Type} */
        const TYPE = spec['Fl32_Log_Shared_Enum_Log_Type$'];

        // VARS
        const STORE_KEY = `${DEF.SHARED.NAME}/front/log/monitor`;
        let BASE;
        let _canSendLogs = ('true' === window.localStorage.getItem(STORE_KEY));

        // MAIN

        // INSTANCE METHODS
        /**
         * @param {TeqFw_Core_Shared_Dto_Log.Dto} dto
         */
        this.log = function (dto) {
            if (_canSendLogs)
                try {
                    if (BASE) {
                        // compose DTO to send data to logs aggregator
                        // noinspection JSCheckFunctionSignatures
                        const entry = dtoLog.createDto(dto);
                        // init aggregator specific properties
                        entry.instance = instance.getUuid();
                        entry.level = (dto.isError) ? LEVEL.ERROR : LEVEL.INFO;
                        entry.type = TYPE.FRONT;
                        // send log entry to logs monitor
                        const postData = JSON.stringify(entry);
                        navigator.sendBeacon(BASE, postData);
                    } else this.disableLogs();
                } catch (e) {
                    _canSendLogs = false;
                    console.error(`Cannot send log entry to remote aggregator (${BASE}). Remote logging is disabled.`);
                    console.error(e);
                }
            // duplicate to console
            transConsole.log(dto);
        };

        /**
         * Enable logs transporting to remote aggregator.
         * @param {string} domain - domain of the logs aggregator ('logs.domain.com' or 'http(s)://...')
         */
        this.enableLogs = function (domain) {
            if (domain) {
                BASE = `${domain}/${DEF.SHARED.SPACE_BEACON}/`;
                if (!BASE.includes('://')) BASE = `//${BASE}`;
                _canSendLogs = true;
                window.localStorage.setItem(STORE_KEY, _canSendLogs);
            } else this.disableLogs();
        };

        this.disableLogs = function () {
            BASE = undefined;
            _canSendLogs = false;
            window.localStorage.setItem(STORE_KEY, _canSendLogs);
        };

        this.isLogsMonitorOn = () => _canSendLogs;
    }
}
