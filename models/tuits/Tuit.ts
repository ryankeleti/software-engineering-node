/**
 * @file Declares Tuit data type representing a public message
 * on the platform
 */
import User from "../users/User";

/**
 * @typedef Tuit Represents a message
 * @property {string} tuit message contents
 * @property {User} postedBy author of the Tuit
 * @property {Date} postedOn timestamp of Tuit
 */
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
};
