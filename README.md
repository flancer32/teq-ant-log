# teq-ant-log

Base plugin for utilizing log aggregation in TeqFW apps.

## Use in TeqFW Plugins

```javascript
/**
 * @implements TeqFw_Web_Front_Api_IApp
 */
export default class Demo_Front_App {
    /**
     * @param {TeqFw_Web_Front_Mod_Config} modCfg
     * @param {Fl32_Log_Front_Logger_Transport} modLogTrn - inject as interface
     * @param {TeqFw_Core_Shared_Logger_Base} loggerBase
     */
    constructor(
        {
            TeqFw_Web_Front_Mod_Config$: modCfg,
            TeqFw_Core_Shared_Api_Logger_Transport$: modLogTrn,
            TeqFw_Core_Shared_Logger_Base$: loggerBase,
        }
    ) {
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