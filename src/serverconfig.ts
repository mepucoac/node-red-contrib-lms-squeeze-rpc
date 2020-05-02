module.exports = function (RED) {
    function LmsSqueezeRpcServerconfig(config) {
        RED.nodes.createNode(this, config);
        this.host = config.host;
        this.port = config.port;
    }
    RED.nodes.registerType("lms-squeeze-rpc-serverconfig", LmsSqueezeRpcServerconfig);
}