import Follow from "../models/follows/Follow";
import User from "../models/users/User";

/**
 * @file Declares API for Follow related data access object methods
 */
export default interface FollowDaoI {
  findAllUsersFollowingUser (uid: string): Promise<Follow[]>;
  findAllUsersFollowedByUser (uid: string): Promise<Follow[]>;
  userUnfollowsUser (uid0: string, uid1: string): Promise<any>;
  userFollowsUser (uid0: string, uid1: string): Promise<Follow>;
};

