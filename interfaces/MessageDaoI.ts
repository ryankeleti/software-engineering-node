import Message from "../models/messages/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    findAllMessagesSentByUser (uid: string): Promise<Message[]>;
    findAllMessagesReceivedByUser (uid: string): Promise<Message[]>;
    userMessagesUser (uid0: string, uid1: string, message: Message): Promise<Message>;
    userDeletesMessage (uid: string, mid: string): Promise<any>;
};
