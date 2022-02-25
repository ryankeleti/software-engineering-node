/**
 * @file Declares Follow data type representing follows
 * between Users
 */
import User from "../users/User";

/**
 * @typedef Follow Represents a User following another User
 * @property {User} userFollowed User being followed
 * @property {User} userFollowing User following
 */
export default interface Follow {
    userFollowed: User,
    userFollowing: User
};

