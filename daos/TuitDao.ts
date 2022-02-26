/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from "../mongoose/tuits/TuitModel";
import Tuit from "../models/tuits/Tuit";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {}

    /**
     * Find all Tuits in the database
     * @returns Promise To be notified when tuits are retrieved from
     * the database
     */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find();

    /**
     * Find all Tuits posted by a User in the database
     * @param {string} uid Primary key of User
     * @returns Promise To be notified when tuits are retrieved from
     * the database
     */
    findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid});

    /**
     * Find Tuit by id in the database
     * @param {string} tid Primary key of Tuit
     * @returns Promise To be notified when tuit is retrieved from
     * the database
     */
    findTuitById = async (tid: string): Promise<any> =>
        TuitModel.findById(tid)
            .populate("postedBy")
            .exec();

    /**
     * Create Tuit posted by a User in the database
     * @param {string} uid Primary key of User
     * @param {Tuit} tuit Tuit to be inserted
     * @returns Promise To be notified when tuit is inserted into
     * the database
     */
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid});

    /**
     * Update Tuit in the database
     * @param {string} tid Primary key of Tuit
     * @param {Tuit} tuit Tuit to be updated
     * @returns Promise To be notified when tuit is updated in
     * the database
     */
    updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            {_id: tid},
            {$set: tuit});

    /**
     * Delete Tuit in the database
     * @param {string} tid Primary key of Tuit
     * @returns Promise To be notified when tuit is removed from
     * the database
     */
    deleteTuit = async (tid: string): Promise<any> =>
        TuitModel.deleteOne({_id: tid});
}
