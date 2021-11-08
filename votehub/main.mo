import Array "mo:base/Array";

actor {
    type RoomId = Nat;
    type RoomState = { #alive; #voting; #voted };
    type RoomStyle = { #letscore; #abcd };

    type Vote = {
        name: Text;
        offsetWidth: Float;
        offsetHeight: Float;
        roomId: RoomId;
    };

    type Room = {
        id: RoomId;
        name: Text;
        state: RoomState;
        style: RoomStyle;
    };

    var nextRoomId: RoomId = 1;
    var rooms: [Room] = [];
    var votes: [Vote] = [];

    public query func getRoom(roomName : Text) : async ?Room {
        Array.find<Room>(rooms, func room { room.name == roomName });
    };

    public func createRoom(name: Text, style: RoomStyle) : async Room {
        let room: Room = {
            id = nextRoomId;
            name = name;
            state = #alive;
            style = style;
        };

        rooms := Array.append<Room>(rooms, [room]);
        nextRoomId += 1;
        room;
    };

    public query func createVote(roomId: RoomId, vote: Vote) : async ?Room {
        let room = Array.find<Room>(rooms, func room { room.id == roomId });

        switch room {
            case (?r) {
                votes := Array.append<Vote>(votes, [vote]);
                room;
            };
            case null { null };
        };
    };
};
