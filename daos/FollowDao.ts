/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";
import User from "../models/users/User";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static FollowDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.FollowDao === null) {
            FollowDao.FollowDao = new FollowDao();
        }
        return FollowDao.FollowDao;
    }

    private constructor() {}

    /**
     * Find all Users following a User in the database
     * @param {string} uid Primary key of User
     * @returns Promise To be notified when user follows are retrieved from
     * the database
     */
    findAllUsersFollowingUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

    /**
     * Find all Users followed by a User in the database
     * @param {string} uid Primary key of User
     * @returns Promise To be notified when user follows are retrieved from
     * the database
     */
    findAllUsersFollowedByUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();

    /**
     * Insert a new follow relation
     * @param {string} uid0 Primary key of User following
     * @param {string} uid1 Primary key of User being followed
     * @returns Promise To be notified when user follow is inserted into
     * the database
     */
    userFollowsUser = async (uid0: string, uid1: string): Promise<any> =>
        FollowModel.create({userFollowing: uid0, userFollowed: uid1});

    /**
     * Remove a follow relation
     * @param {string} uid0 Primary key of User following
     * @param {string} uid1 Primary key of User being followed
     * @returns Promise To be notified when user follow is removed from
     * the database
     */
    userUnfollowsUser = async (uid0: string, uid1: string): Promise<any> =>
        FollowModel.deleteMany({userFollowing: uid0, userFollowed: uid1});
}


