import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";
import User from "../models/users/User";

export default class FollowDao implements FollowDaoI {
    private static FollowDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.FollowDao === null) {
            FollowDao.FollowDao = new FollowDao();
        }
        return FollowDao.FollowDao;
    }
    private constructor() {}
    findAllUsersFollowingUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();
    findAllUsersFollowedByUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();
    userFollowsUser = async (uid0: string, uid1: string): Promise<any> =>
        FollowModel.create({userFollowing: uid0, userFollowed: uid1});
    userUnfollowsUser = async (uid0: string, uid1: string): Promise<any> =>
        FollowModel.deleteOne({userFollowing: uid0, userFollowed: uid1});
}


