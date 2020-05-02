import {SqueezeServerStub, SqueezeServer} from "lms-squeeze-rpc";

module.exports = function (RED) {
    function LmsSqueezeRpcServerstatusNode(config) {
        var node = this;
        RED.nodes.createNode(node, config);

        node.server = RED.nodes.getNode(config.server)

        var url = "http://" + node.server.host + ":" + node.server.port;
        var slimStub = new SqueezeServerStub(url);
        var slimServer = new SqueezeServer(slimStub);

        node.on("input", function (msg) {
            slimServer.getStatusAsync().then(function (value) {
                node.status({ fill: "green", shape: "dot", text: "status received" });
                msg.payload = value;
                node.send(msg);
            }).catch(function (reason) {
                node.error(reason);
                node.status({ fill: "red", shape: "ring", text: reason && reason.message || "Error getting status" });
            });
        });
    }
    RED.nodes.registerType("lms-squeeze-rpc-serverstatus-node", LmsSqueezeRpcServerstatusNode);
}
