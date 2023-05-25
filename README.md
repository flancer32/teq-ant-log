# teq-ant-log

Base plugin for utilizing log aggregation in TeqFW apps.

## Use in TeqFW Plugins

```javascript
/**
 * @implements TeqFw_Web_Front_Api_IApp
 */
export default class Demo_Front_App {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Front_Mod_Config} */
        const modCfg = spec['TeqFw_Web_Front_Mod_Config$'];
        /** @type {Fl32_Log_Front_Logger_Transport} */
        const modLogTrn = spec['TeqFw_Core_Shared_Api_Logger_Transport$']; // as interface
        /** @type {TeqFw_Core_Shared_Logger_Base} */
        const loggerBase = spec['TeqFw_Core_Shared_Logger_Base$'];

        // INSTANCE METHODS
        this.init = async function (fnPrintout) {
            // FUNCS
            /**
             * Get domain for logs aggregation server from web configuration
             * then enable logging transport and set it to the logger base.
             */
            function initLogger() {
                // logger
                /** @type {TeqFw_Web_Shared_Dto_Config_Front.Dto} */
                const cfg = modCfg.get();
                const domain = cfg?.custom[DEF.SHARED.CFG_WEB_LOGS_AGG];
                modLogTrn.enableLogs(domain);
                loggerBase.setTransport(modLogTrn);
            }

            // MAIN
            initLogger();
        };
    }
}
```