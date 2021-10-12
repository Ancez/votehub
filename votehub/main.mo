import Array "mo:base/Array";

actor {
    type Vote = {
        value: Text;
        offsetX: Int;
        offsetY: Int;
    };

    type RoomState = { #alive; #voting; #voted };
    type RoomStyle = { #letscore; #abcd };

    type Room = {
        name: Text;
        state: RoomState;
        style: RoomStyle;
    };

    var rooms : [Room] = [];

    public query func getRoom(roomName : Text) : async ?Room {
        return Array.find<Room>(rooms, func x { x.name == roomName });
    };

    public func createRoom(name : Text, style : RoomStyle) : async () {
        let room : Room = {
            name = name;
            style = style;
            state = #alive;
        };

        rooms := Array.append<Room>(rooms, [room]);
    };

    public query func vote(roomName : Text, offsetX : Nat16, offsetY : Nat16) : async Text {
        return "text";
    };
};
