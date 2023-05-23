/**
 * Plugin constants (hardcoded configuration) for shared code.
 */
export default class Fl32_Log_Shared_Defaults {
    // should be the same as `name` property in `./package.json`
    NAME = '@flancer32/teq-ant-log';

    SPACE_BEACON = 'log-agg-beacon'; // 'content-type: text/plain;charset=UTF-8' is used in HTTP headers

    constructor() {
        Object.freeze(this);
    }
}
