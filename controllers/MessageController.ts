/**
 * @file Controller RESTful Web service API for Messages resource
 */
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";

/**
 * @class MessagesController Implements RESTful Web service API for messages resource.
 * Defines the messaging HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/messages/sent to retrieve all the messages sent by a user
 *     </li>
 *     <li>GET /api/users/:uid/messages/received to retrieve all the messages received by a user
 *     </li>
 *     <li>POST /api/users/:uid0/messages/sent/:uid1 to record that a user messaged a user
 *     </li>
 *     <li>DELETE /api/users/:uid0/messages/sent/:mid to record that a user removed a message</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/api/users/:uid/messages/sent", MessageController.messageController.findAllMessagesSentByUser);
            app.get("/api/users/:uid/messages/received", MessageController.messageController.findAllMessagesReceivedByUser);
            app.post("/api/users/:uid0/messages/sent/:uid1", MessageController.messageController.userMessagesUser);
            app.delete("/api/users/:uid/messages/sent/:mid", MessageController.messageController.userDeletesMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * Retrieves all messages sent by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the Messages objects
     */
    findAllMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentByUser(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all messages received by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user Messages objects that were liked
     */
    findAllMessagesReceivedByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesReceivedByUser(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid0 and uid1 representing the user that is messaging
     * another user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new Message that was inserted in the
     * database
     */
    userMessagesUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesUser(req.params.uid0, req.params.uid1, req.body)
            .then(message => res.json(message));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and mid representing the user that is deleting
     * the message represented by mid
     * @param {Response} res Represents response to client, including status
     * on whether deleting the Message was successful or not
     */
    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(req.params.uid, req.params.mid)
            .then(status => res.send(status));
};

