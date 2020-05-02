module.exports = function (RED) {
    function LmsSqueezeRpcPlayerconfig(config) {
        RED.nodes.createNode(this, config);
        this.host = config.host;
        this.port = config.port;
    }
    RED.nodes.registerType("lms-squeeze-rpc-playerconfig", LmsSqueezeRpcPlayerconfig);
}