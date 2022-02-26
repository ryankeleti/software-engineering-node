/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Message
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    /**
     * Uses MessageModel to retrieve all message documents from messages collection
     * sent by a user
     * @param {string} uid User id of message sender 
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findAllMessagesSentByUser = async (uid: string): Promise<Message[]> =>
       MessageModel
            .find({from: uid}).exec();

    /**
     * Uses MessageModel to retrieve all message documents from messages collection
     * received by a user
     * @param {string} uid User id of message recipient
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findAllMessagesReceivedByUser = async (uid: string): Promise<Message[]> =>
       MessageModel
            .find({to: uid})
            .exec();

    /**
     * Inserts new message instance into the database
     * @param {string} uid0 User id of sender of the message
     * @param {string} uid1 User id of recipient of the message
     * @param {Message} message Message to be sent
     * @returns Promise To be notified when message is inserted into the database
     */
    userMessagesUser = async (uid0: string, uid1: string, message: Message): Promise<any> =>
        MessageModel.create({...message, from: uid0, to: uid1, sentOn: Date.now()});

    /**
     * Removes message from the database
     * @param {string} uid User id of sender of the message
     * @param {string} mid Message id of the message
     * @returns Promise To be notified when message is removed from the database
     */
    userDeletesMessage = async (uid: string, mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});
}
