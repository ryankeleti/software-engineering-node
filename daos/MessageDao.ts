import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    findAllMessagesSentByUser = async (uid: string): Promise<Message[]> =>
       MessageModel
            .find({from: uid}).exec();

    findAllMessagesReceivedByUser = async (uid: string): Promise<Message[]> =>
       MessageModel
            .find({to: uid})
            .exec();

    userMessagesUser = async (uid0: string, uid1: string, message: Message): Promise<any> =>
        MessageModel.create({...message, to: uid0, from: uid1, sentOn: Date.now()});

    userDeletesMessage = async (uid: string, mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});
}
