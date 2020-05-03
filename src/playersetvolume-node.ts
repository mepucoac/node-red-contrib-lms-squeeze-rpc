import {SqueezeServerStub, SqueezePlayer} from "lms-squeeze-rpc";

module.exports = function (RED) {
    function LmsSqueezeRpcPlayersetvolumeNode(config) {
        var node = this;
        RED.nodes.createNode(node, config);

        node.server = RED.nodes.getNode(config.server);
        node.playerid = RED.nodes.getNode(config.playerid);

        var url = "http://" + node.server.host + ":" + node.server.port;
        var slimStub = new SqueezeServerStub(url);
        var slimPlayer: SqueezePlayer;
        var lastPlayerid;

        node.on("input", function (msg) {
            var playerid = msg.playerid || node.playerid;
            if (!playerid) {
                node.error("No playerid");
                node.status({ fill: "red", shape: "ring", text: "No playerid" });
                return;
            }
            if (slimPlayer == null || lastPlayerid !== playerid) {
                slimPlayer = new SqueezePlayer(slimStub, playerid);
                lastPlayerid = playerid;
            }
            slimPlayer.setVolumeAsync(msg.payload).then(function (value) {
                node.status({ fill: "green", shape: "dot", text: "volume set" });
                msg.payload = value;
                node.send(msg);
            }).catch(function (reason) {
                node.error(reason);
                node.status({ fill: "red", shape: "ring", text: reason && reason.message || "Error setting volume" });
            });
        });
    }
    RED.nodes.registerType("lms-squeeze-rpc-playersetvolume-node", LmsSqueezeRpcPlayersetvolumeNode);
}
